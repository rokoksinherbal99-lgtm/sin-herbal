import { NextRequest, NextResponse } from "next/server";

export function checkCSRF(req: NextRequest | Request): NextResponse | null {
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) return null;

  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const allowed = [
    "https://rokoksin.vercel.app",
    process.env.NEXT_PUBLIC_BASE_URL,
    ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : []),
  ].filter(Boolean) as string[];

  const isAllowed = (value: string | null) =>
    value && allowed.some((a) => value.startsWith(a));

  if (!isAllowed(origin) && !isAllowed(referer)) {
    return NextResponse.json(
      { error: "Request tidak valid" },
      { status: 403 },
    );
  }

  return null;
}
