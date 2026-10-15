import { notFound } from "next/navigation";
import { HomeView } from "@/components/HomeView";
import { toProduct, readHome } from "@/lib/home";
import { isLocale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const home = await readHome();
  return <HomeView locale={locale} home={{ ...home, products: home.products.map(toProduct) }} />;
}
