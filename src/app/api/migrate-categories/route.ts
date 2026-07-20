import { NextResponse } from "next/server";
import { migrateExisting } from "@/db/migrate";
import { checkAuth, unauthorized } from "@/lib/admin-auth";

export async function GET(req: Request) {
  if (!await checkAuth(req)) return unauthorized();
  try {
    await migrateExisting();
    return NextResponse.json({ success: true, message: "Database migrated: categories updated, old columns removed" });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
