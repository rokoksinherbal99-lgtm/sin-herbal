import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { sendOrderNotification } from "@/lib/wa-notify";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const orderId = crypto.randomUUID();

    if (!body.items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    for (const item of body.items) {
      const [product] = await db.select({ stock: products.stock }).from(products).where(eq(products.id, item.id)).limit(1);
      if (!product) {
        return NextResponse.json({ error: `Product ${item.id} not found` }, { status: 400 });
      }
      if (product.stock < item.quantity) {
        return NextResponse.json({ error: `Insufficient stock for ${item.id}` }, { status: 400 });
      }
    }

    const itemRows = body.items.map((item: any) => ({
      id: crypto.randomUUID(),
      orderId,
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    await db.insert(orders).values({
      id: orderId,
      customer: body.customer,
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city,
      province: body.province,
      postalCode: body.postalCode,
      total: body.total,
      source: "website",
    });

    await db.insert(orderItems).values(itemRows);

    for (const item of body.items) {
      await db.update(products).set({ stock: sql`${products.stock} - ${item.quantity}` }).where(eq(products.id, item.id));
    }

    sendOrderNotification(orderId, body.customer, body.total, "website");

    return NextResponse.json({ id: orderId, items: itemRows });
  } catch {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
