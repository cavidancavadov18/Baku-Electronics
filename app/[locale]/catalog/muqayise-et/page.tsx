import { CompareView } from "@/components/ShopViews";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <CompareView locale={locale} />;
}
