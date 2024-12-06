import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.cookies.has("tokenUser")) {
    if (
      request.nextUrl.pathname.startsWith("/auth/login")
      //   request.nextUrl.pathname.startsWith("/auth/user/register")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  } else {
    if (
      request.nextUrl.pathname.startsWith("/auth")
      //   request.nextUrl.pathname.startsWith("/auth/user/register")
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    "/user/:path*",
    "/auth/:path*",
    "/user/:path*",
    "/category/:path/booking",
  ],
};
