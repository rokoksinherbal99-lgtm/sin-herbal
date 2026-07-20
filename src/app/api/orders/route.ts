import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { checkRateLimit, checkCSRF, getClientIp } from "@/lib/api/security";

const REQUIRED_FIELDS = ["customer", "email", "phone", "address", "city", "province", "postalCode"];
const FIVE_MIN = 5 * 60 * 1000;
const MAX_TOTAL = 50_000_000;
const MIN_TOTAL = 1_000;

const SUSPICIOUS_PATTERNS = [
  /\bhacker\b/i,
  /\bred\s*team\b/i,
  /\badmin\b/i,
  /<[^>]*>/,
  /['";]/,
  /(?:script|alert|prompt|eval|exec)/i,
];

const SUSPICIOUS_NAMES = ["hacker", "red team", "test", "admin", "root", "anonymous"];

const orderAttempts = new Map<string, { count: number; firstAttempt: number; blocked: boolean }>();
const SUSPICIOUS_THRESHOLD = 5;
const SUSPICIOUS_WINDOW = 10 * 60 * 1000;

function isSuspiciousName(name: string): boolean {
  const lower = name.toLowerCase().trim();
  for (const s of SUSPICIOUS_NAMES) {
    if (lower === s || lower.includes(s)) return true;
  }
  for (const p of SUSPICIOUS_PATTERNS) {
    if (p.test(name)) return true;
  }
  return false;
}

function isSuspiciousEmail(email: string): boolean {
  const e = email.toLowerCase().trim();
  if (!e.includes("@") || !e.includes(".")) return true;
  for (const s of SUSPICIOUS_NAMES) {
    if (e.includes(s)) return true;
  }
  if (SUSPICIOUS_PATTERNS.some((p) => p.test(e))) return true;
  return false;
}

function isSuspiciousField(value: string): boolean {
  if (SUSPICIOUS_PATTERNS.some((p) => p.test(value))) return true;
  return false;
}

function checkSpamPattern(ip: string): boolean {
  const now = Date.now();
  const entry = orderAttempts.get(ip);

  if (!entry || now - entry.firstAttempt > SUSPICIOUS_WINDOW) {
    orderAttempts.set(ip, { count: 1, firstAttempt: now, blocked: false });
    return false;
  }

  entry.count++;
  if (entry.blocked) return true;

  if (entry.count >= SUSPICIOUS_THRESHOLD) {
    entry.blocked = true;
    return true;
  }

  return false;
}

export async function POST(req: NextRequest) {
  const rateLimitRes = checkRateLimit(req, 10);
  if (rateLimitRes) return rateLimitRes;

  const csrfRes = checkCSRF(req);
  if (csrfRes) return csrfRes;

  const ip = getClientIp(req);

  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Request body tidak valid" }, { status: 400 });
    }

    if (body._website && typeof body._website === "string" && body._website.length > 0) {
      return NextResponse.json({ error: "Request tidak valid" }, { status: 400 });
    }

    if (!body._timestamp || typeof body._timestamp !== "number") {
      return NextResponse.json({ error: "Request tidak valid" }, { status: 400 });
    }

    const now = Date.now();
    if (Math.abs(now - body._timestamp) > FIVE_MIN) {
      return NextResponse.json({ error: "Sesi habis, silakan muat ulang halaman" }, { status: 400 });
    }

    for (const field of REQUIRED_FIELDS) {
      if (!body[field] || typeof body[field] !== "string") {
        return NextResponse.json({ error: `Field ${field} wajib diisi` }, { status: 400 });
      }
      if (field === "customer" && isSuspiciousName(body[field])) {
        return NextResponse.json({ error: "Nama tidak valid" }, { status: 400 });
      }
      if (field === "email" && isSuspiciousEmail(body[field])) {
        return NextResponse.json({ error: "Email tidak valid" }, { status: 400 });
      }
      if (isSuspiciousField(body[field])) {
        console.warn(`Suspicious field ${field} from IP ${ip}: ${body[field]}`);
        return NextResponse.json({ error: `Field ${field} tidak valid` }, { status: 400 });
      }
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Minimal 1 item dalam pesanan" }, { status: 400 });
    }

    if (typeof body.total !== "number" || body.total <= 0) {
      return NextResponse.json({ error: "Total tidak valid" }, { status: 400 });
    }

    if (body.total > MAX_TOTAL) {
      return NextResponse.json({ error: `Total pesanan melebihi batas maksimal Rp ${MAX_TOTAL.toLocaleString("id-ID")}` }, { status: 400 });
    }

    if (body.total < MIN_TOTAL && body.total > 0) {
      return NextResponse.json({ error: "Total pesanan terlalu rendah" }, { status: 400 });
    }

    if (checkSpamPattern(ip)) {
      console.warn(`Blocked spam order from IP ${ip}`);
      return NextResponse.json({ error: "Terlalu banyak percobaan. Silakan hubungi admin via WA." }, { status: 429 });
    }

    const orderId = crypto.randomUUID();

    const itemRows = body.items.map((item: any) => ({
      id: crypto.randomUUID(),
      orderId,
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    await db.insert(orders).values({
      id: orderId,
      customer: body.customer,
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city,
      province: body.province,
      postalCode: body.postalCode,
      total: body.total,
    });

    await db.insert(orderItems).values(itemRows);

    return NextResponse.json({ id: orderId });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Gagal membuat pesanan. Silakan coba lagi." }, { status: 500 });
  }
}
