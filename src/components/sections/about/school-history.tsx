"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, SectionTitle } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * Long-form story of the school. Three paragraph blocks with a side-by-side
 * editorial layout on desktop (sticky eyebrow + heading on the left, body
 * paragraphs on the right).
 */
export function SchoolHistory() {
  const t = useTranslations("pages.about.story");
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="about-history"
      className="py-16 md:py-24 lg:py-32 bg-[var(--color-background)]"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionTitle
                eyebrow={t("eyebrow")}
                title={<span id="about-history">{t("title")}</span>}
                align="left"
                width="md"
                level={2}
              />
            </div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "lg:col-span-7 space-y-6 text-base md:text-lg leading-relaxed",
              "text-foreground/85"
            )}
          >
            <p className="text-pretty">{t("paragraph1")}</p>
            <p className="text-pretty">{t("paragraph2")}</p>
            <p className="text-pretty">{t("paragraph3")}</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
