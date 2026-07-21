import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { checkAuth, unauthorized } from "@/lib/admin-auth";
import { validateProductInput, PRODUCT_ALLOWED_FIELDS } from "@/lib/api/validation";
import { checkCSRF } from "@/lib/api/security";
import { checkRateLimit } from "@/lib/rate-limit";
import { logProductUpdate, logProductDelete } from "@/lib/api/audit";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await checkAuth(req)) return unauthorized();
  const csrfRes = checkCSRF(req);
  if (csrfRes) return csrfRes;
  const rl = await checkRateLimit(req, 30);
  if (rl) return rl;
  try {
    const { id } = await params;
    const body = await req.json();
    const { clean, errors } = validateProductInput(body);
    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
    }
    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    for (const key of PRODUCT_ALLOWED_FIELDS) {
      if (clean[key] !== undefined) updateData[key] = clean[key];
    }
    if (Object.keys(updateData).length === 1) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }
    const [existing] = await db.select({ id: products.id }).from(products).where(eq(products.id, id)).limit(1);
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    await db.update(products).set(updateData as any).where(eq(products.id, id));
    await logProductUpdate(id, Object.keys(updateData).filter(k => k !== "updatedAt"));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin products PATCH error:", err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await checkAuth(req)) return unauthorized();
  const csrfRes = checkCSRF(req);
  if (csrfRes) return csrfRes;
  const rl = await checkRateLimit(req, 30);
  if (rl) return rl;
  try {
    const { id } = await params;
    const [existing] = await db.select({ id: products.id, name: products.name }).from(products).where(eq(products.id, id)).limit(1);
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    await db.delete(products).where(eq(products.id, id));
    await logProductDelete(id, existing.name);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin products DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
