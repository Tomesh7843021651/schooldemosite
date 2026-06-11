import { setRequestLocale, getTranslations } from "next-intl/server";

import { PageBanner } from "@/components/layout";
import { AdmissionCTA } from "@/components/sections/home";
import {
  FacilitiesGrid,
  SafetyHighlights,
} from "@/components/sections/facilities";
import { JsonLd } from "@/components/ui";
import { routes } from "@/constants/routes";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "pages.facilities.banner",
  });
  return buildPageMetadata({
    locale,
    path: routes.facilities,
    title: t("title"),
    description: t("description"),
  });
}

export default async function FacilitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tBanner = await getTranslations("pages.facilities.banner");
  const tNav = await getTranslations("navbar");

  const schema = [
    webPageSchema({
      locale,
      path: routes.facilities,
      title: tBanner("title"),
      description: tBanner("description"),
    }),
    breadcrumbSchema(locale, [
      { name: tNav("home"), path: routes.home },
      { name: tNav("facilities"), path: routes.facilities },
    ]),
  ];

  return (
    <>
      <PageBanner
        eyebrow={tBanner("eyebrow")}
        title={tBanner("title")}
        description={tBanner("description")}
        breadcrumbs={[
          { label: tNav("home"), href: routes.home },
          { label: tNav("facilities") },
        ]}
      />
      <FacilitiesGrid />
      <SafetyHighlights />
      <AdmissionCTA />
      <JsonLd schema={schema} />
    </>
  );
}
