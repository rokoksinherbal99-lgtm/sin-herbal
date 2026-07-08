import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { checkAuth, unauthorized } from "@/lib/admin-auth";

const ALLOWED_FIELDS = ["name", "slug", "description", "price", "images", "categoryId", "productType", "manufacturer", "stock", "featured"];

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) return unauthorized();
  try {
    const { id } = await params;
    const body = await req.json();
    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    for (const key of ALLOWED_FIELDS) {
      if (body[key] !== undefined) updateData[key] = body[key];
    }
    if (Object.keys(updateData).length === 1) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }
    const [existing] = await db.select({ id: products.id }).from(products).where(eq(products.id, id)).limit(1);
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    await db.update(products).set(updateData as any).where(eq(products.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) return unauthorized();
  try {
    const { id } = await params;
    const [existing] = await db.select({ id: products.id }).from(products).where(eq(products.id, id)).limit(1);
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    await db.delete(products).where(eq(products.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
