import { NextResponse } from "next/server";
import { checkAuth, unauthorized } from "@/lib/admin-auth";

export async function GET(req: Request) {
  try {
    if (!await checkAuth(req)) return unauthorized();
    return NextResponse.json({ authed: true });
  } catch (err) {
    console.error("Auth check error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}