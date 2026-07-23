import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { eq, desc, inArray } from "drizzle-orm";
import { checkAuth, unauthorized } from "@/lib/admin-auth";
import { logAudit } from "@/lib/api/audit";
import { checkCSRF } from "@/lib/api/security";
import { checkRateLimit } from "@/lib/rate-limit";

const BLOCKED_STATUSES = ["shipped", "delivered"];
const MAX_BULK_DELETE = 100;

export async function GET(req: Request) {
  if (!await checkAuth(req)) return unauthorized();
  try {
    const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
    if (allOrders.length === 0) return NextResponse.json([]);

    const orderIds = allOrders.map((o) => o.id);
    const allItems = await db
      .select({
        id: orderItems.id,
        orderId: orderItems.orderId,
        name: products.name,
        quantity: orderItems.quantity,
        price: orderItems.price,
      })
      .from(orderItems)
      .leftJoin(products, eq(orderItems.productId, products.id))
      .where(inArray(orderItems.orderId, orderIds));

    const itemsByOrder: Record<string, typeof allItems> = {};
    for (const item of allItems) {
      if (!itemsByOrder[item.orderId]) itemsByOrder[item.orderId] = [];
      itemsByOrder[item.orderId].push(item);
    }

    const result = allOrders.map((o) => ({ ...o, items: itemsByOrder[o.id] || [] }));
    return NextResponse.json(result);
  } catch (err) {
    console.error("Admin orders GET error:", err);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!await checkAuth(req)) return unauthorized();
  const csrfRes = checkCSRF(req);
  if (csrfRes) return csrfRes;
  const rl = await checkRateLimit(req, 10);
  if (rl) return rl;

  try {
    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "IDs pesanan wajib diisi" }, { status: 400 });
    }

    if (ids.length > MAX_BULK_DELETE) {
      return NextResponse.json({ error: `Maksimal ${MAX_BULK_DELETE} pesanan per hapus` }, { status: 400 });
    }

    const orderRows = await db.select({ id: orders.id, status: orders.status }).from(orders).where(inArray(orders.id, ids));

    const blocked = orderRows.filter((o) => BLOCKED_STATUSES.includes(o.status));
    if (blocked.length > 0) {
      return NextResponse.json({
        error: `Tidak bisa menghapus pesanan dengan status: ${blocked.map((o) => `${o.id.slice(-6)} (${o.status})`).join(", ")}`,
      }, { status: 400 });
    }

    const validIds = orderRows.map((o) => o.id);

    await db.transaction(async (tx) => {
      await tx.delete(orderItems).where(inArray(orderItems.orderId, validIds));
      await tx.delete(orders).where(inArray(orders.id, validIds));
    });

    await logAudit("bulk_delete_orders", "order", validIds.join(","), `Menghapus ${validIds.length} pesanan`);

    return NextResponse.json({ success: true, deleted: validIds.length });
  } catch (err) {
    console.error("Admin orders DELETE error:", err);
    return NextResponse.json({ error: "Gagal menghapus pesanan" }, { status: 500 });
  }
}
