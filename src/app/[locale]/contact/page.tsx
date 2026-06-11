import { setRequestLocale, getTranslations } from "next-intl/server";

import { PageBanner } from "@/components/layout";
import { ContactDetailsForm, ContactMap } from "@/components/sections/contact";
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
    namespace: "pages.contact.banner",
  });
  return buildPageMetadata({
    locale,
    path: routes.contact,
    title: t("title"),
    description: t("description"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tBanner = await getTranslations("pages.contact.banner");
  const tNav = await getTranslations("navbar");

  const schema = [
    webPageSchema({
      locale,
      path: routes.contact,
      title: tBanner("title"),
      description: tBanner("description"),
    }),
    breadcrumbSchema(locale, [
      { name: tNav("home"), path: routes.home },
      { name: tNav("contact"), path: routes.contact },
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
          { label: tNav("contact") },
        ]}
      />
      <ContactDetailsForm />
      <ContactMap />
      <JsonLd schema={schema} />
    </>
  );
}
