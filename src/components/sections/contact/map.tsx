"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, SectionTitle } from "@/components/ui";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, MapPinIcon } from "@/components/layout/icons";

export function ContactMap() {
  const t = useTranslations("pages.contact.map");
  const reduce = useReducedMotion();

  const query = encodeURIComponent(siteConfig.address.mapsQuery);
  const embedSrc = `https://maps.google.com/maps?q=${query}&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  return (
    <section
      aria-labelledby="contact-map"
      className="py-16 md:py-24 lg:py-32 bg-[var(--color-surface-muted)]"
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={<span id="contact-map">{t("title")}</span>}
          align="left"
          width="lg"
          level={2}
        />

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "mt-10 md:mt-14 rounded-3xl border border-border overflow-hidden",
            "bg-[var(--color-background)] shadow-md"
          )}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 md:px-8 py-5 border-b border-border">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-primary/10 text-primary">
                <MapPinIcon size={18} />
              </span>
              <div className="leading-tight">
                <div className="font-display text-base md:text-lg text-foreground">
                  {siteConfig.address.street}
                </div>
                <div className="text-sm text-[var(--color-muted-foreground)]">
                  {siteConfig.address.locality}, {siteConfig.address.region}{" "}
                  {siteConfig.address.postalCode}
                </div>
              </div>
            </div>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-5 py-2.5",
                "text-sm font-semibold whitespace-nowrap",
                "bg-primary text-primary-foreground shadow-md",
                "hover:bg-primary/90 hover:shadow-lg transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              {t("directionsCta")}
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
        </motion.div>
      </Container>
    </section>
  );
}
