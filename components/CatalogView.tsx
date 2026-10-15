"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { categories, categoryBySlug, filterProducts, type SortKey } from "@/data/products";
import { getDictionary, withLocale, type Locale } from "@/lib/i18n";
import { ProductCard } from "./ProductCard";

export function CatalogView({
  locale,
  category,
  brand,
  sort,
}: {
  locale: Locale;
  category?: string;
  brand?: string;
  sort: SortKey;
}) {
  const dict = getDictionary(locale);
  const router = useRouter();
  const current = category ? categoryBySlug(category) : undefined;
  const list = filterProducts({ category, brand, sort });
  const pageSize = 24;
  const [page, setPage] = useState(0);
  useEffect(() => setPage(0), [category, brand, sort, list.length]);
  const pageCount = Math.max(1, Math.ceil(list.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const visible = list.slice(safePage * pageSize, safePage * pageSize + pageSize);
  const brandOptions = [...new Set(filterProducts({ category }).map((item) => item.brand))].sort();

  function go(next: { category?: string; brand?: string; sort?: SortKey }) {
    const slug = next.category ?? category;
    const params = new URLSearchParams();
    const nextBrand = next.brand === undefined ? brand : next.brand;
    const nextSort = next.sort ?? sort;
    if (nextBrand) params.set("brand", nextBrand);
    if (nextSort !== "popular") params.set("sort", nextSort);
    const query = params.toString();
    router.push(withLocale(locale, `/catalog${slug ? `/${slug}` : ""}${query ? `?${query}` : ""}`));
  }

  return (
    <div className="wrap page">
      <div className="crumbs">
        <Link href={withLocale(locale, "/")}>{dict.home}</Link>
        <span>/</span>
        <Link href={withLocale(locale, "/catalog")}>{dict.catalog}</Link>
        {current && <><span>/</span><span>{current.name[locale]}</span></>}
      </div>
      <h1 className="page-title">{current ? current.name[locale] : dict.allCategories}</h1>
      <p className="sub">{list.length} {dict.results}</p>
      <div className="layout" style={{ marginTop: 16 }}>
        <aside className="filter">
          <h2>{dict.filters}</h2>
          <button type="button" onClick={() => go({ category: undefined, brand: "" })}>{dict.allCategories}</button>
          {categories.map((item) => (
            <Link key={item.slug} href={withLocale(locale, `/catalog/${item.slug}`)}>{item.name[locale]}</Link>
          ))}
          <h2>{dict.brand}</h2>
          <button type="button" onClick={() => go({ brand: "" })}>{dict.allBrands}</button>
          {brandOptions.map((item) => (
            <button key={item} type="button" onClick={() => go({ brand: item })}>{item}</button>
          ))}
        </aside>
        <div>
          <div className="toolbar">
            <span className="muted">{brand || dict.allBrands}</span>
            <select aria-label={dict.sort} value={sort} onChange={(event) => go({ sort: event.target.value as SortKey })}>
              <option value="popular">{dict.sortPopular}</option>
              <option value="price-asc">{dict.sortPriceAsc}</option>
              <option value="price-desc">{dict.sortPriceDesc}</option>
              <option value="discount">{dict.sortDiscount}</option>
            </select>
          </div>
          {list.length === 0 ? <div className="empty">{dict.emptyCatalog}</div> : (
            <>
              <div className="product-grid">
                {visible.map((product) => <ProductCard key={product.id} product={product} locale={locale} dict={dict} />)}
              </div>
              {pageCount > 1 && (
                <div className="pager">
                  <button type="button" className="light-btn" disabled={safePage === 0} onClick={() => setPage(safePage - 1)}>←</button>
                  <span className="muted">{safePage + 1} / {pageCount}</span>
                  <button type="button" className="light-btn" disabled={safePage >= pageCount - 1} onClick={() => setPage(safePage + 1)}>→</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
