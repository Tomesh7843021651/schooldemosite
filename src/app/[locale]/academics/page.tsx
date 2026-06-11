import { setRequestLocale, getTranslations } from "next-intl/server";

import { PageBanner } from "@/components/layout";
import { AcademicPreview, AdmissionCTA } from "@/components/sections/home";
import {
  Curriculum,
  Methodology,
  Assessment,
} from "@/components/sections/academics";
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
    namespace: "pages.academics.banner",
  });
  return buildPageMetadata({
    locale,
    path: routes.academics,
    title: t("title"),
    description: t("description"),
  });
}

export default async function AcademicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tBanner = await getTranslations("pages.academics.banner");
  const tNav = await getTranslations("navbar");

  const schema = [
    webPageSchema({
      locale,
      path: routes.academics,
      title: tBanner("title"),
      description: tBanner("description"),
    }),
    breadcrumbSchema(locale, [
      { name: tNav("home"), path: routes.home },
      { name: tNav("academics"), path: routes.academics },
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
          { label: tNav("academics") },
        ]}
      />
      <AcademicPreview />
      <Curriculum />
      <Methodology />
      <Assessment />
      <AdmissionCTA />
      <JsonLd schema={schema} />
    </>
  );
}
