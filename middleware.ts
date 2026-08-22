import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  const { pathname } = req.nextUrl;

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/reports");

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(
      new URL("/login", req.nextUrl)
    );
  }

  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(
      new URL("/dashboard", req.nextUrl)
    );
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
