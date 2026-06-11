import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

/**
 * Lightweight locale proxy (Next.js 16+ replacement for `middleware.ts`).
 *
 * Why hand-rolled instead of `next-intl/middleware`?
 *   next-intl 4.x's edge bundle currently throws
 *   `MIDDLEWARE_INVOCATION_FAILED` on Vercel when running on Next 16's
 *   new `proxy` runtime. The redirect we actually need from it is trivial,
 *   so we inline it and keep the rest of next-intl untouched (translations,
 *   server-side `setRequestLocale`, the locale-aware `Link`, etc. all still
 *   work because they read the locale from the URL params, not from this
 *   function).
 *
 * Behaviour:
 *   - `/`                → 307 → `/{defaultLocale}`
 *   - `/about`           → 307 → `/{defaultLocale}/about`
 *   - `/en/about`        → pass-through (already locale-prefixed)
 *   - `/sitemap.xml`     → not matched (the matcher excludes paths with dots)
 *   - `/api/*`, `/_next/*`, `/_vercel/*` → not matched
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  const target = request.nextUrl.clone();
  const prefix = `/${routing.defaultLocale}`;
  target.pathname = pathname === "/" ? prefix : `${prefix}${pathname}`;
  return NextResponse.redirect(target, 307);
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
