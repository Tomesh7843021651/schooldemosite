import { getTranslations } from "next-intl/server";
import { PageBanner } from "@/components/layout";
import { Container } from "@/components/ui";
import { routes } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/constants/site";

/**
 * Locale-aware 404. Lives at `src/app/[locale]/not-found.tsx` so any
 * unknown route under `/{locale}/…` renders a localized page instead of
 * the framework default.
 */
export default async function NotFound() {
  const t = await getTranslations("common.notFound");
  const tNav = await getTranslations("navbar");

  return (
    <>
      <PageBanner
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        breadcrumbs={[
          { label: tNav("home"), href: routes.home },
          { label: "404" },
        ]}
        watermark="404"
      />

      <section className="py-12 md:py-20 bg-[var(--color-background)]">
        <Container width="narrow">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={routes.home}
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("primaryCta")}
            </Link>
            <a
              href={siteConfig.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-border bg-[var(--color-surface)] text-foreground hover:border-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t("secondaryCta")}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
