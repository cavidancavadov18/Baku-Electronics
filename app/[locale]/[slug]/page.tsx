import { notFound } from "next/navigation";
import { ContentView } from "@/components/ContentView";
import { getInfo } from "@/data/info";
import { isLocale } from "@/lib/i18n";
import { readSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

const extra = new Set([
  "kampaniyalar",
  "magazalar",
  "partnyorlar",
  "brend-siyahi",
  "aktiv-muqavileler",
  "muraciet-ve-sikayetler",
  "korporativ-satishlar",
]);

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || (!extra.has(slug) && !getInfo(slug))) notFound();
  return <ContentView locale={locale} slug={slug} site={readSiteContent()} />;
}
