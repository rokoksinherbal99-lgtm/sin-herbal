import { NextResponse } from "next/server";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db.select().from(products).leftJoin(categories, eq(products.categoryId, categories.id)).orderBy(desc(products.createdAt));
    const result = rows.map(r => ({ ...r.products, category: r.categories }));
    return NextResponse.json(result);
  } catch (err) {
    console.error("Products fetch error:", err);
    return NextResponse.json({ error: "Gagal memuat produk" }, { status: 500 });
  }
}