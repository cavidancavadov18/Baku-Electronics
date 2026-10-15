import { notFound } from "next/navigation";
import { HomeView } from "@/components/HomeView";
import { isLocale } from "@/lib/i18n";
import { readSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = readSiteContent();
  return <HomeView locale={locale} articles={site.articles} banners={site.banners} videos={site.videos} campaigns={site.campaigns} />;
}
