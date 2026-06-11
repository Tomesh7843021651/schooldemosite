"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { routes, primaryNav } from "@/constants/routes";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  SendIcon,
  ArrowRightIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  WhatsAppIcon,
} from "./icons";

/**
 * Premium site footer.
 *
 * Composition (top → bottom):
 *   1. Newsletter band   — gradient panel with email capture
 *   2. Link grid         — School Info / Quick Links / Admissions / Academics / Contact
 *   3. Google Maps card  — embedded location preview with directions CTA
 *   4. Legal bar         — © + privacy / terms / sitemap
 *
 * Renders identically in light + dark modes via the design-token CSS vars.
 */
export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("navbar");
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  const quickLinkKeys = ["home", "about", "gallery", "contact"] as const;
  const quickLinks = primaryNav.filter((n) =>
    quickLinkKeys.includes(n.key as (typeof quickLinkKeys)[number])
  );

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <footer
      role="contentinfo"
      className="relative bg-[var(--color-surface)] text-foreground border-t border-border"
    >
      <NewsletterBand />

      <motion.div
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={reduce ? undefined : fadeUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* ---- School Information ---- */}
          <div className="md:col-span-2 lg:col-span-4 space-y-6">
            <Brand />

            <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)] max-w-md text-pretty">
              {t("mission")}
            </p>

            <div>
              <div className="text-eyebrow mb-3">{t("social")}</div>
              <div className="flex items-center gap-2">
                <SocialLink
                  href={siteConfig.social.facebook}
                  label="Facebook"
                >
                  <FacebookIcon size={16} />
                </SocialLink>
                <SocialLink
                  href={siteConfig.social.instagram}
                  label="Instagram"
                >
                  <InstagramIcon size={16} />
                </SocialLink>
                <SocialLink
                  href={siteConfig.social.youtube}
                  label="YouTube"
                >
                  <YoutubeIcon size={16} />
                </SocialLink>
                <SocialLink
                  href={siteConfig.contact.whatsappHref}
                  label="WhatsApp"
                >
                  <WhatsAppIcon size={16} />
                </SocialLink>
              </div>
            </div>
          </div>

          {/* ---- Quick Links ---- */}
          <FooterColumn
            title={t("quickLinks")}
            className="lg:col-span-2"
          >
            {quickLinks.map((nav) => (
              <FooterLink key={nav.key} href={nav.href}>
                {tNav(nav.key)}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* ---- Admissions ---- */}
          <FooterColumn
            title={t("admissions")}
            className="lg:col-span-2"
          >
            <FooterLink href={routes.admissions}>
              {t("admissionsLinks.apply")}
            </FooterLink>
            <FooterLink href={`${routes.admissions}#process`}>
              {t("admissionsLinks.process")}
            </FooterLink>
            <FooterLink href={`${routes.admissions}#fees`}>
              {t("admissionsLinks.fees")}
            </FooterLink>
            <FooterLink href={`${routes.admissions}#faq`}>
              {t("admissionsLinks.faq")}
            </FooterLink>
          </FooterColumn>

          {/* ---- Academics ---- */}
          <FooterColumn
            title={t("academics")}
            className="lg:col-span-2"
          >
            <FooterLink href={`${routes.academics}#pre-primary`}>
              {t("academicsLinks.prePrimary")}
            </FooterLink>
            <FooterLink href={`${routes.academics}#primary`}>
              {t("academicsLinks.primary")}
            </FooterLink>
            <FooterLink href={`${routes.academics}#secondary`}>
              {t("academicsLinks.secondary")}
            </FooterLink>
            <FooterLink href={`${routes.academics}#activities`}>
              {t("academicsLinks.activities")}
            </FooterLink>
          </FooterColumn>

          {/* ---- Contact Details ---- */}
          <div className="md:col-span-2 lg:col-span-2 space-y-4">
            <h3 className="font-display text-lg text-foreground">
              {t("contact")}
            </h3>

            <ul className="space-y-3 text-sm">
              <ContactRow icon={<MapPinIcon size={16} />}>
                <span className="text-[var(--color-muted-foreground)]">
                  {siteConfig.address.street},<br />
                  {siteConfig.address.locality},{" "}
                  {siteConfig.address.region}{" "}
                  {siteConfig.address.postalCode}
                </span>
              </ContactRow>

              <ContactRow icon={<PhoneIcon size={16} />}>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="hover:text-primary transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </ContactRow>

              <ContactRow icon={<MailIcon size={16} />}>
                <a
                  href={siteConfig.contact.emailHref}
                  className="hover:text-primary transition-colors break-all"
                >
                  {siteConfig.contact.email}
                </a>
              </ContactRow>

              <ContactRow icon={<ClockIcon size={16} />}>
                <span className="text-[var(--color-muted-foreground)]">
                  {siteConfig.hours.schoolDays}
                  <br />
                  {siteConfig.hours.schoolTime}
                </span>
              </ContactRow>
            </ul>
          </div>
        </div>

        <MapCard />
      </motion.div>

      <LegalBar
        copyright={t("copyright", { year, name: siteConfig.name })}
        privacy={t("legal.privacy")}
        terms={t("legal.terms")}
        sitemap={t("legal.sitemap")}
        credit={t("credit")}
      />
    </footer>
  );
}

/* ------------------------------------------------------------------ *
 * Brand                                                              *
 * ------------------------------------------------------------------ */
function Brand() {
  const t = useTranslations("navbar");
  return (
    <Link
      href={routes.home}
      aria-label={siteConfig.short}
      className="inline-flex items-center gap-3 group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div
        className={cn(
          "relative w-12 h-12 rounded-xl grid place-items-center",
          "bg-primary text-primary-foreground font-display text-xl",
          "shadow-md group-hover:shadow-lg transition-shadow duration-300"
        )}
        aria-hidden
      >
        N
        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-secondary ring-2 ring-[var(--color-surface)]" />
      </div>
      <div className="leading-tight">
        <div className="font-display text-xl text-foreground">
          {siteConfig.short}
        </div>
        <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
          {t("tagline")}
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ *
 * Newsletter band                                                    *
 * ------------------------------------------------------------------ */
function NewsletterBand() {
  const t = useTranslations("footer");
  const reduce = useReducedMotion();

  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "submitted">("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    // Placeholder: wired up in Phase 5 to /api/newsletter or a 3rd-party ESP.
    setState("submitted");
  }

  return (
    <section
      aria-labelledby="nl-newsletter-title"
      className={cn(
        "relative overflow-hidden border-b border-border",
        "bg-gradient-to-br from-primary/10 via-[var(--color-surface)] to-accent/10"
      )}
    >
      <span
        aria-hidden
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary/15 blur-3xl pointer-events-none"
      />
      <span
        aria-hidden
        className="absolute -bottom-40 -left-32 w-[28rem] h-[28rem] rounded-full bg-primary/10 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          <div className="lg:col-span-6">
            <span className="text-eyebrow inline-flex items-center gap-2">
              <span className="inline-block h-px w-6 bg-current opacity-60" />
              {t("newsletter.eyebrow")}
            </span>
            <h2
              id="nl-newsletter-title"
              className="text-h2 font-display mt-3 text-balance text-foreground"
            >
              {t("newsletter.title")}
            </h2>
            <p className="text-lead mt-4 max-w-xl text-pretty">
              {t("newsletter.description")}
            </p>
          </div>

          <div className="lg:col-span-6">
            <form
              onSubmit={onSubmit}
              aria-describedby="nl-newsletter-note"
              className={cn(
                "flex flex-col sm:flex-row gap-3 p-2 rounded-2xl",
                "bg-[var(--color-surface)] border border-border shadow-md",
                "focus-within:shadow-lg transition-shadow duration-300"
              )}
            >
              <label htmlFor="nl-email" className="sr-only">
                {t("newsletter.placeholder")}
              </label>
              <input
                id="nl-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={state === "submitted"}
                placeholder={t("newsletter.placeholder")}
                className={cn(
                  "flex-1 bg-transparent px-4 py-3 text-base text-foreground",
                  "placeholder:text-[var(--color-muted-foreground)]",
                  "rounded-xl outline-none disabled:opacity-60"
                )}
              />
              <button
                type="submit"
                disabled={state === "submitted"}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-xl",
                  "px-6 py-3 text-sm font-semibold whitespace-nowrap",
                  "bg-primary text-primary-foreground shadow-md",
                  "hover:bg-primary/90 hover:shadow-lg transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]",
                  "disabled:opacity-70 disabled:cursor-not-allowed"
                )}
              >
                {state === "submitted" ? "✓" : t("newsletter.submit")}
                {state !== "submitted" && <SendIcon size={14} />}
              </button>
            </form>

            <p
              id="nl-newsletter-note"
              className="mt-3 text-xs text-[var(--color-muted-foreground)]"
            >
              {state === "submitted"
                ? t("newsletter.note")
                : t("newsletter.note")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Map card                                                           *
 * ------------------------------------------------------------------ */
function MapCard() {
  const t = useTranslations("footer");
  const query = encodeURIComponent(siteConfig.address.mapsQuery);
  const embedSrc = `https://maps.google.com/maps?q=${query}&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  return (
    <div
      className={cn(
        "mt-14 md:mt-20 rounded-3xl border border-border bg-[var(--color-background)]",
        "overflow-hidden shadow-md"
      )}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 md:px-8 py-5 border-b border-border">
        <div>
          <span className="text-eyebrow">{t("map.eyebrow")}</span>
          <h3 className="font-display text-xl text-foreground mt-1">
            {t("map.title")}
          </h3>
        </div>
        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2 self-start md:self-auto",
            "rounded-full px-5 py-2.5 text-sm font-semibold",
            "bg-primary text-primary-foreground shadow-md",
            "hover:bg-primary/90 hover:shadow-lg transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          {t("map.directions")}
          <ArrowRightIcon size={14} />
        </a>
      </div>

      <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[var(--color-surface-muted)]">
        <iframe
          title={`${siteConfig.short} location map`}
          src={embedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Legal bar                                                          *
 * ------------------------------------------------------------------ */
function LegalBar({
  copyright,
  privacy,
  terms,
  sitemap,
  credit,
}: {
  copyright: string;
  privacy: string;
  terms: string;
  sitemap: string;
  credit: string;
}) {
  return (
    <div className="border-t border-border bg-[var(--color-surface-muted)]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-[var(--color-muted-foreground)]">
          <p>{copyright}</p>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#" className="hover:text-primary transition-colors">
              {privacy}
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              {terms}
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              {sitemap}
            </a>
          </div>
        </div>
        <p className="mt-3 text-[11px] text-[var(--color-muted-foreground)]/80">
          {credit}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Building blocks                                                    *
 * ------------------------------------------------------------------ */
function FooterColumn({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="font-display text-lg text-foreground">{title}</h3>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "group inline-flex items-center gap-1.5",
          "text-[var(--color-muted-foreground)] hover:text-primary transition-colors",
          "focus-visible:outline-none focus-visible:text-primary"
        )}
      >
        {children}
        <span
          aria-hidden
          className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
        >
          <ArrowRightIcon size={12} />
        </span>
      </Link>
    </li>
  );
}

function ContactRow({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 text-primary shrink-0">{icon}</span>
      <div className="flex-1 leading-relaxed">{children}</div>
    </li>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const safe = href || "#";
  const isExternal = safe.startsWith("http");
  return (
    <a
      href={safe}
      aria-label={label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center justify-center w-10 h-10 rounded-full",
        "border border-border bg-[var(--color-background)]",
        "text-[var(--color-muted-foreground)] hover:text-primary-foreground",
        "hover:bg-primary hover:border-primary transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      {children}
    </a>
  );
}
