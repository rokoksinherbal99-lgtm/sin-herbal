import { NextResponse } from "next/server";
import { checkAuth, unauthorized } from "@/lib/admin-auth";

export async function GET(req: Request) {
  if (!checkAuth(req)) return unauthorized();
  return NextResponse.json({ authed: true });
}
