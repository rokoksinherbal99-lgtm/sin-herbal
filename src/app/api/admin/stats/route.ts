import { NextResponse } from "next/server";
import { db } from "@/db";
import { products, orders } from "@/db/schema";
import { count, desc, lt } from "drizzle-orm";
import { checkAuth, unauthorized } from "@/lib/admin-auth";

export async function GET(req: Request) {
  if (!await checkAuth(req)) return unauthorized();
  try {
    const [productCount] = await db.select({ value: count() }).from(products);

    const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
    const revenue = allOrders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.total, 0);

    const lowStockItems = await db.select({ id: products.id, name: products.name, stock: products.stock })
      .from(products)
      .where(lt(products.stock, 11));

    return NextResponse.json({
      products: productCount?.value ?? 0,
      orders: allOrders.length,
      revenue,
      pendingOrders: allOrders.filter((o) => o.status === "pending" || o.status === "processing").length,
      lowStock: lowStockItems,
      recentOrders: allOrders.slice(0, 5).map((o) => ({
        id: o.id,
        customer: o.customer,
        total: o.total,
        status: o.status,
        createdAt: o.createdAt,
      })),
    });
  } catch (err) {
    console.error("Stats error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
