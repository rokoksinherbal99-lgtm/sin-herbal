import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db.select().from(categories).orderBy(asc(categories.name));
    return NextResponse.json(rows);
  } catch (err) {
    console.error("Categories fetch error:", err);
    return NextResponse.json({ error: "Gagal memuat kategori" }, { status: 500 });
  }
}