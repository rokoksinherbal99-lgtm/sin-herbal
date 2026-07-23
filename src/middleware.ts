import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin" || pathname === "/admin/") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/admin/")) {
    const isLogin = pathname === "/api/admin/login";
    const isCheck = pathname === "/api/admin/check";
    if (isLogin || isCheck) return NextResponse.next();

    const token = req.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
