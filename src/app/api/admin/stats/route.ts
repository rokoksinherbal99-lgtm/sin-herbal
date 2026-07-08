import { NextResponse } from "next/server";
import { db } from "@/db";
import { products, orders } from "@/db/schema";
import { count } from "drizzle-orm";
import { checkAuth, unauthorized } from "@/lib/admin-auth";

export async function GET(req: Request) {
  if (!checkAuth(req)) return unauthorized();
  try {
    const [productCount] = await db.select({ value: count() }).from(products);
    const allOrders = await db.select().from(orders);
    const revenue = allOrders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.total, 0);
    return NextResponse.json({
      products: productCount?.value ?? 0,
      orders: allOrders.length,
      revenue,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
