import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { products, publicProduct, productImage } from "../data/products.ts";

const root = dirname(fileURLToPath(import.meta.url));
const project = dirname(root);
const site = JSON.parse(readFileSync(join(project, "data", "site-content.json"), "utf8"));
const az = JSON.parse(readFileSync(join(project, "messages", "az.json"), "utf8"));
const ru = JSON.parse(readFileSync(join(project, "messages", "ru.json"), "utf8"));

const icons = [
  "https://media.bakuelectronics.az/media/feature_icons/arxayin-al.svg",
  "https://media.bakuelectronics.az/media/feature_icons/endirimli-qiymeti-6ay.svg",
  "https://media.bakuelectronics.az/media/feature_icons/suretli-catdirilma.svg",
  "https://media.bakuelectronics.az/media/feature_icons/odenis-rahatligi.svg",
];

const homeBrands = ["Apple", "Samsung", "Xiaomi", "Honor", "LG", "Bosch", "Sony", "Lenovo", "ASUS", "Philips", "TCL", "HP"];
const tabs = ["smartfonlar", "notbuklar", "plansetler", "robot-tozsoran", "tv-audio", "soyuducular"];

const visible = products.flatMap((item) => {
  const next = publicProduct(item);
  return next ? [next] : [];
});

const chosen = new Map();
for (const item of visible) {
  if (item.bestseller) chosen.set(item.id, item);
}
for (const category of tabs) {
  const ranked = visible
    .filter((item) => item.category === category)
    .sort((a, b) => b.oldPrice - b.price - (a.oldPrice - a.price));
  for (const item of ranked.slice(0, 24)) chosen.set(item.id, item);
}

const payload = {
  banners: site.banners.map((image, sort) => ({ image, sort })),
  benefits: az.benefits.map((item, sort) => ({
    icon: icons[sort],
    title_az: item.title,
    title_ru: ru.benefits[sort].title,
    text_az: item.text,
    text_ru: ru.benefits[sort].text,
    href: item.href,
    sort,
  })),
  brands: homeBrands.map((name, sort) => ({ name, sort })),
  campaigns: site.campaigns.map((item, sort) => ({
    slug: item.slug,
    tone: item.tone,
    title_az: item.title.az,
    title_ru: item.title.ru,
    text_az: item.text.az,
    text_ru: item.text.ru,
    until: item.until,
    image: item.image,
    sort,
  })),
  videos: site.videos.map((item, sort) => ({
    youtube_id: item.id,
    title: item.title,
    href: item.href,
    sort,
  })),
  articles: site.articles.slice(0, 6).map((item, sort) => ({
    slug: item.slug,
    date: item.date,
    image: item.image,
    title_az: item.title.az,
    title_ru: item.title.ru,
    lead_az: item.lead.az,
    lead_ru: item.lead.ru,
    sort,
  })),
  promos: [
    {
      key: "phones",
      kicker_az: az.promoPhonesKicker,
      kicker_ru: ru.promoPhonesKicker,
      title_az: az.promoPhonesTitle,
      title_ru: ru.promoPhonesTitle,
      href: "/catalog/smartfonlar",
      sort: 0,
    },
    {
      key: "audio",
      kicker_az: az.promoAudioKicker,
      kicker_ru: ru.promoAudioKicker,
      title_az: az.promoAudioTitle,
      title_ru: ru.promoAudioTitle,
      href: "/catalog/qulaqliqlar",
      sort: 1,
    },
  ],
  products: [...chosen.values()].map((item) => ({
    external_id: item.id,
    slug: item.slug.slice(0, 180),
    category: item.category,
    brand: item.brand,
    price: item.price,
    old_price: item.oldPrice,
    months: item.months,
    rating: item.rating,
    reviews: item.reviews,
    code: item.code,
    image: productImage(item),
    name_az: item.name.az,
    name_ru: item.name.ru,
    bestseller: Boolean(item.bestseller),
  })),
};

const target = join(project, "backend", "seed", "home.json");
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, JSON.stringify(payload));
console.log(`products ${payload.products.length} banners ${payload.banners.length} articles ${payload.articles.length}`);
