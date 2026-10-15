"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { productImage, products, publicProduct } from "@/data/products";
import { money } from "@/lib/format";
import { getDictionary, withLocale, type Locale } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { ProductVisual } from "./ProductVisual";
import { ProductCard } from "./ProductCard";

export function CartView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const store = useStore();
  const lines = store.cart
    .map((line) => {
      const found = products.find((item) => item.id === line.id);
      return { ...line, product: found ? publicProduct(found) ?? undefined : undefined };
    })
    .filter((line) => line.product);
  const subtotal = lines.reduce((sum, line) => sum + line.product!.price * line.qty, 0);

  return (
    <div className="wrap page">
      <h1 className="page-title">{dict.cartTitle}</h1>
      {lines.length === 0 ? (
        <div className="empty">
          <p>{dict.emptyCart}</p>
          <Link className="primary" href={withLocale(locale, "/catalog")}>{dict.continue}</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            {lines.map((line) => (
              <div className="cart-line" key={line.id}>
                <div className="card-visual" style={{ height: 92 }}>
                  <ProductVisual src={productImage(line.product!)} alt={line.product!.name[locale]} />
                </div>
                <div>
                  <Link href={withLocale(locale, `/mehsul/${line.product!.slug}`)}><strong>{line.product!.name[locale]}</strong></Link>
                  <div className="muted">{money(line.product!.price)}</div>
                  <div className="stepper" style={{ marginTop: 8 }}>
                    <button type="button" onClick={() => store.setQty(line.id, line.qty - 1)}>−</button>
                    <span>{line.qty}</span>
                    <button type="button" onClick={() => store.setQty(line.id, line.qty + 1)}>+</button>
                    <button type="button" onClick={() => store.removeFromCart(line.id)}>{dict.remove}</button>
                  </div>
                </div>
                <strong>{money(line.product!.price * line.qty)}</strong>
              </div>
            ))}
          </div>
          <aside className="plain-card summary">
            <h2>{dict.summary}</h2>
            <p>{dict.subtotal}: {money(subtotal)}</p>
            <p>{dict.delivery}: {dict.free}</p>
            <p className="price">{dict.total}: {money(subtotal)}</p>
            <p className="muted">{dict.checkoutNote}</p>
            <Link className="ghost" href={withLocale(locale, "/catalog")}>{dict.continue}</Link>
          </aside>
        </div>
      )}
    </div>
  );
}

export function WishlistView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const store = useStore();
  const list = products.flatMap((item) => {
    const next = publicProduct(item);
    return next && store.wishlist.includes(item.id) ? [next] : [];
  });
  return (
    <div className="wrap page">
      <h1 className="page-title">{dict.wishlistTitle}</h1>
      {list.length === 0 ? <div className="empty">{dict.emptyWishlist}</div> : (
        <div className="product-grid">
          {list.map((product) => <ProductCard key={product.id} product={product} locale={locale} dict={dict} />)}
        </div>
      )}
    </div>
  );
}

export function CompareView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const store = useStore();
  const list = products.flatMap((item) => {
    const next = publicProduct(item);
    return next && store.compare.includes(item.id) ? [next] : [];
  });
  const labels = [...new Set(list.flatMap((item) => item.specs.map((spec) => spec.label[locale])))];
  return (
    <div className="wrap page">
      <h1 className="page-title">{dict.compareTitle}</h1>
      {list.length === 0 ? <div className="empty">{dict.emptyCompare}</div> : (
        <div style={{ overflowX: "auto" }}>
          <table className="compare-table">
            <thead>
              <tr>
                <th>{dict.specs}</th>
                {list.map((item) => (
                  <th key={item.id}>
                    <Link href={withLocale(locale, `/mehsul/${item.slug}`)}>{item.name[locale]}</Link>
                    <div><button type="button" onClick={() => store.toggleCompare(item.id)}>{dict.remove}</button></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dict.total}</td>
                {list.map((item) => <td key={item.id}>{money(item.price)}</td>)}
              </tr>
              {labels.map((label) => (
                <tr key={label}>
                  <td>{label}</td>
                  {list.map((item) => {
                    const spec = item.specs.find((row) => row.label[locale] === label);
                    return <td key={item.id}>{spec ? spec.value[locale] : "—"}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function SearchView({ locale, query }: { locale: Locale; query: string }) {
  const dict = getDictionary(locale);
  const list = query
    ? products.flatMap((item) => {
        const next = publicProduct(item);
        if (!next) return [];
        const hay = `${next.name.az} ${next.name.ru} ${next.brand} ${next.code}`.toLocaleLowerCase();
        return hay.includes(query.toLocaleLowerCase()) ? [next] : [];
      })
    : [];
  return (
    <div className="wrap page">
      <h1 className="page-title">{dict.searchTitle}</h1>
      <p className="sub">{query ? `“${query}” · ${list.length} ${dict.results}` : dict.searchPlaceholder}</p>
      {query && list.length === 0 ? <div className="empty">{dict.emptySearch}</div> : (
        <div className="product-grid" style={{ marginTop: 16 }}>
          {list.map((product) => <ProductCard key={product.id} product={product} locale={locale} dict={dict} />)}
        </div>
      )}
    </div>
  );
}

export function AccountView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const store = useStore();
  const [name, setName] = useState(store.account?.name ?? "");
  const [phone, setPhone] = useState(store.account?.phone ?? "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!store.account) return;
    setName(store.account.name);
    setPhone(store.account.phone);
  }, [store.account]);

  return (
    <div className="wrap page">
      <h1 className="page-title">{dict.accountTitle}</h1>
      <p className="sub">{dict.accountLead}</p>
      <form
        className="plain-card stack"
        style={{ maxWidth: 480, marginTop: 16 }}
        onSubmit={(event) => {
          event.preventDefault();
          store.setAccount({ name, phone });
          setSaved(true);
        }}
      >
        <div className="field">
          <label htmlFor="name">{dict.name}</label>
          <input id="name" value={name} onChange={(event) => setName(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="phone">{dict.phone}</label>
          <input id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} required placeholder="+994" />
        </div>
        <button className="primary" type="submit">{dict.save}</button>
        {saved && <p className="ok">{dict.saved}</p>}
        {store.account && (
          <button className="ghost" type="button" onClick={() => { store.setAccount(null); setName(""); setPhone(""); setSaved(false); }}>{dict.logout}</button>
        )}
      </form>
    </div>
  );
}
