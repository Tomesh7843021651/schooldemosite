"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, SendIcon, CheckIcon } from "@/components/layout/icons";

/**
 * Placeholder contact form — no backend wired yet. The form prevents
 * default submission and shows a thank-you state locally so the layout
 * can still be reviewed end-to-end.
 */

const SUBJECT_KEYS = [
  "admission",
  "fees",
  "transport",
  "visit",
  "other",
] as const;

export function ContactForm() {
  const t = useTranslations("pages.contact.form");
  const reduce = useReducedMotion();
  const [submitted, setSubmitted] = React.useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "rounded-3xl border border-border bg-[var(--color-surface)]",
        "p-7 md:p-8 lg:p-10 shadow-md"
      )}
    >
      <span className="text-eyebrow">{t("eyebrow")}</span>
      <h2 className="font-display text-2xl md:text-3xl text-foreground mt-2">
        {t("title")}
      </h2>
      <p className="text-sm md:text-base text-[var(--color-muted-foreground)] mt-3 text-pretty">
        {t("description")}
      </p>

      {submitted ? (
        <div
          className={cn(
            "mt-8 rounded-2xl border border-accent/30 bg-accent/10 p-6",
            "flex items-start gap-4"
          )}
          role="status"
        >
          <span className="mt-0.5 inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent text-accent-foreground shrink-0">
            <CheckIcon size={20} />
          </span>
          <div>
            <h3 className="font-display text-lg text-foreground">
              {t("successTitle")}
            </h3>
            <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
              {t("successBody")}
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label={t("fields.name")} required>
            <input
              type="text"
              name="name"
              required
              className={inputClass}
              autoComplete="name"
            />
          </Field>

          <Field label={t("fields.email")} required>
            <input
              type="email"
              name="email"
              required
              className={inputClass}
              autoComplete="email"
            />
          </Field>

          <Field label={t("fields.phone")}>
            <input
              type="tel"
              name="phone"
              className={inputClass}
              autoComplete="tel"
            />
          </Field>

          <Field label={t("fields.subject")} required>
            <select name="subject" required className={inputClass}>
              {SUBJECT_KEYS.map((s) => (
                <option key={s} value={s}>
                  {t(`subjects.${s}`)}
                </option>
              ))}
            </select>
          </Field>

          <Field label={t("fields.message")} required className="sm:col-span-2">
            <textarea
              name="message"
              required
              rows={5}
              className={cn(inputClass, "resize-y min-h-32")}
            />
          </Field>

          <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
            <p className="text-xs text-[var(--color-muted-foreground)]">
              {t("note")}
            </p>
            <button
              type="submit"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap",
                "bg-primary text-primary-foreground shadow-md",
                "hover:bg-primary/90 hover:shadow-lg transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
              )}
            >
              <SendIcon size={14} />
              {t("submit")}
              <ArrowRightIcon size={14} />
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}

const inputClass = cn(
  "w-full rounded-xl border border-border bg-[var(--color-background)]",
  "px-4 py-3 text-sm md:text-base text-foreground",
  "placeholder:text-[var(--color-muted-foreground)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring",
  "transition-shadow"
);

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-2 text-sm", className)}>
      <span className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[var(--color-muted-foreground)]">
        {label}
        {required ? (
          <span aria-hidden className="text-primary"> *</span>
        ) : null}
      </span>
      {children}
    </label>
  );
}
