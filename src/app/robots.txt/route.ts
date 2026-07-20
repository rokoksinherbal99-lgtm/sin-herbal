import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://rokoksin.vercel.app";

export async function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${BASE_URL}/sitemap.xml
`;
  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
