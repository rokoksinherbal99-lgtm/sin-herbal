import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/db";
import { sessions } from "@/db/schema";
import { eq, lt } from "drizzle-orm";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const SALT = process.env.ADMIN_SALT || "sinherbal";
const SESSION_DURATION = 24 * 60 * 60 * 1000;

if (!ADMIN_PASSWORD) {
  console.warn("ADMIN_PASSWORD environment variable not set. Admin login will be disabled.");
}

if (ADMIN_PASSWORD && ADMIN_PASSWORD.length < 8) {
  console.warn("ADMIN_PASSWORD is too short (min 8 characters). Please set a stronger password.");
}

export function hashToken(password: string): string {
  return crypto.createHash("sha256").update(password + SALT).digest("hex");
}

export async function createSession(): Promise<string> {
  await db.delete(sessions).where(lt(sessions.expiresAt, new Date()));
  const id = crypto.randomUUID();
  await db.insert(sessions).values({
    id,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + SESSION_DURATION),
  });
  return id;
}

export async function destroySession(sessionId: string): Promise<void> {
  try {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
  } catch {}
}

export async function destroyAllSessions(): Promise<void> {
  try {
    await db.delete(sessions);
  } catch {}
}

export async function checkAuth(req: Request): Promise<boolean> {
  if (!ADMIN_PASSWORD) return false;
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/(?:^|;\s*)admin_token=([^;]+)/);
  if (!match) return false;
  try {
    const [row] = await db.select().from(sessions).where(eq(sessions.id, match[1])).limit(1);
    if (!row) return false;
    if (new Date(row.expiresAt) < new Date()) {
      await db.delete(sessions).where(eq(sessions.id, match[1]));
      return false;
    }
    await db.update(sessions).set({ expiresAt: new Date(Date.now() + SESSION_DURATION) }).where(eq(sessions.id, match[1]));
    return true;
  } catch {
    return false;
  }
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

const loginAttempts = new Map<string, { count: number; reset: number }>();

export function checkLoginRateLimit(req: Request): NextResponse | null {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || req.headers.get("x-real-ip")
    || "unknown";
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (!entry || now > entry.reset) {
    loginAttempts.set(ip, { count: 1, reset: now + 60_000 });
    return null;
  }

  entry.count++;
  if (entry.count > 5) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan login. Coba lagi dalam 1 menit." },
      { status: 429 },
    );
  }
  return null;
}

export function getAdminUsername(): string {
  return ADMIN_USERNAME;
}