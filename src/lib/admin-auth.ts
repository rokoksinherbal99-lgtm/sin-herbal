import { NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SALT = process.env.ADMIN_SALT || "sinherbal";

if (!ADMIN_PASSWORD) {
  console.warn("ADMIN_PASSWORD environment variable not set. Admin login will be disabled.");
}

export function hashToken(password: string): string {
  return Array.from(new TextEncoder().encode(password + SALT))
    .map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function checkAuth(req: Request): boolean {
  if (!ADMIN_PASSWORD) return false;
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/(?:^|;\s*)admin_token=([^;]+)/);
  if (!match) return false;
  return match[1] === hashToken(ADMIN_PASSWORD);
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
