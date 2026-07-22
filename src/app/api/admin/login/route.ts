import { NextResponse } from "next/server";
import { hashPassword, verifyPassword, getAdminUsername, createSession } from "@/lib/admin-auth";
import { checkLoginRateLimit } from "@/lib/rate-limit";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { logLogin } from "@/lib/api/audit";
import { checkCSRF } from "@/lib/api/security";

export async function POST(req: Request) {
  try {
    const csrfRes = checkCSRF(req);
    if (csrfRes) return csrfRes;
    const rateLimitRes = await checkLoginRateLimit(req);
    if (rateLimitRes) return rateLimitRes;

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Admin not configured" }, { status: 500 });
    }

    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username dan password wajib diisi" }, { status: 400 });
    }

    if (username !== getAdminUsername()) {
      await logLogin(username || "unknown", false);
      return NextResponse.json({ error: "Username atau password salah" }, { status: 401 });
    }

    const dbRow = await db.select().from(settings).where(eq(settings.key, "admin_password_hash")).limit(1);
    const dbHash = dbRow.length > 0 ? dbRow[0].value : null;

    const envMatch = password === ADMIN_PASSWORD;
    let dbMatch = false;
    if (dbHash) {
      if (dbHash.startsWith("$2")) {
        dbMatch = await verifyPassword(password, dbHash);
      } else {
        const newHash = await hashPassword(password);
        dbMatch = password === ADMIN_PASSWORD;
        if (dbMatch) {
          await db.update(settings).set({ value: newHash, updatedAt: new Date() }).where(eq(settings.key, "admin_password_hash"));
        }
      }
    }

    if (!envMatch && !dbMatch) {
      await logLogin(username, false);
      return NextResponse.json({ error: "Username atau password salah" }, { status: 401 });
    }

    await logLogin(username, true);

    const sessionId = await createSession();
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
