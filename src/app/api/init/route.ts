import { NextResponse } from "next/server";
import { migrate, seed, teardown } from "@/db/migrate";
import { checkAuth, unauthorized } from "@/lib/admin-auth";

export async function GET(req: Request) {
  if (!await checkAuth(req)) return unauthorized();
  try {
    const url = new URL(req.url);
    if (url.searchParams.get("force") === "true") await teardown();
    await migrate();
    await seed();
    return NextResponse.json({ success: true, message: "Database initialized" });
  } catch (err) {
    console.error("Init error:", err);
    return NextResponse.json({ success: false, error: "Database initialization failed" }, { status: 500 });
  }
}
