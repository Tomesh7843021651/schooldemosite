"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { primaryNav, routes } from "@/constants/routes";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";
import { MenuIcon, ArrowRightIcon } from "./icons";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";

/**
 * Sticky top navigation.
 *
 * • Glassmorphism intensifies once the user scrolls past 24px.
 * • Active link gets a Framer Motion `layoutId` underline.
 * • Mobile (< lg) collapses everything except brand + Apply Now CTA
 *   into the hamburger drawer (<MobileMenu>).
 */
export function Navbar() {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setScrolled(window.scrollY > 24);
    }
  }, []);

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-30",
          "transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300",
          scrolled
            ? "bg-[var(--color-background)]/75 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--color-background)]/65 border-b border-border/60 shadow-sm"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div
          className={cn(
            "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4",
            "transition-[height] duration-300",
            scrolled ? "h-16" : "h-20"
          )}
        >
          <Link
            href={routes.home}
            aria-label={`${siteConfig.short} — ${t("home")}`}
            className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Logo />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-base md:text-lg text-foreground tracking-tight">
                {siteConfig.short}
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
                {t("tagline")}
              </span>
            </div>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-0.5"
          >
            {primaryNav.map((nav) => {
              const active = pathname === nav.href;
              return (
                <Link
                  key={nav.key}
                  href={nav.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative px-3.5 py-2 text-sm font-medium rounded-full",
                    "transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
                  )}
                >
                  {t(nav.key)}
                  {active && (
                    <motion.span
                      aria-hidden
                      layoutId="nl-nav-active"
                      className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>

            <Link
              href={routes.admissions}
              className={cn(
                "hidden md:inline-flex items-center gap-2 rounded-full",
                "px-5 py-2.5 text-sm font-semibold",
                "bg-primary text-primary-foreground shadow-md",
                "hover:bg-primary/90 hover:shadow-lg transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              {t("applyNow")}
              <ArrowRightIcon size={14} />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t("menuOpen")}
              aria-expanded={menuOpen}
              aria-controls="nl-mobile-menu"
              className={cn(
                "lg:hidden inline-flex items-center justify-center",
                "p-2.5 rounded-full",
                "border border-border bg-[var(--color-surface)]/60 backdrop-blur-md",
                "hover:bg-[var(--color-surface)] transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <MenuIcon size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      <div id="nl-mobile-menu">
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </>
  );
}

function Logo() {
  return (
    <div
      className={cn(
        "relative w-10 h-10 rounded-xl grid place-items-center",
        "bg-primary text-primary-foreground font-display text-lg",
        "shadow-md group-hover:shadow-lg transition-shadow duration-300"
      )}
      aria-hidden
    >
      N
      <span
        className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-secondary ring-2 ring-background"
        aria-hidden
      />
    </div>
  );
}
