import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Get roleId from cookies
  const roleId = req.cookies.get("roleId")?.value;
  const token = req.cookies.get("token")?.value;

  const isAuthenticated = !!(token && roleId);
  const roleIdNum = roleId ? parseInt(roleId) : null;

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith("/home");

  // Protected routes that require authentication
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // If accessing dashboard without authentication → redirect to login
  if (isDashboardRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If authenticated and on login/signup → redirect based on role
  if (isAuthenticated && (pathname === "/login" || pathname === "/signup")) {
    if (roleIdNum === 1 || roleIdNum === 3) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } else if (roleIdNum === 2) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // If authenticated, enforce role-based access
  if (isAuthenticated && roleIdNum) {
    // roleId 1 or 3 (admin/staff) trying to access home → redirect to dashboard
    if ((roleIdNum === 1 || roleIdNum === 3) && (pathname === "/" || pathname.startsWith("/home"))) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // roleId 2 (regular user) trying to access dashboard → redirect to home
    if (roleIdNum === 2 && isDashboardRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", 
    "/home/:path*", 
    "/dashboard/:path*",
    "/login",
    "/signup"
  ],
};