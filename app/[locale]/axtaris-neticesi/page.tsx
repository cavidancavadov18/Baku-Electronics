import { notFound } from "next/navigation";
import { SearchView } from "@/components/ShopViews";
import { isLocale } from "@/lib/i18n";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  if (!isLocale(locale)) notFound();
  return <SearchView locale={locale} query={query.q ?? ""} />;
}
