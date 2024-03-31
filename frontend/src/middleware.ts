import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accesssToken");


  if (request.url === "/") {
    if (accessToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
}


export const config = {
  matcher: ["/((?!api|auth|_next/static|_next/image|.*\\.png|.svg|.jpg$).*)"],
};