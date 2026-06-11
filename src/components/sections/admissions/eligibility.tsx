"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, SectionTitle } from "@/components/ui";
import { cn } from "@/lib/utils";

const KEYS = ["nursery", "lkg", "ukg", "g1", "g5", "g10"] as const;

export function Eligibility() {
  const t = useTranslations("pages.admissions.eligibility");
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="admissions-eligibility"
      className="py-16 md:py-24 lg:py-32 bg-[var(--color-background)]"
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={<span id="admissions-eligibility">{t("title")}</span>}
          description={t("description")}
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
            "bg-[var(--color-surface)] shadow-sm"
          )}
        >
          <table className="w-full text-left">
            <thead className="bg-[var(--color-surface-muted)]/60">
              <tr>
                <th
                  scope="col"
                  className="px-5 md:px-7 py-4 text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--color-muted-foreground)]"
                >
                  {t("columns.grade")}
                </th>
                <th
                  scope="col"
                  className="px-5 md:px-7 py-4 text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--color-muted-foreground)] text-right"
                >
                  {t("columns.age")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {KEYS.map((key) => (
                <Row key={key} itemKey={key} />
              ))}
            </tbody>
          </table>
        </motion.div>
      </Container>
    </section>
  );
}

function Row({ itemKey }: { itemKey: (typeof KEYS)[number] }) {
  const t = useTranslations(`pages.admissions.eligibility.items.${itemKey}`);
  return (
    <tr className="hover:bg-[var(--color-surface-muted)]/30 transition-colors">
      <td className="px-5 md:px-7 py-4 font-display text-base md:text-lg text-foreground">
        {t("grade")}
      </td>
      <td className="px-5 md:px-7 py-4 text-base text-primary font-semibold text-right">
        {t("age")}
      </td>
    </tr>
  );
}
