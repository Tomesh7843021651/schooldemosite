"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Container, SectionTitle } from "@/components/ui";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  AwardIcon,
  PlayCircleIcon,
} from "@/components/layout/icons";

/**
 * Principal's personal note — the single most powerful trust-builder on a
 * school homepage. Two columns on desktop:
 *
 *   Left  : portrait card (image-ready gradient placeholder w/ initials,
 *           name plate + years-serving badge)
 *   Right : message card  (oversized quote mark, three paragraphs,
 *           italic sign-off + Cormorant signature, read-more CTA)
 */

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function PrincipalMessage() {
  const t = useTranslations("home.principalMessage");
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="principal-message-title"
      className={cn(
        "relative py-16 md:py-24 lg:py-32 overflow-hidden",
        "bg-[var(--color-surface-muted)]"
      )}
    >
      {/* Ambient brand glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 w-[28rem] h-[28rem] rounded-full bg-primary/8 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-24 w-[26rem] h-[26rem] rounded-full bg-accent/8 blur-3xl"
      />

      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={
            <span id="principal-message-title">{t("title")}</span>
          }
          description={t("description")}
          align="left"
          width="lg"
          level={2}
        />

        <motion.div
          variants={reduce ? undefined : stagger}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, margin: "-10% 0px" }}
          className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          <motion.div
            variants={reduce ? undefined : item}
            className="lg:col-span-5"
          >
            <PortraitCard />
          </motion.div>

          <motion.div
            variants={reduce ? undefined : item}
            className="lg:col-span-7"
          >
            <MessageCard />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * PortraitCard                                                       *
 *                                                                    *
 * Image-ready: drop principal.jpg into /public/images/principal/     *
 * and replace the inner gradient block with `<Image fill ... />`.    *
 * ------------------------------------------------------------------ */
function PortraitCard() {
  const t = useTranslations("home.principalMessage.principal");

  return (
    <div className="relative">
      {/* Photo placeholder */}
      <div
        className={cn(
          "relative aspect-[4/5] overflow-hidden",
          "rounded-3xl shadow-premium",
          "bg-gradient-to-br from-primary via-primary/85 to-accent"
        )}
      >
        {/* Initials watermark */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 grid place-items-center select-none",
            "text-primary-foreground/15 font-display",
            "text-[10rem] sm:text-[12rem] lg:text-[14rem] leading-none"
          )}
        >
          {t("initials")}
        </div>

        {/* Decorative glows */}
        <span
          aria-hidden
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-secondary/25 blur-3xl"
        />
        <span
          aria-hidden
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary-foreground/10 blur-3xl"
        />

        {/* Name plate — pinned to the bottom of the photo card */}
        <div
          className={cn(
            "absolute inset-x-4 bottom-4 md:inset-x-6 md:bottom-6",
            "rounded-2xl bg-[var(--color-surface)]/95 backdrop-blur-md",
            "border border-border/60 shadow-lg",
            "px-5 py-4"
          )}
        >
          <div className="font-display text-lg md:text-xl text-foreground leading-tight">
            {t("name")}
          </div>
          <div className="text-xs md:text-sm text-[var(--color-muted-foreground)] mt-1">
            {t("title")}
          </div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-primary mt-2 font-semibold">
            {t("experience")}
          </div>
        </div>
      </div>

      {/* Floating "years serving" badge */}
      <div
        className={cn(
          "absolute -top-5 -left-3 md:-left-5 z-10",
          "rounded-2xl bg-secondary text-secondary-foreground",
          "px-4 py-3 shadow-premium border border-secondary/60",
          "flex items-center gap-3"
        )}
      >
        <span
          aria-hidden
          className="grid place-items-center w-10 h-10 rounded-xl bg-secondary-foreground/10"
        >
          <AwardIcon size={20} />
        </span>
        <div className="leading-tight">
          <div className="font-display text-xl">{t("yearsBadgeValue")}</div>
          <div className="text-[10px] uppercase tracking-[0.16em] opacity-80">
            {t("yearsBadgeLabel")}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * MessageCard                                                        *
 * ------------------------------------------------------------------ */
function MessageCard() {
  const t = useTranslations("home.principalMessage");
  const principal = useTranslations("home.principalMessage.principal");

  return (
    <article
      className={cn(
        "relative rounded-3xl border border-border",
        "bg-[var(--color-surface)] shadow-md",
        "p-7 md:p-10 lg:p-12",
        "overflow-hidden"
      )}
    >
      {/* Oversized opening quote mark */}
      <span
        aria-hidden
        className={cn(
          "absolute -top-4 -left-2 md:-top-2 md:-left-2",
          "font-display select-none leading-none",
          "text-[8rem] md:text-[12rem] text-primary/10"
        )}
      >
        “
      </span>

      <div className="relative space-y-5 md:space-y-6 text-base md:text-lg leading-relaxed text-foreground/85">
        <p className="text-pretty">{t("message.paragraph1")}</p>
        <p className="text-pretty">{t("message.paragraph2")}</p>
        <p className="text-pretty">{t("message.paragraph3")}</p>
      </div>

      <div className="relative mt-8 pt-6 border-t border-border flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <div>
          <p className="italic text-sm text-[var(--color-muted-foreground)]">
            {t("message.signoff")}
          </p>
          <p className="font-display text-2xl text-foreground mt-1.5">
            {principal("name")}
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mt-1">
            {principal("title")}
          </p>
        </div>

        <Link
          href={routes.about}
          className={cn(
            "group inline-flex items-center gap-2 self-start md:self-auto",
            "rounded-full px-5 py-2.5 text-sm font-semibold",
            "border border-border bg-[var(--color-surface)] text-foreground",
            "hover:border-primary hover:text-primary transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          <PlayCircleIcon size={16} />
          {t("message.cta")}
          <ArrowRightIcon
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
