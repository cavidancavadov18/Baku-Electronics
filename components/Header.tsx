"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useState } from "react";
import { catalogMenu, categories, categoryBySlug, getProduct, productImage, searchSuggestions, type Product } from "@/data/products";
import { money } from "@/lib/format";
import { getDictionary, withLocale, type Locale } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { Icon, ShopIcon } from "./Icons";

const popularProducts = [
  getProduct("samsung-galaxy-s26-ultra"),
  getProduct("iphone-17-pro-256-silver"),
  getProduct("utu-philips-dst5040"),
].filter((item): item is Product => Boolean(item));

const showcaseProducts = [
  getProduct("tcl-qled-32"),
  getProduct("iphone-17-pro-256-silver"),
  getProduct("yoshiro-soyuducu"),
].filter((item): item is Product => Boolean(item));

const banner = encodeURI("https://media.bakuelectronics.az/media/page/slider/923x520_payız.webp");

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const store = useStore();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<"lang" | "more" | "catalog" | "mobile" | null>(null);
  const [group, setGroup] = useState(catalogMenu[0].id);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchPanel, setSearchPanel] = useState(false);
  const [active, setActive] = useState(-1);
  const other: Locale = locale === "az" ? "ru" : "az";
  const cartCount = store.cart.reduce((sum, line) => sum + line.qty, 0);

  useEffect(() => {
    const close = () => setOpen(null);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  useEffect(() => {
    setSearchPanel(false);
    setActive(-1);
  }, [pathname]);

  useEffect(() => {
    if (!searchPanel) return;
    const close = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest(".search")) return;
      setSearchPanel(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [searchPanel]);

  const suggestions = useMemo(() => (query.trim() ? searchSuggestions(query, 8) : popularProducts), [query]);
  const cards = query.trim() ? suggestions.slice(0, 3) : showcaseProducts;
  const completion = useMemo(() => {
    const q = query.trim();
    if (!q) return "";
    const lower = q.toLocaleLowerCase("az");
    for (const item of suggestions) {
      const name = item.name[locale];
      const hay = name.toLocaleLowerCase("az");
      let index = hay.indexOf(lower);
      while (index > 0 && !/\s/.test(name[index - 1])) {
        const next = hay.indexOf(lower, index + 1);
        if (next < 0) { index = -1; break; }
        index = next;
      }
      if (index < 0) continue;
      const rest = name.slice(index + q.length);
      if (rest) return rest;
    }
    return "";
  }, [query, suggestions, locale]);
  const categoryHits = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("az");
    const defaults = [
      { slug: catalogMenu[0].prefixes[0], name: catalogMenu[0].name },
      categories.find((item) => item.slug === "notbuklar"),
      categories.find((item) => item.slug === "soyuducular"),
    ].filter((item): item is { slug: string; name: { az: string; ru: string } } => Boolean(item));
    if (!q) return defaults;
    const matched = categories.filter((item) => item.name[locale].toLocaleLowerCase("az").includes(q)).slice(0, 5);
    return matched.length ? matched : defaults;
  }, [query, locale]);

  function switchLocale(next: Locale) {
    const parts = (pathname || `/${locale}`).split("/");
    parts[1] = next;
    const target = `${parts.join("/") || `/${next}`}${window.location.search}`;
    setOpen(null);
    window.location.assign(target);
  }

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const value = query.trim();
    window.location.assign(withLocale(locale, `/axtaris-neticesi?q=${encodeURIComponent(value)}`));
  }

  function follow(event: { preventDefault: () => void; currentTarget: { href: string } }) {
    event.preventDefault();
    window.location.assign(event.currentTarget.href);
  }

  function acceptCompletion() {
    if (!completion) return;
    setQuery(query.trim() + completion);
    setActive(-1);
  }

  function onSearchKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSearchPanel(true);
      setActive((value) => Math.min(value + 1, suggestions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((value) => Math.max(value - 1, -1));
    } else if (event.key === "Escape") {
      setSearchPanel(false);
    } else if (event.key === "Enter" && active >= 0 && suggestions[active]) {
      event.preventDefault();
      window.location.assign(withLocale(locale, `/mehsul/${suggestions[active].slug}`));
    } else if ((event.key === "Tab" || event.key === "ArrowRight") && completion) {
      const input = event.currentTarget;
      const atEnd = input.selectionStart === query.length;
      if (event.key === "Tab" || atEnd) {
        event.preventDefault();
        acceptCompletion();
      }
    }
  }

  function mark(text: string) {
    const q = query.trim();
    if (!q) return text;
    const index = text.toLocaleLowerCase("az").indexOf(q.toLocaleLowerCase("az"));
    if (index < 0) return text;
    return (
      <>
        {text.slice(0, index)}
        <b>{text.slice(index, index + q.length)}</b>
        {text.slice(index + q.length)}
      </>
    );
  }

  const currentMenu = catalogMenu.find((item) => item.id === group) ?? catalogMenu[0];
  const groupCategories = categories.filter((item) =>
    currentMenu.prefixes.some((prefix) => item.slug === prefix || item.slug.startsWith(prefix + "--"))
  );

  const night = store.theme === "dark";

  return (
    <>
      <div className="promo-bar">
        <img src="/promo-bar.png" alt={dict.promo} />
      </div>
      <div className="topbar">
        <div className="wrap topbar-inner">
          <nav className="top-links" aria-label="Info">
            {([
              ["/kampaniyalar", dict.nav.campaigns],
              ["/korporativ-satishlar", dict.nav.corporate],
              ["/magazalar", dict.nav.stores],
              ["/ayliq-odenis", dict.nav.monthly],
              ["/aktiv-muqavileler", dict.nav.contracts],
              ["/partnyorlar", dict.nav.partners],
            ] as const).map(([href, label]) => (
              <Link key={href} className={pathname.startsWith(withLocale(locale, href)) ? "is-on" : ""} href={withLocale(locale, href)}>{label}</Link>
            ))}
            <span className="more-wrap">
              <button type="button" onClick={() => setOpen(open === "more" ? null : "more")}>{dict.nav.more} ▾</button>
              {open === "more" && (
                <div className="more-menu">
                  <Link href={withLocale(locale, "/arxayin-al")}>{dict.more.safeBuy}</Link>
                  <Link href={withLocale(locale, "/musteri-karti")}>{dict.more.loyalty}</Link>
                  <Link href={withLocale(locale, "/zemanet")}>{dict.more.warranty}</Link>
                </div>
              )}
            </span>
          </nav>
          <div className="top-tools">
            <span className="lang-wrap">
              <button className="lang-btn" type="button" onClick={() => setOpen(open === "lang" ? null : "lang")}>{locale.toUpperCase()} ▾</button>
              {open === "lang" && (
                <div className="lang-menu">
                  <button type="button" onClick={() => switchLocale("az")}>AZ</button>
                  <button type="button" onClick={() => switchLocale("ru")}>RU</button>
                </div>
              )}
            </span>
            <button
              className={night ? "daynight is-night" : "daynight"}
              type="button"
              aria-pressed={night}
              aria-label={night ? (locale === "az" ? "Gecə rejimi" : "Ночной режим") : (locale === "az" ? "Gündüz rejimi" : "Дневной режим")}
              onClick={() => store.setTheme(night ? "light" : "dark")}
            >
              <span className="moon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M15 3a8 8 0 1 0 6 13 7 7 0 1 1-6-13z" /></svg>
              </span>
              <span className="sun" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="4" fill="currentColor" /><path stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5 5l1.6 1.6M17.4 17.4 19 19M19 5l-1.6 1.6M6.6 17.4 5 19" /></svg>
              </span>
            </button>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="wrap header-inner">
          <button className="icon-btn menu-btn" type="button" aria-label={dict.menu} onClick={() => setOpen(open === "mobile" ? null : "mobile")}><Icon name="menu" /></button>
          <Link href={withLocale(locale, "/")} className="logo" aria-label="Baku Electronics">
            <img src="https://media.bakuelectronics.az/media/logo/baku-electronics-logo_QJeQcxF.svg" alt="Baku Electronics" />
          </Link>
          <button className={open === "catalog" ? "catalog-btn is-open" : "catalog-btn"} type="button" aria-expanded={open === "catalog"} onClick={() => { setSearchPanel(false); setOpen(open === "catalog" ? null : "catalog"); }}>
            {open === "catalog" ? (
              <svg viewBox="0 0 13 13" width="14" height="14" aria-hidden="true">
                <path d="M1 1L12 12M12 1L1 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" fill="none">
                <path fillRule="evenodd" d="M2.5 5.42C2.5 3.23 2.52 2.5 5.42 2.5c2.89 0 2.91.73 2.91 2.92 0 2.18.01 2.91-2.91 2.91-2.93 0-2.92-.73-2.92-2.91Z" stroke="currentColor" strokeWidth="1.8" />
                <path fillRule="evenodd" d="M11.67 5.42c0-2.19.02-2.92 2.91-2.92 2.9 0 2.92.73 2.92 2.92 0 2.18.01 2.91-2.92 2.91-2.92 0-2.91-.73-2.91-2.91Z" stroke="currentColor" strokeWidth="1.8" />
                <path fillRule="evenodd" d="M2.5 14.58c0-2.19.02-2.91 2.92-2.91 2.89 0 2.91.72 2.91 2.91 0 2.19.01 2.92-2.91 2.92-2.93 0-2.92-.73-2.92-2.92Z" stroke="currentColor" strokeWidth="1.8" />
                <path fillRule="evenodd" d="M11.67 14.58c0-2.19.02-2.91 2.91-2.91 2.9 0 2.92.72 2.92 2.91 0 2.19.01 2.92-2.92 2.92-2.92 0-2.91-.73-2.91-2.92Z" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            )}
            {dict.catalog}
          </button>
          <form className={searchOpen ? "search open" : "search"} onSubmit={onSearch}>
            <div className="search-field">
              {completion && searchPanel && (
                <span className="search-hint" aria-hidden="true"><span className="typed">{query}</span>{completion}</span>
              )}
              <input
                value={query}
                onChange={(event) => { setQuery(event.target.value); setActive(-1); setSearchPanel(true); }}
                onMouseDown={() => { setSearchPanel(true); setOpen(null); }}
                onFocus={() => { setSearchPanel(true); setOpen(null); }}
                onKeyDown={onSearchKey}
                placeholder={dict.searchPlaceholder}
                aria-label={dict.searchPlaceholder}
                aria-expanded={searchPanel}
                aria-autocomplete="list"
                role="combobox"
              />
            </div>
            <button type="submit" aria-label={dict.searchBtn}><Icon name="search" /></button>
            {searchPanel && (
              <div className="search-panel">
                <div className="search-grid">
                  <div>
                    <div className="search-block">
                      <h3>{dict.searchPopular}</h3>
                      {suggestions.length === 0 && <p className="search-empty">{dict.searchEmpty}</p>}
                      {suggestions.map((item, index) => (
                        <a
                          key={item.id}
                          href={withLocale(locale, `/mehsul/${item.slug}`)}
                          className={index === active ? "search-pick on" : "search-pick"}
                          onMouseEnter={() => setActive(index)}
                          onClick={follow}
                        >
                          <i />
                          <span>{mark(item.name[locale])}</span>
                        </a>
                      ))}
                    </div>
                    <div className="search-block">
                      <h3>{dict.searchCategories}</h3>
                      {categoryHits.map((item) => (
                        <a key={item.slug} href={withLocale(locale, `/catalog/${item.slug}`)} className="search-pick" onClick={follow}>
                          <i />
                          <span>{mark(item.name[locale])}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3>{dict.searchProducts}</h3>
                    {cards.map((item) => (
                      <a key={item.id} href={withLocale(locale, `/mehsul/${item.slug}`)} className="search-card" onClick={follow}>
                        <img src={productImage(item)} alt="" />
                        <span>
                          <small>{categoryBySlug(item.category)?.name[locale] ?? item.brand}</small>
                          <strong>{item.name[locale]}</strong>
                        </span>
                        <span>
                          {item.oldPrice > item.price && <s>{money(item.oldPrice)}</s>}
                          <b>{money(item.price)}</b>
                        </span>
                      </a>
                    ))}
                    <Link className="search-banner" href={withLocale(locale, "/kampaniyalar")} onClick={() => setSearchPanel(false)}>
                      <img src={banner} alt="" />
                    </Link>
                  </div>
                </div>
                <button className="search-go" type="submit">{dict.searchAll}</button>
              </div>
            )}
          </form>
          <button className="icon-btn menu-btn" type="button" aria-label={dict.searchBtn} onClick={() => setSearchOpen((value) => !value)}><Icon name="search" /></button>
          <div className="head-tools">
            <Link className="head-tool" href={withLocale(locale, "/catalog/muqayise-et")} aria-label={dict.compare}>
              <ShopIcon name="compare" />
              {store.compare.length > 0 && <span className="badge">{store.compare.length}</span>}
            </Link>
            <Link className="head-tool" href={withLocale(locale, "/sebet")} aria-label={dict.cart}>
              <ShopIcon name="cart" />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
            <Link className="head-tool" href={withLocale(locale, "/sevimli-mehsullar")} aria-label={dict.wishlist}>
              <ShopIcon name="heart" />
              {store.wishlist.length > 0 && <span className="badge">{store.wishlist.length}</span>}
            </Link>
            <Link className="head-tool" href={withLocale(locale, "/hesab")} aria-label={dict.account}><ShopIcon name="user" /></Link>
          </div>
        </div>
        {open === "catalog" && (
          <>
            <button className="mega-back" type="button" aria-label={dict.close} onClick={() => setOpen(null)} />
            <div className={currentMenu.banner ? "mega has-banner" : "mega"}>
              <div className="mega-groups">
                {catalogMenu.map((item) => (
                  <button key={item.id} type="button" className={item.id === group ? "active" : ""} onMouseEnter={() => setGroup(item.id)} onClick={() => setGroup(item.id)}>
                    <img src={item.icon} alt="" />
                    <span>{item.name[locale]}</span>
                    <svg viewBox="0 0 8 14" width="8" height="12" aria-hidden="true"><path d="M1 1l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                  </button>
                ))}
              </div>
              <div className="mega-links" key={group}>
                {groupCategories.map((item) => (
                  <Link key={item.slug} href={withLocale(locale, `/catalog/${item.slug}`)} onClick={() => setOpen(null)}>
                    {item.name[locale]}
                  </Link>
                ))}
              </div>
              {currentMenu.banner && (
                <Link className="mega-banner" href={withLocale(locale, `/catalog/${currentMenu.prefixes[0]}`)} onClick={() => setOpen(null)}>
                  <img src={currentMenu.banner} alt="" />
                </Link>
              )}
            </div>
          </>
        )}
        {open === "mobile" && (
          <div className="wrap mobile-drawer">
            {categories.map((item) => (
              <Link key={item.slug} href={withLocale(locale, `/catalog/${item.slug}`)} onClick={() => setOpen(null)} style={{ display: "block", padding: "8px 0" }}>
                {item.name[locale]}
              </Link>
            ))}
            <button type="button" onClick={() => switchLocale(other)}>{other.toUpperCase()}</button>
          </div>
        )}
      </header>
    </>
  );
}
