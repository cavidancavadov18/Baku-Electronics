import { notFound } from "next/navigation";
import { NewsList } from "@/components/ContentView";
import { isLocale } from "@/lib/i18n";
import { readSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <NewsList locale={locale} articles={readSiteContent().articles} />;
}
