import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["az", "ru"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return NextResponse.next();
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/az" : `/az${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|icon.svg|.*\\..*).*)"],
};
