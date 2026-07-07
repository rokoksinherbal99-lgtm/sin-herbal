import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const orderId = crypto.randomUUID();

  const itemRows = body.items.map((item: any) => ({
    id: crypto.randomUUID(),
    orderId,
    productId: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  const now = new Date().toISOString();

  db.insert(orders).values({
    id: orderId,
    customer: body.customer,
    email: body.email,
    phone: body.phone,
    address: body.address,
    city: body.city,
    province: body.province,
    postalCode: body.postalCode,
    total: body.total,
    createdAt: now,
    updatedAt: now,
  }).run();

  db.insert(orderItems).values(itemRows).run();

  return NextResponse.json({ id: orderId, items: itemRows });
}
