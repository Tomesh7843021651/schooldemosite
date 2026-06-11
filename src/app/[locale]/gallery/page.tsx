import { setRequestLocale, getTranslations } from "next-intl/server";

import { PageBanner } from "@/components/layout";
import { AdmissionCTA } from "@/components/sections/home";
import { PhotoGallery, VideoGallery } from "@/components/sections/gallery";
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
    namespace: "pages.gallery.banner",
  });
  return buildPageMetadata({
    locale,
    path: routes.gallery,
    title: t("title"),
    description: t("description"),
  });
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tBanner = await getTranslations("pages.gallery.banner");
  const tNav = await getTranslations("navbar");

  const schema = [
    webPageSchema({
      locale,
      path: routes.gallery,
      title: tBanner("title"),
      description: tBanner("description"),
    }),
    breadcrumbSchema(locale, [
      { name: tNav("home"), path: routes.home },
      { name: tNav("gallery"), path: routes.gallery },
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
          { label: tNav("gallery") },
        ]}
      />
      <PhotoGallery />
      <VideoGallery />
      <AdmissionCTA />
      <JsonLd schema={schema} />
    </>
  );
}
