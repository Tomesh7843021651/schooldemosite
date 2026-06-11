"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui";
import { routes } from "@/constants/routes";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  CheckIcon,
  SparklesIcon,
  WhatsAppIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
} from "@/components/layout/icons";

/**
 * The admission-conversion section. Lives just above the footer.
 *
 * Visual identity:
 *   • Premium gradient card (primary → primary/90 → accent) inside a
 *     default `surface` section.
 *   • Watermark "N" + dual ambient glows + secondary decorative orb.
 *   • Top: pulsing "Admissions Open" pill.
 *   • Middle: display headline + gold-highlighted last word + lead.
 *   • Trust strip: three glass pills with check icons.
 *   • Dual CTAs: gold "Apply" (primary action) + outlined "WhatsApp"
 *     (secondary low-friction action).
 *   • Bottom contact strip: Call · Email · Office Hours.
 */

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function AdmissionCTA() {
  const t = useTranslations("home.admissionCta");
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="admission-cta-title"
      className="relative py-16 md:py-24 lg:py-32 bg-[var(--color-background)]"
    >
      <Container>
        <motion.div
          variants={reduce ? undefined : stagger}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, margin: "-10% 0px" }}
          className={cn(
            "relative isolate overflow-hidden rounded-3xl",
            "bg-gradient-to-br from-primary via-primary/92 to-accent",
            "text-primary-foreground shadow-premium",
            "p-8 md:p-14 lg:p-20"
          )}
        >
          {/* Decorative layers */}
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 grid place-items-center select-none",
              "font-display text-primary-foreground/8 leading-none",
              "text-[18rem] md:text-[26rem] -z-10"
            )}
          >
            N
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-secondary/25 blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -left-24 w-[26rem] h-[26rem] rounded-full bg-primary-foreground/10 blur-3xl"
          />

          {/* Content */}
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.span
              variants={reduce ? undefined : fadeUp}
              className={cn(
                "inline-flex items-center gap-2 rounded-full",
                "px-4 py-1.5 border border-secondary/40 bg-secondary/15 text-secondary",
                "text-xs font-semibold uppercase tracking-[0.18em]"
              )}
            >
              <span aria-hidden className="relative inline-flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-60" />
                <span className="relative inline-block w-2 h-2 rounded-full bg-secondary" />
              </span>
              {t("eyebrow")}
            </motion.span>

            <motion.h2
              id="admission-cta-title"
              variants={reduce ? undefined : fadeUp}
              className={cn(
                "font-display text-balance mt-6 text-primary-foreground",
                "text-[clamp(2rem,4vw+1rem,3.75rem)] leading-tight"
              )}
            >
              {t("title")}{" "}
              <span className="text-secondary">{t("titleHighlight")}</span>
            </motion.h2>

            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="mt-6 text-base md:text-lg text-primary-foreground/85 max-w-2xl mx-auto text-pretty"
            >
              {t("description")}
            </motion.p>

            {/* Trust pills */}
            <motion.ul
              variants={reduce ? undefined : fadeUp}
              className="mt-8 flex flex-wrap justify-center gap-2.5"
            >
              <TrustPill>{t("trust.reply")}</TrustPill>
              <TrustPill>{t("trust.tour")}</TrustPill>
              <TrustPill>{t("trust.noPressure")}</TrustPill>
            </motion.ul>

            {/* CTAs */}
            <motion.div
              variants={reduce ? undefined : fadeUp}
              className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link
                href={routes.admissions}
                className={cn(
                  "group inline-flex items-center justify-center gap-2",
                  "rounded-full px-7 py-3.5 text-sm font-semibold",
                  "bg-secondary text-secondary-foreground shadow-lg",
                  "hover:bg-secondary/90 hover:shadow-xl transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                )}
              >
                <SparklesIcon size={16} />
                {t("primaryCta")}
                <ArrowRightIcon
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>

              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group inline-flex items-center justify-center gap-2",
                  "rounded-full px-7 py-3.5 text-sm font-semibold",
                  "border border-primary-foreground/35 bg-primary-foreground/5 text-primary-foreground backdrop-blur-md",
                  "hover:bg-primary-foreground/12 hover:border-primary-foreground/55 transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                )}
              >
                <WhatsAppIcon size={16} />
                {t("secondaryCta")}
              </a>
            </motion.div>
          </div>

          {/* Contact strip */}
          <motion.div
            variants={reduce ? undefined : fadeUp}
            className={cn(
              "relative mt-12 md:mt-16 pt-8 border-t border-primary-foreground/15",
              "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4"
            )}
          >
            <ContactBlock
              icon={<PhoneIcon size={16} />}
              label={t("contact.callLabel")}
              value={siteConfig.contact.phone}
              href={siteConfig.contact.phoneHref}
            />
            <ContactBlock
              icon={<MailIcon size={16} />}
              label={t("contact.mailLabel")}
              value={siteConfig.contact.email}
              href={siteConfig.contact.emailHref}
            />
            <ContactBlock
              icon={<ClockIcon size={16} />}
              label={t("contact.hoursLabel")}
              value={`${siteConfig.hours.schoolDays} · ${siteConfig.hours.officeTime}`}
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * TrustPill                                                          *
 * ------------------------------------------------------------------ */
function TrustPill({ children }: { children: React.ReactNode }) {
  return (
    <li
      className={cn(
        "inline-flex items-center gap-2 rounded-full",
        "px-4 py-2 text-sm font-medium",
        "bg-primary-foreground/10 text-primary-foreground/95",
        "border border-primary-foreground/20 backdrop-blur-md"
      )}
    >
      <span
        aria-hidden
        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-secondary text-secondary-foreground"
      >
        <CheckIcon size={11} />
      </span>
      {children}
    </li>
  );
}

/* ------------------------------------------------------------------ *
 * ContactBlock                                                       *
 * ------------------------------------------------------------------ */
function ContactBlock({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <>
      <span
        aria-hidden
        className={cn(
          "inline-flex items-center justify-center w-9 h-9 rounded-xl",
          "bg-primary-foreground/12 text-primary-foreground border border-primary-foreground/20"
        )}
      >
        {icon}
      </span>
      <div className="leading-tight min-w-0">
        <div className="text-[10px] uppercase tracking-[0.18em] text-secondary font-semibold">
          {label}
        </div>
        <div className="text-sm md:text-base text-primary-foreground mt-1 truncate">
          {value}
        </div>
      </div>
    </>
  );

  const classes = cn(
    "flex items-center gap-3 text-left",
    href && "hover:opacity-90 transition-opacity"
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {body}
      </a>
    );
  }

  return <div className={classes}>{body}</div>;
}
