import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow Next internals / static files
  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // Allow all API routes (login, proxy, etc.)
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Allow public routes
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  // Require session cookie everywhere else
  const session = await req.cookies.get("session")?.value;
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
