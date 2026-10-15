"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categoryBySlug, filterProducts, monthlyAmount, productImage, type Product } from "@/data/products";
import { money } from "@/lib/format";
import { getDictionary, withLocale, type Locale } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { ProductCard, Stars } from "./ProductCard";
import { ProductVisual } from "./ProductVisual";

const months = [3, 6, 9, 12, 15, 18, 21, 24];

export function ProductView({ locale, product }: { locale: Locale; product: Product }) {
  const dict = getDictionary(locale);
  const store = useStore();
  const category = categoryBySlug(product.category);
  const [term, setTerm] = useState(product.months);
  const [down, setDown] = useState(0);
  const [bank, setBank] = useState(0);
  const [qty, setQty] = useState(1);
  const monthly = useMemo(() => monthlyAmount(product.price, term, down), [product.price, term, down]);
  const similar = filterProducts({ category: product.category }).filter((item) => item.id !== product.id).slice(0, 4);
  const wished = store.wishlist.includes(product.id);

  async function share() {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      store.setNotice(dict.copied);
    } catch {
      store.setNotice(url);
    }
  }

  return (
    <div className="wrap page">
      <div className="crumbs">
        <Link href={withLocale(locale, "/")}>{dict.home}</Link>
        <span>/</span>
        <Link href={withLocale(locale, `/catalog/${product.category}`)}>{category?.name[locale]}</Link>
        <span>/</span>
        <span>{product.name[locale]}</span>
      </div>
      <div className="product-layout">
        <div className="gallery">
          <div className="gallery-main">
            <ProductVisual src={productImage(product)} alt={product.name[locale]} />
          </div>
        </div>
        <div className="product-buy">
          <div className="meta">
            <Stars value={product.rating} />
            <span>{product.reviews} {dict.reviews}</span>
          </div>
          <h1>{product.name[locale]}</h1>
          <div className="code">{dict.productCode}: {product.code}</div>
          {product.oldPrice > product.price && <div className="old">{money(product.oldPrice)}</div>}
          <div className="price-xl">{money(product.price)}</div>
          <p className="muted">{dict.priceNote}</p>
          <div className="actions">
            <button className="primary" type="button" onClick={() => { store.addToCart(product.id, qty); store.setNotice(dict.added); }}>
              {dict.addToCart}
            </button>
            <button className="ghost" type="button" onClick={share}>{dict.share}</button>
            <button className="ghost" type="button" onClick={() => store.toggleWish(product.id)}>{wished ? "♥" : "♡"} {dict.wishlist}</button>
          </div>
          <div className="payboxes">
            <div className="paybox">
              <strong>{dict.oneClick}</strong>
              <div className="muted">{dict.oneClickText}</div>
            </div>
            <div className="paybox">
              <strong>{dict.installment}</strong>
              <div>{money(monthly)} / {term} {dict.monthShort}</div>
            </div>
          </div>
          <div className="calc">
            <div className="bank-row">
              {dict.banks.map((name, index) => (
                <button key={name} className={bank === index ? "chip on" : "chip"} type="button" onClick={() => setBank(index)}>{name}</button>
              ))}
            </div>
            <div className="muted">{dict.duration}</div>
            <div className="month-row">
              {months.map((item) => (
                <button key={item} className={term === item ? "chip on" : "chip"} type="button" onClick={() => setTerm(item)}>{item} {dict.monthShort}</button>
              ))}
            </div>
            <div className="muted">{dict.initialPayment}</div>
            <div className="stepper">
              <button type="button" onClick={() => setDown((value) => Math.max(0, value - 50))}>−</button>
              <strong>{money(down)}</strong>
              <button type="button" onClick={() => setDown((value) => Math.min(product.price - 10, value + 50))}>+</button>
            </div>
            <p>{dict.monthlyPay}: <strong>{money(monthly)}</strong></p>
            <div className="stepper">
              <span className="muted">{dict.qty}</span>
              <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))}>−</button>
              <strong>{qty}</strong>
              <button type="button" onClick={() => setQty((value) => value + 1)}>+</button>
            </div>
          </div>
        </div>
      </div>
      <section className="section">
        <h2>{dict.description}</h2>
        <p>{product.about[locale]}</p>
        <h2>{dict.specs}</h2>
        <table className="specs">
          <tbody>
            {product.specs.map((row) => (
              <tr key={row.label.az}>
                <td>{row.label[locale]}</td>
                <td>{row.value[locale]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {similar.length > 0 && (
        <section className="section">
          <h2>{dict.similar}</h2>
          <div className="product-grid">
            {similar.map((item) => <ProductCard key={item.id} product={item} locale={locale} dict={dict} />)}
          </div>
        </section>
      )}
    </div>
  );
}
