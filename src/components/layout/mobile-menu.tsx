"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { primaryNav, routes } from "@/constants/routes";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";
import { CloseIcon, ArrowRightIcon } from "./icons";
import { LanguageSwitcher } from "./language-switcher";

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const backdrop: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const panel: Variants = {
  hidden: { x: "100%" },
  show: { x: 0, transition: { type: "spring", stiffness: 220, damping: 28 } },
  exit: { x: "100%", transition: { duration: 0.25, ease: [0.32, 0, 0.67, 0] } },
};

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, x: 16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);
  const previouslyFocused = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t0 = window.setTimeout(() => closeBtnRef.current?.focus(), 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t0);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="nl-menu-backdrop"
            variants={reduce ? undefined : backdrop}
            initial={reduce ? { opacity: 0 } : "hidden"}
            animate={reduce ? { opacity: 1 } : "show"}
            exit={reduce ? { opacity: 0 } : "hidden"}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm lg:hidden"
          />

          <motion.aside
            key="nl-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label={t("menu")}
            variants={reduce ? undefined : panel}
            initial={reduce ? { x: 0 } : "hidden"}
            animate={reduce ? { x: 0 } : "show"}
            exit={reduce ? { x: 0 } : "exit"}
            className={cn(
              "fixed top-0 right-0 z-50 h-[100dvh] w-[88vw] max-w-sm",
              "bg-[var(--color-surface)] border-l border-border shadow-premium",
              "flex flex-col lg:hidden"
            )}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex flex-col leading-tight">
                <span className="font-display text-lg text-foreground">
                  {siteConfig.short}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
                  {t("tagline")}
                </span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label={t("menuClose")}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  "hover:bg-[var(--color-surface-muted)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <motion.nav
              variants={reduce ? undefined : list}
              initial={reduce ? false : "hidden"}
              animate={reduce ? undefined : "show"}
              aria-label={t("menu")}
              className="flex-1 overflow-y-auto px-4 py-6"
            >
              <ul className="space-y-1">
                {primaryNav.map((nav) => {
                  const active = pathname === nav.href;
                  return (
                    <motion.li
                      key={nav.key}
                      variants={reduce ? undefined : item}
                    >
                      <Link
                        href={nav.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group flex items-center justify-between rounded-2xl",
                          "px-4 py-3.5 font-display text-xl transition-colors",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-[var(--color-surface-muted)]"
                        )}
                      >
                        <span>{t(nav.key)}</span>
                        <ArrowRightIcon
                          size={18}
                          className={cn(
                            "opacity-40 transition-all duration-300",
                            active
                              ? "opacity-100 translate-x-0.5"
                              : "group-hover:opacity-80 group-hover:translate-x-1"
                          )}
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.nav>

            <div className="px-5 py-5 border-t border-border space-y-4 bg-[var(--color-surface-muted)]/50">
              <div className="flex items-center justify-between">
                <span className="text-eyebrow !text-[var(--color-muted-foreground)]">
                  {t("languageLabel")}
                </span>
                <LanguageSwitcher variant="pill" />
              </div>

              <Link
                href={routes.admissions}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-center gap-2 w-full rounded-full",
                  "px-6 py-3.5 font-semibold text-sm",
                  "bg-primary text-primary-foreground shadow-md",
                  "hover:bg-primary/90 hover:shadow-lg transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                {t("applyNow")}
                <ArrowRightIcon size={16} />
              </Link>

              <a
                href={siteConfig.contact.phoneHref}
                className={cn(
                  "block text-center text-sm text-[var(--color-muted-foreground)]",
                  "hover:text-primary transition-colors"
                )}
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
