import az from "@/messages/az.json";
import ru from "@/messages/ru.json";

export type Locale = "az" | "ru";
export type Dictionary = typeof az;

const dictionaries: Record<Locale, Dictionary> = {
  az,
  ru: ru as Dictionary,
};

export function isLocale(value: string): value is Locale {
  return value === "az" || value === "ru";
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function withLocale(locale: Locale, path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}
