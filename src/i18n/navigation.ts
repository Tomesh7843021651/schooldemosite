import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation primitives.
 *
 * Always import `Link`, `useRouter`, `usePathname` and `redirect` from this
 * module instead of `next/link` / `next/navigation` so that locale prefixes
 * are handled automatically by next-intl.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
