"use client";

import Link from "next/link";
import { monthlyAmount, productImage, type Product } from "@/data/products";
import { money } from "@/lib/format";
import { withLocale, type Dictionary, type Locale } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { Icon } from "./Icons";
import { ProductVisual } from "./ProductVisual";

export function Stars({ value }: { value: number }) {
  return (
    <span className="stars" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= value ? "" : "off"}>★</span>
      ))}
    </span>
  );
}

export function ProductCard({ product, locale, dict }: { product: Product; locale: Locale; dict: Dictionary }) {
  const store = useStore();
  const wished = store.wishlist.includes(product.id);
  const compared = store.compare.includes(product.id);
  const monthly = monthlyAmount(product.price, product.months);
  const saved = Math.round((product.oldPrice - product.price) * 100) / 100;

  return (
    <article className="card">
      <div className="card-visual">
        {saved > 0 && <span className="discount">- {money(saved)}</span>}
        <div className="card-tools">
          <button
            type="button"
            className={wished ? "on" : ""}
            aria-label={dict.wishlist}
            onClick={() => store.toggleWish(product.id)}
          >
            <Icon name="heart" />
          </button>
          <button
            type="button"
            className={compared ? "on" : ""}
            aria-label={dict.compare}
            onClick={() => {
              const ok = store.toggleCompare(product.id);
              if (!ok) store.setNotice(dict.compareLimit);
            }}
          >
            <Icon name="compare" />
          </button>
        </div>
        <Link href={withLocale(locale, `/mehsul/${product.slug}`)}>
          <ProductVisual src={productImage(product)} alt={product.name[locale]} />
        </Link>
      </div>
      <div className="meta">
        <Stars value={product.rating} />
        <span>{product.reviews} {dict.reviews}</span>
      </div>
      <h3>
        <Link href={withLocale(locale, `/mehsul/${product.slug}`)}>{product.name[locale]}</Link>
      </h3>
      {saved > 0 && <div className="old">{money(product.oldPrice)}</div>}
      <div className="price">{money(product.price)}</div>
      <div className="installment-line">
        {product.months} {dict.monthShort} · <b>{money(monthly)}</b>
      </div>
      <button
        className="primary full"
        type="button"
        onClick={() => {
          store.addToCart(product.id);
          store.setNotice(dict.added);
        }}
      >
        {dict.addToCart}
      </button>
    </article>
  );
}
