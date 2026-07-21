import { NextResponse } from "next/server";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { checkAuth, unauthorized } from "@/lib/admin-auth";
import { validateProductInput, PRODUCT_ALLOWED_FIELDS } from "@/lib/api/validation";
import { checkCSRF } from "@/lib/api/security";
import { checkRateLimit } from "@/lib/rate-limit";
import { logProductCreate } from "@/lib/api/audit";

export async function GET(req: Request) {
  if (!await checkAuth(req)) return unauthorized();
  try {
    const rows = await db.select().from(products).leftJoin(categories, eq(products.categoryId, categories.id)).orderBy(desc(products.createdAt));
    const result = rows.map(r => ({ ...r.products, category: r.categories }));
    return NextResponse.json(result);
  } catch (err) {
    console.error("Admin products GET error:", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!await checkAuth(req)) return unauthorized();
  const csrfRes = checkCSRF(req);
  if (csrfRes) return csrfRes;
  const rl = await checkRateLimit(req, 30);
  if (rl) return rl;
  try {
    const body = await req.json();
    const { clean, errors } = validateProductInput(body);
    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
    }
    const id = crypto.randomUUID();
    const insertData: Record<string, unknown> = { id, createdAt: new Date(), updatedAt: new Date() };
    for (const key of PRODUCT_ALLOWED_FIELDS) {
      if (clean[key] !== undefined) insertData[key] = clean[key];
    }
    await db.insert(products).values(insertData as any);
    await logProductCreate(id, (clean.name as string) || "");
    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("Admin products POST error:", err);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
