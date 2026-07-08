import { NextResponse } from "next/server";
import { db } from "@/db";
import { settings } from "@/db/schema";

const PUBLIC_KEYS = ["wa_phone", "address", "email", "shipping_info", "operating_hours"];

const DEFAULTS: Record<string, string> = {
  wa_phone: "6281383863456",
  address: "Ruko Sentra Niaga Blok A1 No. 5, Pakisaji, Malang 65162",
  email: "info@sinherbal.com",
  shipping_info: "Gratis ongkir untuk area tertentu (syarat & ketentuan berlaku)",
  operating_hours: "Senin - Sabtu 08.00 - 17.00, Minggu 09.00 - 14.00",
};

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await db.select().from(settings);
    const result: Record<string, string> = { ...DEFAULTS };
    for (const row of rows) {
      if (PUBLIC_KEYS.includes(row.key)) {
        result[row.key] = row.value;
      }
    }
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(DEFAULTS);
  }
}
