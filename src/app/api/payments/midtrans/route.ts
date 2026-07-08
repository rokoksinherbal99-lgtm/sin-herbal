import { NextResponse } from "next/server";
import { midtransClient } from "@/lib/midtrans";
import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  if (!midtransClient) {
    return NextResponse.json({ error: "Midtrans not configured" }, { status: 400 });
  }

  const { orderId, customer, email, phone, items } = await req.json();

  const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const itemDetails = items.map((item: any) => ({
    id: item.id,
    price: item.price,
    quantity: item.quantity,
    name: item.name,
  }));

  try {
    const transaction = await midtransClient.createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: order.total,
      },
      customer_details: {
        first_name: customer,
        email,
        phone,
      },
      item_details: itemDetails,
    });

    await db.update(orders).set({ paymentId: transaction.token }).where(eq(orders.id, orderId));

    return NextResponse.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (error) {
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 });
  }
}
