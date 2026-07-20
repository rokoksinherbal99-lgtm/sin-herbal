import { NextRequest, NextResponse } from "next/server";

const rateLimit = new Map<string, { count: number; reset: number }>();

const RATE_LIMIT_WINDOW = 60_000;
const DEFAULT_MAX = 20;
const AUTH_MAX = 60;

export function getClientIp(req: NextRequest | Request): string {
  const h = req.headers as Headers;
  return h.get("x-forwarded-for")?.split(",")[0]?.trim()
    || h.get("x-real-ip")
    || "unknown";
}

export function checkRateLimit(req: NextRequest | Request, max?: number): NextResponse | null {
  const ip = getClientIp(req);
  const now = Date.now();
  const entry = rateLimit.get(ip);
  const limit = max ?? DEFAULT_MAX;

  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW });
    return null;
  }

  entry.count++;
  if (entry.count > limit) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan. Silakan coba lagi nanti." },
      { status: 429 },
    );
  }

  return null;
}

export function checkCSRF(req: NextRequest | Request): NextResponse | null {
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) return null;

  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const allowed = [
    "https://rokoksin.vercel.app",
    process.env.NEXT_PUBLIC_BASE_URL,
    ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : []),
  ].filter(Boolean) as string[];

  const isAllowed = (value: string | null) =>
    value && allowed.some((a) => value.startsWith(a));

  if (!isAllowed(origin) && !isAllowed(referer)) {
    return NextResponse.json(
      { error: "Request tidak valid" },
      { status: 403 },
    );
  }

  return null;
}
