import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  // Allow public assets & API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const isLoginPage = pathname.startsWith("/loginpage");

  // Not logged in → redirect to login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/loginpage", request.url));
  }

  // Logged in → prevent access to login page
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/homepage", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/homepage/:path*", "/loginpage"],
};