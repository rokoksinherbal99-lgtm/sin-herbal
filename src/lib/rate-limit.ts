import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = UPSTASH_URL && UPSTASH_TOKEN
  ? new Redis({ url: UPSTASH_URL, token: UPSTASH_TOKEN })
  : null;

const RATE_LIMIT_WINDOW = 60_000;
const DEFAULT_MAX = 20;

type Store = Map<string, { count: number; reset: number }>;

const fallbackStores: Record<string, Store> = {
  generic: new Map(),
  login: new Map(),
  order: new Map(),
};

function fallbackCheck(store: Store, key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  entry.count++;
  return entry.count <= max;
}

export function getClientIp(req: NextRequest | Request): string {
  const h = req.headers as Headers;
  return h.get("x-forwarded-for")?.split(",")[0]?.trim()
    || h.get("x-real-ip")
    || "unknown";
}

export async function checkRateLimit(req: NextRequest | Request, max?: number): Promise<NextResponse | null> {
  const ip = getClientIp(req);
  const limit = max ?? DEFAULT_MAX;

  if (redis) {
    const rl = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(limit, "1 m"), prefix: "rl" });
    const { success } = await rl.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Silakan coba lagi nanti." },
        { status: 429 },
      );
    }
    return null;
  }

  if (!fallbackCheck(fallbackStores.generic, ip, limit, RATE_LIMIT_WINDOW)) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan. Silakan coba lagi nanti." },
      { status: 429 },
    );
  }
  return null;
}

export async function checkLoginRateLimit(req: Request): Promise<NextResponse | null> {
  const ip = getClientIp(req);

  if (redis) {
    const rl = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "1 m"), prefix: "rl:login" });
    const { success } = await rl.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Terlalu banyak percobaan login. Coba lagi dalam 1 menit." },
        { status: 429 },
      );
    }
    return null;
  }

  if (!fallbackCheck(fallbackStores.login, ip, 5, 60_000)) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan login. Coba lagi dalam 1 menit." },
      { status: 429 },
    );
  }
  return null;
}

const SUSPICIOUS_WINDOW = 10 * 60 * 1000;
const SUSPICIOUS_THRESHOLD = 5;

export async function checkOrderSpam(ip: string): Promise<boolean> {
  if (redis) {
    const rl = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(SUSPICIOUS_THRESHOLD, "10 m"), prefix: "rl:order" });
    const { success } = await rl.limit(ip);
    return !success;
  }

  return !fallbackCheck(fallbackStores.order, ip, SUSPICIOUS_THRESHOLD, SUSPICIOUS_WINDOW);
}
