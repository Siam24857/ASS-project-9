import { NextResponse } from "next/server";

export async function middleware(req) {
  const sessionToken =
    req.cookies.get("better-auth.session-token")?.value ||
    req.cookies.get("better-auth.session")?.value ||
    req.cookies.get("session")?.value ||
    req.cookies.get("auth_session")?.value;

  const isProtected =
    req.nextUrl.pathname.startsWith("/add-room") ||
    req.nextUrl.pathname.startsWith("/my-bookings") ||
    req.nextUrl.pathname.startsWith("/my-listroom") ||
    req.nextUrl.pathname.startsWith("/room-details");

  if (isProtected && !sessionToken) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-room/:path*",
    "/my-bookings/:path*",
    "/my-listroom/:path*",
    "/room-details/:path*",
  ],
};