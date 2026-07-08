import { NextResponse } from "next/server";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { checkAuth, unauthorized } from "@/lib/admin-auth";

const ALLOWED_FIELDS = ["name", "slug", "description", "price", "images", "categoryId", "productType", "manufacturer", "stock", "featured"] as const;
type ProductInsert = typeof products.$inferInsert;

export async function GET(req: Request) {
  if (!checkAuth(req)) return unauthorized();
  try {
    const rows = await db.select().from(products).leftJoin(categories, eq(products.categoryId, categories.id)).orderBy(desc(products.createdAt));
    const result = rows.map(r => ({ ...r.products, category: r.categories }));
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!checkAuth(req)) return unauthorized();
  try {
    const body = await req.json();
    const id = crypto.randomUUID();
    const insertData: Record<string, unknown> = { id, createdAt: new Date(), updatedAt: new Date() };
    for (const key of ALLOWED_FIELDS) {
      if (body[key] !== undefined) insertData[key] = body[key];
    }
    await db.insert(products).values(insertData as any);
    return NextResponse.json({ success: true, id });
  } catch {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
