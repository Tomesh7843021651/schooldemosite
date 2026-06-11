import { setRequestLocale, getTranslations } from "next-intl/server";

import { PageBanner } from "@/components/layout";
import { Stats, PrincipalMessage, AdmissionCTA } from "@/components/sections/home";
import {
  SchoolHistory,
  VisionMission,
  CoreValues,
  Timeline,
  Leadership,
} from "@/components/sections/about";
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
  const t = await getTranslations({ locale, namespace: "pages.about.banner" });
  return buildPageMetadata({
    locale,
    path: routes.about,
    title: t("title"),
    description: t("description"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tBanner = await getTranslations("pages.about.banner");
  const tNav = await getTranslations("navbar");

  const schema = [
    webPageSchema({
      locale,
      path: routes.about,
      title: tBanner("title"),
      description: tBanner("description"),
    }),
    breadcrumbSchema(locale, [
      { name: tNav("home"), path: routes.home },
      { name: tNav("about"), path: routes.about },
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
          { label: tNav("about") },
        ]}
      />
      <SchoolHistory />
      <VisionMission />
      <CoreValues />
      <Timeline />
      <Stats />
      <Leadership />
      <PrincipalMessage />
      <AdmissionCTA />
      <JsonLd schema={schema} />
    </>
  );
}
