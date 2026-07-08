import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { checkAuth, unauthorized } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();
  try {
    const body = await req.json();
    const { to, message } = body;
    if (!to || !message) {
      return NextResponse.json({ error: "Missing 'to' or 'message'" }, { status: 400 });
    }

    const rows = await db.select().from(settings);
    const config: Record<string, string> = {};
    for (const row of rows) config[row.key] = row.value;

    const phoneNumberId = config.wa_phone_number_id;
    const accessToken = config.wa_access_token;

    if (!phoneNumberId || !accessToken) {
      return NextResponse.json({ error: "WhatsApp not configured" }, { status: 400 });
    }

    const WA_API = `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`;

    const res = await fetch(WA_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: message },
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.error?.message || "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to send" }, { status: 500 });
  }
}
