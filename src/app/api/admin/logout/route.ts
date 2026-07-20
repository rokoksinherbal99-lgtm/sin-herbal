import { NextResponse } from "next/server";
import { destroySession } from "@/lib/admin-auth";
import { checkCSRF } from "@/lib/api/security";

export async function POST(req: Request) {
  try {
    const csrfRes = checkCSRF(req);
    if (csrfRes) return csrfRes;

    const cookie = req.headers.get("cookie") || "";
    const match = cookie.match(/(?:^|;\s*)admin_token=([^;]+)/);
    if (match) {
      await destroySession(match[1]);
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return res;
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}