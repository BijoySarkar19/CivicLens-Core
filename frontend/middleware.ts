import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/dashboard", "/assets", "/incidents", "/inspections", "/work-orders", "/map", "/admin"];

export function middleware(request: NextRequest) {
  const protectedRoute = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));
  if (!protectedRoute) return NextResponse.next();

  if (!request.cookies.get("access_token")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/assets/:path*", "/incidents/:path*", "/inspections/:path*", "/work-orders/:path*", "/map/:path*", "/admin/:path*"],
};
