"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/constants/site";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  WhatsAppIcon,
} from "@/components/layout/icons";

export function ContactDetails() {
  const t = useTranslations("pages.contact.details");
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "rounded-3xl border border-border bg-[var(--color-surface)]",
        "p-7 md:p-8 lg:p-10 shadow-md"
      )}
    >
      <span className="text-eyebrow">{t("eyebrow")}</span>
      <h2 className="font-display text-2xl md:text-3xl text-foreground mt-2">
        {t("title")}
      </h2>

      <ul className="mt-8 space-y-5">
        <Row
          icon={<PhoneIcon size={18} />}
          label={t("phoneLabel")}
          value={siteConfig.contact.phone}
          href={siteConfig.contact.phoneHref}
        />
        <Row
          icon={<MailIcon size={18} />}
          label={t("emailLabel")}
          value={siteConfig.contact.email}
          href={siteConfig.contact.emailHref}
        />
        <Row
          icon={<MapPinIcon size={18} />}
          label={t("addressLabel")}
          value={
            <>
              {siteConfig.address.street},
              <br />
              {siteConfig.address.locality}, {siteConfig.address.region}{" "}
              {siteConfig.address.postalCode}
            </>
          }
        />
        <Row
          icon={<ClockIcon size={18} />}
          label={t("hoursLabel")}
          value={
            <>
              {siteConfig.hours.schoolDays}
              <br />
              {siteConfig.hours.officeTime}
            </>
          }
        />
      </ul>

      <div className="mt-8 pt-6 border-t border-border">
        <div className="text-eyebrow mb-3">{t("socialLabel")}</div>
        <div className="flex flex-wrap gap-2">
          <Social href={siteConfig.social.facebook} label="Facebook">
            <FacebookIcon size={16} />
          </Social>
          <Social href={siteConfig.social.instagram} label="Instagram">
            <InstagramIcon size={16} />
          </Social>
          <Social href={siteConfig.social.youtube} label="YouTube">
            <YoutubeIcon size={16} />
          </Social>
          <Social href={siteConfig.contact.whatsappHref} label="WhatsApp">
            <WhatsAppIcon size={16} />
          </Social>
        </div>
      </div>
    </motion.div>
  );
}

function Row({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  href?: string;
}) {
  const body = (
    <>
      <span className="mt-0.5 inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-primary/10 text-primary shrink-0">
        {icon}
      </span>
      <div className="leading-tight min-w-0">
        <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted-foreground)] font-semibold">
          {label}
        </div>
        <div className="text-base md:text-lg text-foreground mt-1.5 leading-relaxed break-words">
          {value}
        </div>
      </div>
    </>
  );

  return (
    <li>
      {href ? (
        <a
          href={href}
          className="flex items-start gap-4 hover:text-primary transition-colors"
        >
          {body}
        </a>
      ) : (
        <div className="flex items-start gap-4">{body}</div>
      )}
    </li>
  );
}

function Social({
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
