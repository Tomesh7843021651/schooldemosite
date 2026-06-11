"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Container, SectionTitle } from "@/components/ui";

/**
 * Leadership intro on the About page. The full PrincipalMessage component
 * from the home sections is rendered immediately after this title block
 * by `about/page.tsx`, so this section is intentionally minimal — just an
 * editorial heading that introduces the principal letter below.
 */
export function Leadership() {
  const t = useTranslations("pages.about.leadership");

  return (
    <section
      aria-labelledby="about-leadership"
      className="pt-16 md:pt-24 lg:pt-32 bg-[var(--color-background)]"
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={<span id="about-leadership">{t("title")}</span>}
          description={t("description")}
          align="center"
          width="lg"
          level={2}
        />
      </Container>
    </section>
  );
}
