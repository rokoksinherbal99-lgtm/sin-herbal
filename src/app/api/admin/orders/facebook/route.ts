import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { checkAuth, unauthorized } from "@/lib/admin-auth";
import { sendOrderNotification } from "@/lib/wa-notify";

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();
  try {
    const body = await req.json();
    if (!body.items?.length) {
      return NextResponse.json({ error: "Order must have at least 1 item" }, { status: 400 });
    }

    const orderId = crypto.randomUUID();
    const total = body.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

    await db.insert(orders).values({
      id: orderId,
      customer: body.customer,
      email: body.email || "facebook@marketplace.com",
      phone: body.phone || "-",
      address: body.address || "-",
      city: body.city || "-",
      province: body.province || "-",
      postalCode: body.postalCode || "-",
      total,
      source: "facebook",
      platformData: JSON.stringify({ facebookOrderId: body.facebookOrderId || "" }),
      notes: body.notes || "",
    });

    const itemRows = body.items.map((item: any) => ({
      id: crypto.randomUUID(),
      orderId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    await db.insert(orderItems).values(itemRows);

    for (const item of body.items) {
      if (item.productId) {
        await db.update(products).set({ stock: sql`${products.stock} - ${item.quantity}` }).where(eq(products.id, item.productId));
      }
    }

    sendOrderNotification(orderId, body.customer, total, "facebook");

    return NextResponse.json({ id: orderId });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to create order" }, { status: 500 });
  }
}
