import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { productImage, products } from "@/data/products";
import { readOverrides, readSession, writeOverride, type ProductOverride } from "@/lib/admin";

function guard() {
  return cookies().then((jar) => readSession(jar.get("be-admin")?.value));
}

export async function GET(request: Request) {
  const user = await guard();
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });
  const url = new URL(request.url);
  const query = (url.searchParams.get("q") ?? "").trim().toLocaleLowerCase();
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1) || 1);
  const size = 20;
  const overrides = readOverrides();
  const list = products.filter((item) => {
    if (!query) return true;
    return `${item.name.az} ${item.brand} ${item.code} ${item.category}`.toLocaleLowerCase().includes(query);
  });
  const slice = list.slice((page - 1) * size, page * size).map((item) => {
    const patch = overrides[item.id];
    return {
      id: item.id,
      name: patch?.name || item.name.az,
      brand: item.brand,
      code: item.code,
      category: item.category,
      price: patch?.price ?? item.price,
      oldPrice: patch?.oldPrice ?? item.oldPrice,
      image: productImage(item),
      hidden: Boolean(patch?.hidden),
    };
  });
  return NextResponse.json({ ok: true, total: list.length, page, pages: Math.max(1, Math.ceil(list.length / size)), items: slice });
}

export async function PATCH(request: Request) {
  const user = await guard();
  if (!user?.is_superuser) return NextResponse.json({ ok: false }, { status: 401 });
  const body = (await request.json().catch(() => null)) as ({ id?: string } & ProductOverride) | null;
  const product = products.find((item) => item.id === body?.id);
  if (!product || !body) return NextResponse.json({ ok: false }, { status: 404 });
  const patch: ProductOverride = {};
  if (typeof body.name === "string") patch.name = body.name.trim();
  if (typeof body.price === "number" && Number.isFinite(body.price)) patch.price = body.price;
  if (typeof body.oldPrice === "number" && Number.isFinite(body.oldPrice)) patch.oldPrice = body.oldPrice;
  if (typeof body.hidden === "boolean") patch.hidden = body.hidden;
  writeOverride(product.id, patch);
  return NextResponse.json({ ok: true });
}
