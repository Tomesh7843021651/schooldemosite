"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import {
  GlobeIcon,
  ChevronDownIcon,
  CheckIcon,
} from "./icons";

type Locale = (typeof routing.locales)[number];

/** Native script labels for each supported locale. */
const NATIVE_LABEL: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  mr: "मराठी",
};

export type LanguageSwitcherProps = {
  /**
   * `pill`   — default chip used in the desktop navbar.
   * `inline` — borderless variant used inside the mobile drawer footer.
   */
  variant?: "pill" | "inline";
  className?: string;
};

export function LanguageSwitcher({
  variant = "pill",
  className,
}: LanguageSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("navbar");
  const tLang = useTranslations("languages");
  const reduce = useReducedMotion();

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Close on ESC, return focus to trigger
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const switchTo = (next: Locale) => {
    if (next !== currentLocale) {
      router.replace(pathname, { locale: next });
    }
    setOpen(false);
  };

  const triggerStyles =
    variant === "pill"
      ? "border border-border bg-[var(--color-surface)]/60 backdrop-blur-md px-3 py-2 hover:bg-[var(--color-surface)]"
      : "px-2 py-1 hover:bg-[var(--color-surface-muted)]";

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("languageLabel")}
        className={cn(
          "inline-flex items-center gap-2 rounded-full text-sm font-medium",
          "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          triggerStyles
        )}
      >
        <GlobeIcon size={16} />
        <span className="uppercase tracking-wide">{currentLocale}</span>
        <ChevronDownIcon
          size={14}
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t("languageLabel")}
            initial={reduce ? false : { opacity: 0, y: -6, scale: 0.98 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute right-0 mt-2 min-w-[12rem] z-50",
              "rounded-2xl border border-border bg-[var(--color-surface)]",
              "shadow-lg overflow-hidden"
            )}
          >
            {routing.locales.map((code) => {
              const isActive = code === currentLocale;
              return (
                <li key={code} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onClick={() => switchTo(code as Locale)}
                    className={cn(
                      "w-full flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors",
                      "focus-visible:outline-none focus-visible:bg-[var(--color-surface-muted)]",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-[var(--color-surface-muted)]"
                    )}
                  >
                    <span className="flex flex-col items-start leading-tight">
                      <span className="font-display text-base">
                        {NATIVE_LABEL[code as Locale]}
                      </span>
                      <span className="text-[11px] uppercase tracking-wider opacity-60">
                        {tLang(code as Locale)}
                      </span>
                    </span>
                    {isActive ? (
                      <CheckIcon size={16} className="shrink-0" />
                    ) : (
                      <span className="text-[11px] uppercase tracking-wider opacity-50">
                        {code}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
