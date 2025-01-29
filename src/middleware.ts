import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const vaultSneak_token = request.cookies.get("vaultSneak_token")?.value; 
  const url = request.nextUrl.clone();

  if (!vaultSneak_token) {
    url.pathname = "/login"; 
    return NextResponse.redirect(url);
  }

  if(vaultSneak_token && url.pathname === "/login") {
    return NextResponse.redirect(new URL('/', request.url))
   }

  // return NextResponse.next(); 

  // console.log("first middleware");
}

export const config = {
  matcher: [
    "/wishlist/:path*",
    "/checkout/:path*",
  ],
}