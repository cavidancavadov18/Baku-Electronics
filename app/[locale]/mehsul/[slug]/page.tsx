import { notFound } from "next/navigation";
import { ProductView } from "@/components/ProductView";
import { getProduct } from "@/data/products";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  const title = product && isLocale(locale) ? product.name[locale] : "Baku Electronics";
  return { title: `${title} | Baku Electronics` };
}

export default async function ProductPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductView locale={locale} product={product} />;
}
