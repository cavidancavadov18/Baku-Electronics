import { notFound } from "next/navigation";
import { CatalogView } from "@/components/CatalogView";
import type { SortKey } from "@/data/products";
import { isLocale } from "@/lib/i18n";

const sorts: SortKey[] = ["popular", "price-asc", "price-desc", "discount"];

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
  searchParams: Promise<{ brand?: string; sort?: string }>;
}) {
  const { locale, slug } = await params;
  const query = await searchParams;
  if (!isLocale(locale)) notFound();
  const sort = sorts.includes(query.sort as SortKey) ? (query.sort as SortKey) : "popular";
  return <CatalogView locale={locale} category={slug?.[0]} brand={query.brand || undefined} sort={sort} />;
}
