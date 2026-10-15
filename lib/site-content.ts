import fs from "fs";
import path from "path";
import { articles, campaigns, stores, type Article, type Campaign, type Store } from "@/data/content";
import type { Localized } from "@/data/products";

export type VideoItem = { id: string; title: string; href: string };

export type SiteContent = {
  articles: Article[];
  stores: Store[];
  campaigns: Campaign[];
  banners: string[];
  videos: VideoItem[];
};

const file = path.join(process.cwd(), "data", "site-content.json");

const defaultBanners = [
  "https://media.bakuelectronics.az/media/page/slider/dəli_dolu923x520_copy.webp",
  "https://media.bakuelectronics.az/media/page/slider/923x520-dreame_22.webp",
  "https://media.bakuelectronics.az/media/page/slider/923x520_payız.webp",
  "https://media.bakuelectronics.az/media/page/slider/923x520_20.webp",
  "https://media.bakuelectronics.az/media/page/slider/923x520-huawei_fit_5_pro.webp",
  "https://media.bakuelectronics.az/media/page/slider/923x520-huawei_fit_5.webp",
  "https://media.bakuelectronics.az/media/page/slider/SSM7_923x520.webp",
  "https://media.bakuelectronics.az/media/page/slider/Midea_923x520.webp",
  "https://media.bakuelectronics.az/media/page/slider/veb_sayt_923_x_520_hp_temp_update.webp",
  "https://media.bakuelectronics.az/media/page/slider/IMG_3129.webp",
  "https://media.bakuelectronics.az/media/page/slider/WEB_banners-yeni_məhsul-923X520_copy.webp",
  "https://media.bakuelectronics.az/media/page/slider/923x520samsung_tv.jpg",
  "https://media.bakuelectronics.az/media/page/slider/logitec923x520_18.webp",
  "https://media.bakuelectronics.az/media/page/slider/Acer_alana_hədiyyəli_təklif923x520.png",
  "https://media.bakuelectronics.az/media/page/slider/923x520-Tineco_payiz_copy_2.webp",
  "https://media.bakuelectronics.az/media/page/slider/Samsung-modellərinin-endirilmiş-qiymıtini-12-aya-böl-923-x-520.png",
  "https://media.bakuelectronics.az/media/page/slider/honor923x520_12.webp",
  "https://media.bakuelectronics.az/media/page/slider/BE_Çatdırılma__MainBanner_923x520.webp",
  "https://media.bakuelectronics.az/media/page/slider/923x520-motoverse.webp",
  "https://media.bakuelectronics.az/media/page/slider/923_x_520-kohneni-deyish_1.jpg",
];

const defaultVideos: VideoItem[] = [
  { id: "n0ZrEaZeGoE", title: "Planşet Lenovo Yoga Tab 11 TB710", href: "https://www.youtube.com/watch?v=n0ZrEaZeGoE" },
  { id: "Wio_FJmRZZg", title: "Notbuk ASUS TUF Gaming F16 FX608JHR-RV035", href: "https://www.youtube.com/watch?v=Wio_FJmRZZg" },
  { id: "gLEru7CsOnQ", title: "Endirim mövsümü gəldi!", href: "https://www.youtube.com/watch?v=gLEru7CsOnQ" },
  { id: "nBT82DM4E_w", title: "Dəli-Dolu Təkliflər", href: "https://www.youtube.com/watch?v=nBT82DM4E_w" },
  { id: "A_jZs4R5Cd0", title: "Payız təklifləri", href: "https://www.youtube.com/shorts/A_jZs4R5Cd0" },
  { id: "mFNLq9S3SK4", title: "Dəli-Dolu Təkliflər", href: "https://www.youtube.com/shorts/mFNLq9S3SK4" },
];

export function defaultSiteContent(): SiteContent {
  return {
    articles: articles.map((item) => structuredClone(item)),
    stores: stores.map((item) => structuredClone(item)),
    campaigns: campaigns.map((item) => structuredClone(item)),
    banners: [...defaultBanners],
    videos: defaultVideos.map((item) => ({ ...item })),
  };
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function localized(value: unknown): Localized | null {
  if (!value || typeof value !== "object") return null;
  const item = value as { az?: unknown; ru?: unknown };
  const az = text(item.az);
  if (!az) return null;
  const ru = text(item.ru) || az;
  return { az, ru };
}

function articleOf(value: unknown): Article | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Partial<Article>;
  const title = localized(item.title);
  const lead = localized(item.lead);
  const slug = text(item.slug);
  const image = text(item.image);
  const date = text(item.date);
  if (!slug || !image || !date || !title || !lead || !Array.isArray(item.body)) return null;
  const body = item.body.map(localized).filter((part): part is Localized => Boolean(part));
  if (!body.length) return null;
  return { slug, date, image, title, lead, body };
}

function storeOf(value: unknown): Store | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Partial<Store>;
  const city = localized(item.city);
  const name = localized(item.name);
  const address = localized(item.address);
  const id = text(item.id);
  const hours = text(item.hours);
  const phone = text(item.phone);
  if (!id || !hours || !phone || !city || !name || !address) return null;
  return { id, city, name, address, hours, phone };
}

function campaignOf(value: unknown): Campaign | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Partial<Campaign>;
  const title = localized(item.title);
  const copy = localized(item.text);
  const slug = text(item.slug);
  const image = text(item.image);
  const until = text(item.until);
  const tone = item.tone === "navy" || item.tone === "gold" || item.tone === "red" ? item.tone : "red";
  if (!slug || !image || !until || !title || !copy) return null;
  return { slug, tone, title, text: copy, until, image };
}

function videoOf(value: unknown): VideoItem | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Partial<VideoItem>;
  const id = text(item.id);
  const title = text(item.title);
  const href = text(item.href);
  if (!id || !title || !href.startsWith("http")) return null;
  return { id, title, href };
}

export function normalizeSiteContent(value: unknown): SiteContent | null {
  if (!value || typeof value !== "object") return null;
  const data = value as Partial<SiteContent>;
  if (!Array.isArray(data.articles) || !Array.isArray(data.stores) || !Array.isArray(data.campaigns) || !Array.isArray(data.banners) || !Array.isArray(data.videos)) return null;
  return {
    articles: data.articles.map(articleOf).filter((item): item is Article => Boolean(item)),
    stores: data.stores.map(storeOf).filter((item): item is Store => Boolean(item)),
    campaigns: data.campaigns.map(campaignOf).filter((item): item is Campaign => Boolean(item)),
    banners: data.banners.map(text).filter((item) => item.startsWith("http")),
    videos: data.videos.map(videoOf).filter((item): item is VideoItem => Boolean(item)),
  };
}

export function readSiteContent(): SiteContent {
  if (!fs.existsSync(file)) return defaultSiteContent();
  try {
    return normalizeSiteContent(JSON.parse(fs.readFileSync(file, "utf8"))) ?? defaultSiteContent();
  } catch {
    return defaultSiteContent();
  }
}

export function writeSiteContent(value: unknown) {
  const next = normalizeSiteContent(value);
  if (!next) return null;
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(next, null, 2));
  fs.renameSync(tmp, file);
  return next;
}
