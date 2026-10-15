import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { categories, products } from "@/data/products";
import { readOverrides, readSession } from "@/lib/admin";
import { readSiteContent } from "@/lib/site-content";

export async function GET() {
  const jar = await cookies();
  const user = readSession(jar.get("be-admin")?.value);
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });
  const overrides = readOverrides();
  const site = readSiteContent();
  const hidden = Object.values(overrides).filter((item) => item.hidden).length;
  return NextResponse.json({
    ok: true,
    user,
    products: products.length,
    categories: categories.length,
    hidden,
    edits: Object.keys(overrides).length,
    news: site.articles.length,
    stores: site.stores.length,
    campaigns: site.campaigns.length,
    banners: site.banners.length,
  });
}
