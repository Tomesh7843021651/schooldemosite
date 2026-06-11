import { setRequestLocale, getTranslations, getMessages } from "next-intl/server";

import { PageBanner } from "@/components/layout";
import { AdmissionCTA } from "@/components/sections/home";
import {
  WhyJoin,
  AdmissionProcess,
  Eligibility,
  RequiredDocuments,
  FAQ,
} from "@/components/sections/admissions";
import { JsonLd } from "@/components/ui";
import { routes } from "@/constants/routes";
import { buildPageMetadata } from "@/lib/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  webPageSchema,
  type FaqInput,
} from "@/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "pages.admissions.banner",
  });
  return buildPageMetadata({
    locale,
    path: routes.admissions,
    title: t("title"),
    description: t("description"),
  });
}

export default async function AdmissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tBanner = await getTranslations("pages.admissions.banner");
  const tNav = await getTranslations("navbar");

  // Build FAQPage schema from the same translations the FAQ section renders,
  // so the structured data is always in sync with the visible content.
  const messages = (await getMessages()) as unknown as IntlMessages;
  const faqItems = messages.pages.admissions.faq.items;
  const faqInputs: FaqInput[] = Object.values(faqItems).map((it) => ({
    question: it.question,
    answer: it.answer,
  }));

  const schema = [
    webPageSchema({
      locale,
      path: routes.admissions,
      title: tBanner("title"),
      description: tBanner("description"),
    }),
    breadcrumbSchema(locale, [
      { name: tNav("home"), path: routes.home },
      { name: tNav("admissions"), path: routes.admissions },
    ]),
    faqSchema(faqInputs),
  ];

  return (
    <>
      <PageBanner
        eyebrow={tBanner("eyebrow")}
        title={tBanner("title")}
        description={tBanner("description")}
        breadcrumbs={[
          { label: tNav("home"), href: routes.home },
          { label: tNav("admissions") },
        ]}
      />
      <WhyJoin />
      <AdmissionProcess />
      <Eligibility />
      <RequiredDocuments />
      <FAQ />
      <AdmissionCTA />
      <JsonLd schema={schema} />
    </>
  );
}
