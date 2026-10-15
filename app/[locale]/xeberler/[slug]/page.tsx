import { notFound } from "next/navigation";
import { NewsArticle } from "@/components/ContentView";
import { isLocale } from "@/lib/i18n";
import { readSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const article = readSiteContent().articles.find((item) => item.slug === slug);
  const title = article && isLocale(locale) ? article.title[locale] : "Baku Electronics";
  return { title: `${title} | Baku Electronics` };
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const article = readSiteContent().articles.find((item) => item.slug === slug);
  if (!isLocale(locale) || !article) notFound();
  return <NewsArticle locale={locale} article={article} />;
}
