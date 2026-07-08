import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { checkAuth, unauthorized } from "@/lib/admin-auth";

const ALLOWED_KEYS = ["wa_phone_number_id", "wa_access_token", "wa_verify_token", "wa_business_phone", "wa_admin_phone"];

export async function GET(req: Request) {
  if (!checkAuth(req)) return unauthorized();
  try {
    const rows = await db.select().from(settings);
    const result: Record<string, string> = {};
    for (const row of rows) {
      if (ALLOWED_KEYS.includes(row.key)) {
        result[row.key] = row.value;
      }
    }
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();
  try {
    const body = await req.json();
    for (const key of Object.keys(body)) {
      if (!ALLOWED_KEYS.includes(key)) continue;
      await db
        .insert(settings)
        .values({ key, value: String(body[key]), updatedAt: new Date() })
        .onConflictDoUpdate({ target: settings.key, set: { value: String(body[key]), updatedAt: new Date() } });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
