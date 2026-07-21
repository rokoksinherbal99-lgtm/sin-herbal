import { NextResponse } from "next/server";
import { db } from "@/db";
import { testimonials, products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { checkAuth, unauthorized } from "@/lib/admin-auth";
import { sanitize } from "@/lib/api/validation";
import { checkCSRF } from "@/lib/api/security";
import { checkRateLimit } from "@/lib/rate-limit";
import { logTestimonialCreate, logTestimonialUpdate, logTestimonialDelete } from "@/lib/api/audit";

export async function GET(req: Request) {
  if (!await checkAuth(req)) return unauthorized();
  try {
    const rows = await db.select().from(testimonials).leftJoin(products, eq(testimonials.productId, products.id)).orderBy(desc(testimonials.createdAt));
    const data = rows.map((r) => ({
      ...r.testimonials,
      productName: r.products?.name || null,
      productImage: r.products?.images || null,
    }));
    return NextResponse.json(data);
  } catch (err) {
    console.error("Admin testimonials GET error:", err);
    return NextResponse.json({ error: "Gagal memuat testimoni" }, { status: 500 });
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
    const id = `t${Date.now()}`;
    const clean = { ...body };
    if (typeof clean.name === "string") clean.name = sanitize(clean.name.trim());
    if (typeof clean.text === "string") clean.text = sanitize(clean.text.trim());
    if (typeof clean.city === "string") clean.city = sanitize(clean.city.trim());
    if (typeof clean.rating !== "number") clean.rating = 5;
    if (clean.rating < 1 || clean.rating > 5) clean.rating = 5;
    await db.insert(testimonials).values({ id, ...clean });
    await logTestimonialCreate(id);
    return NextResponse.json({ id });
  } catch (err) {
    console.error("Admin testimonials POST error:", err);
    return NextResponse.json({ error: "Gagal menyimpan testimoni" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!await checkAuth(req)) return unauthorized();
  const csrfRes = checkCSRF(req);
  if (csrfRes) return csrfRes;
  const rl = await checkRateLimit(req, 30);
  if (rl) return rl;
  try {
    const { id, ...data } = await req.json();
    const clean = { ...data };
    if (typeof clean.name === "string") clean.name = sanitize(clean.name.trim());
    if (typeof clean.text === "string") clean.text = sanitize(clean.text.trim());
    if (typeof clean.city === "string") clean.city = sanitize(clean.city.trim());
    if (typeof clean.rating === "number") {
      if (clean.rating < 1 || clean.rating > 5) clean.rating = 5;
    }
    await db.update(testimonials).set(clean).where(eq(testimonials.id, id));
    await logTestimonialUpdate(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Admin testimonials PUT error:", err);
    return NextResponse.json({ error: "Gagal mengupdate testimoni" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!await checkAuth(req)) return unauthorized();
  const csrfRes = checkCSRF(req);
  if (csrfRes) return csrfRes;
  const rl = await checkRateLimit(req, 30);
  if (rl) return rl;
  try {
    const { id } = await req.json();
    await db.delete(testimonials).where(eq(testimonials.id, id));
    await logTestimonialDelete(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Admin testimonials DELETE error:", err);
    return NextResponse.json({ error: "Gagal menghapus testimoni" }, { status: 500 });
  }
}
