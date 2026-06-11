import { setRequestLocale, getTranslations } from "next-intl/server";

import {
  Hero,
  Stats,
  WhyChooseUs,
  PrincipalMessage,
  AcademicPreview,
  FacilitiesPreview,
  StudentLife,
  Achievements,
  Events,
  GalleryPreview,
  Testimonials,
  AdmissionCTA,
} from "@/components/sections/home";
import { JsonLd } from "@/components/ui";
import { buildPageMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { routes } from "@/constants/routes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.hero" });

  return buildPageMetadata({
    locale,
    path: routes.home,
    title: `${t("headline")} ${t("headlineHighlight")}`,
    description: t("description"),
    asFullTitle: true,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home.hero");
  const schema = webPageSchema({
    locale,
    path: routes.home,
    title: `${t("headline")} ${t("headlineHighlight")}`,
    description: t("description"),
  });

  return (
    <>
      <Hero />
      <Stats />
      <WhyChooseUs />
      <PrincipalMessage />
      <AcademicPreview />
      <FacilitiesPreview />
      <StudentLife />
      <Achievements />
      <Events />
      <GalleryPreview />
      <Testimonials />
      <AdmissionCTA />
      <JsonLd schema={schema} />
    </>
  );
}
