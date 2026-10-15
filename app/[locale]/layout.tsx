import { notFound } from "next/navigation";
import { Shell } from "@/components/Shell";
import { StoreProvider } from "@/lib/store";
import { isLocale } from "@/lib/i18n";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <StoreProvider>
      <Shell locale={locale}>{children}</Shell>
    </StoreProvider>
  );
}
