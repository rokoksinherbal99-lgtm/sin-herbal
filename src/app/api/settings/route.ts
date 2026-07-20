import { NextResponse } from "next/server";
import { db } from "@/db";
import { settings } from "@/db/schema";

export async function GET() {
  try {
    const rows = await db.select().from(settings);
    const map: Record<string, string> = {};
    for (const s of rows) map[s.key] = s.value;

    return NextResponse.json(map);
  } catch (err) {
    console.error("Settings fetch error:", err);
    return NextResponse.json({ error: "Gagal memuat pengaturan" }, { status: 500 });
  }
}