import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("vaultSneak_token")?.value;
  const { pathname } = request.nextUrl;

  // Redirect unauthenticated users trying to access protected pages
  const protectedRoutes = ["/wishlist", "/checkout"];
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  
  if (!token && isProtected) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from /login and /joinus
  const authPages = ["/login", "/joinus"];
  if (token && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Let the request proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/wishlist/:path*",
    "/checkout/:path*",
    "/login",
    "/joinus",
  ],
};
