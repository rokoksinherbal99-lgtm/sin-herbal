import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { inArray } from "drizzle-orm";
import { checkAuth, unauthorized } from "@/lib/admin-auth";
import { checkCSRF } from "@/lib/api/security";
import { checkRateLimit } from "@/lib/rate-limit";

const MAX_ITEMS = 50;

export async function POST(req: NextRequest) {
  if (!(await checkAuth(req))) return unauthorized();
  const csrfRes = checkCSRF(req);
  if (csrfRes) return csrfRes;
  const rl = await checkRateLimit(req, 20);
  if (rl) return rl;

  try {
    const body = await req.json();
    const { customer, phone, items } = body;

    if (!customer || typeof customer !== "string" || customer.trim().length === 0) {
      return NextResponse.json({ error: "Nama pelanggan wajib diisi" }, { status: 400 });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Minimal 1 item" }, { status: 400 });
    }

    if (items.length > MAX_ITEMS) {
      return NextResponse.json({ error: `Maksimal ${MAX_ITEMS} item per pesanan` }, { status: 400 });
    }

    for (const item of items) {
      if (!item.id || typeof item.id !== "string") {
        return NextResponse.json({ error: "ID produk tidak valid" }, { status: 400 });
      }
      if (!Number.isInteger(item.quantity) || item.quantity < 1) {
        return NextResponse.json({ error: "Quantity harus bilangan bulat positif" }, { status: 400 });
      }
    }

    const productIds = items.map((item: any) => item.id);
    const dbProducts = await db.select().from(products).where(inArray(products.id, productIds));
    const priceMap = new Map(dbProducts.map((p) => [p.id, p]));

    for (const item of items) {
      if (!priceMap.has(item.id)) {
        return NextResponse.json({ error: `Produk ${item.id} tidak ditemukan` }, { status: 400 });
      }
    }

    const orderId = crypto.randomUUID();
    let serverTotal = 0;

    const itemRows = items.map((item: any) => {
      const dbProduct = priceMap.get(item.id)!;
      const lineTotal = dbProduct.price * item.quantity;
      serverTotal += lineTotal;
      return {
        id: crypto.randomUUID(),
        orderId,
        productId: item.id,
        quantity: item.quantity,
        price: dbProduct.price,
      };
    });

    await db.transaction(async (tx) => {
      await tx.insert(orders).values({
        id: orderId,
        customer: customer.trim(),
        email: `${phone || "manual"}@whatsapp.com`,
        phone: phone || "",
        address: "Pesanan via WhatsApp",
        city: "-",
        province: "-",
        postalCode: "-",
        total: serverTotal,
      });
      await tx.insert(orderItems).values(itemRows);
    });

    return NextResponse.json({ id: orderId });
  } catch (error) {
    console.error("Admin order creation error:", error);
    return NextResponse.json({ error: "Gagal membuat pesanan" }, { status: 500 });
  }
}
