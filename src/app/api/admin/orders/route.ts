import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { eq, desc, inArray } from "drizzle-orm";
import { checkAuth, unauthorized } from "@/lib/admin-auth";
import { logAudit } from "@/lib/api/audit";
import { checkCSRF } from "@/lib/api/security";

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

  try {
    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "IDs pesanan wajib diisi" }, { status: 400 });
    }

    await db.delete(orderItems).where(inArray(orderItems.orderId, ids));
    await db.delete(orders).where(inArray(orders.id, ids));

    await logAudit("bulk_delete_orders", "order", ids.join(","), `Menghapus ${ids.length} pesanan spam`);

    return NextResponse.json({ success: true, deleted: ids.length });
  } catch (err) {
    console.error("Admin orders DELETE error:", err);
    return NextResponse.json({ error: "Gagal menghapus pesanan" }, { status: 500 });
  }
}
