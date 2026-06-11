/**
 * Edge-runtime locale router (Next.js 16+ replacement for the older
 * `middleware.ts` convention).
 *
 * Powered by next-intl: handles locale detection, prefix routing
 * (`/about` → `/en/about`), and the `NEXT_LOCALE` cookie.
 *
 * The matcher excludes:
 *   • `/api`        — API routes
 *   • `/_next`      — Next.js internals
 *   • `/_vercel`    — Vercel runtime internals
 *   • Any path that contains a dot (favicon.ico, /sitemap.xml, /robots.txt,
 *     /images/foo.jpg, etc.) so static / generated files bypass the router.
 */

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
