import type { Campaign } from "@/data/content";
import type { Product } from "@/data/products";
import type { VideoItem } from "@/lib/site-content";

export type Localized = { az: string; ru: string };

export type HomeBenefit = { icon: string; title: Localized; text: Localized; href: string };

export type HomePromo = { key: string; kicker: Localized; title: Localized; href: string };

export type HomeProduct = {
  id: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  oldPrice: number;
  months: number;
  rating: number;
  reviews: number;
  code: string;
  image: string;
  name: Localized;
  bestseller: boolean;
};

export type HomeArticle = {
  slug: string;
  date: string;
  image: string;
  title: Localized;
  lead: Localized;
};

export type HomePayload = {
  banners: string[];
  benefits: HomeBenefit[];
  brands: string[];
  campaigns: Campaign[];
  videos: VideoItem[];
  articles: HomeArticle[];
  promos: HomePromo[];
  products: HomeProduct[];
};

export function toProduct(item: HomeProduct): Product {
  return {
    id: item.id,
    slug: item.slug,
    category: item.category,
    brand: item.brand,
    price: item.price,
    oldPrice: item.oldPrice,
    months: item.months,
    rating: item.rating,
    reviews: item.reviews,
    code: item.code,
    visual: "phone",
    tone: "#ffffff",
    image: item.image,
    name: item.name,
    about: item.name,
    specs: [],
    bestseller: item.bestseller,
  };
}

export async function readHome(): Promise<HomePayload> {
  const base = process.env.API_URL || "http://127.0.0.1:8000";
  const response = await fetch(`${base}/api/home/`, { cache: "no-store" });
  if (!response.ok) throw new Error("Ana səhifə məlumatı gəlmədi.");
  return response.json();
}
