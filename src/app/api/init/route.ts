import { NextResponse } from "next/server";
import { migrate, seed, teardown } from "@/db/migrate";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    if (url.searchParams.get("force") === "true") await teardown();
    await migrate();
    await seed();
    return NextResponse.json({ success: true, message: "Database initialized" });
  } catch {
    return NextResponse.json({ success: false, error: "Database initialization failed" }, { status: 500 });
  }
}
