"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";
import type { HomePayload } from "@/lib/home";
import { getDictionary, withLocale, type Locale } from "@/lib/i18n";
import { DealClock, HomeTools } from "./HomeTools";
import { ProductCard } from "./ProductCard";

const tabs = ["smartfonlar", "notbuklar", "plansetler", "robot-tozsoran"] as const;

export function HomeView({ locale, home }: { locale: Locale; home: Omit<HomePayload, "products"> & { products: Product[] } }) {
  const dict = getDictionary(locale);
  const slides = (home.banners.length ? home.banners : ["https://media.bakuelectronics.az/media/page/slider/923x520_payız.webp"]).map((url) => encodeURI(url));
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState<(typeof tabs)[number]>("smartfonlar");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const sideIndex = slides.length ? (index + 1) % slides.length : 0;
  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % slides.length), 4200);
    return () => window.clearInterval(timer);
  }, [slides.length]);
  const bestsellers = home.products.filter((item) => item.bestseller);
  const seasonal = useMemo(
    () => [...home.products.filter((item) => item.category === tab)].sort((a, b) => b.oldPrice - b.price - (a.oldPrice - a.price)),
    [home.products, tab],
  );

  async function subscribe(event: FormEvent) {
    event.preventDefault();
    if (!email.includes("@")) return;
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const response = await fetch(`${base}/api/subscribe/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (response.ok) setSubscribed(true);
  }

  return (
    <div className="wrap">
      <div className="hero-grid">
        <section className="hero hero-photo hero-slider">
          <div className="hero-track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {slides.map((item) => (
              <img key={item} src={item} alt={locale === "az" ? "Kampaniya" : "Акция"} />
            ))}
          </div>
          <div className="dots">
            {slides.map((item, itemIndex) => (
              <button key={item} className={itemIndex === index ? "on" : ""} type="button" aria-label={`${itemIndex + 1}`} onClick={() => setIndex(itemIndex)} />
            ))}
          </div>
          <button className="slide-arrow prev" type="button" aria-label="prev" onClick={() => setIndex((value) => (value + slides.length - 1) % slides.length)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5 L7 12 L14 19" /></svg>
          </button>
          <button className="slide-arrow next" type="button" aria-label="next" onClick={() => setIndex((value) => (value + 1) % slides.length)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5 L17 12 L10 19" /></svg>
          </button>
        </section>
        <aside className="side-banner hero-photo hero-slider">
          <div className="hero-track" style={{ transform: `translateX(-${sideIndex * 100}%)` }}>
            {slides.map((item) => (
              <img key={item} src={item} alt="" />
            ))}
          </div>
        </aside>
      </div>
      <div className="banner-rail">
        {slides.map((item, itemIndex) => (
          <button key={item} type="button" className={itemIndex === index ? "on" : ""} onClick={() => setIndex(itemIndex)}>
            <img src={item} alt="" />
          </button>
        ))}
      </div>

      <section className="benefits">
        {home.benefits.map((item) => (
          <Link key={item.href} href={withLocale(locale, item.href)} className="benefit">
            <i aria-hidden="true"><img src={item.icon} alt="" /></i>
            <strong>{item.title[locale]}</strong>
            <span>{item.text[locale]}</span>
          </Link>
        ))}
      </section>

      <section className="brand-rail" aria-label={locale === "az" ? "Brendlər" : "Бренды"}>
        {home.brands.map((brand) => (
          <Link key={brand} href={withLocale(locale, `/catalog?brand=${encodeURIComponent(brand)}`)}>{brand}</Link>
        ))}
      </section>

      <DealClock locale={locale} campaigns={home.campaigns} />
      <HomeTools locale={locale} products={home.products} />

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.bestsellersLabel}</p>
            <h2>{dict.bestsellersTitle}</h2>
          </div>
          <Link className="more" href={withLocale(locale, "/catalog")}>{dict.seeAll}</Link>
        </div>
        <div className="scroller">
          {bestsellers.map((product) => <ProductCard key={product.id} product={product} locale={locale} dict={dict} />)}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2>{dict.campaignTitle}</h2>
            <p className="sub">{dict.campaignSubtitle}</p>
          </div>
        </div>
        <div className="tabs">
          {tabs.map((item) => (
            <button key={item} className={tab === item ? "chip on" : "chip"} type="button" onClick={() => setTab(item)}>
              {dict.tabs[item]}
            </button>
          ))}
        </div>
        <div className="scroller">
          {seasonal.map((product) => <ProductCard key={product.id} product={product} locale={locale} dict={dict} />)}
        </div>
      </section>

      <section className="section video-band">
        <div>
          <h2>{dict.youtubeTitle}</h2>
          <p>{dict.youtubeText}</p>
          <a className="light-btn" href="https://www.youtube.com/user/BakuElectronicsMMC" target="_blank" rel="noreferrer">{dict.youtubeCta}</a>
        </div>
        <div className="scroller video-row">
          {home.videos.map((video) => (
            <a key={video.id} className="video-card" href={video.href} target="_blank" rel="noreferrer">
              <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" />
              <i aria-hidden="true" />
              <span>{video.title}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section promo-duo">
        {home.promos.map((item) => (
          <article key={item.key} className={`promo-tile ${item.key === "audio" ? "audio" : "phone"}`}>
            <div>
              <div className="kicker">{item.kicker[locale]}</div>
              <h3>{item.title[locale]}</h3>
            </div>
            <Link className="light-btn" href={withLocale(locale, item.href)}>{dict.buyNow}</Link>
          </article>
        ))}
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2>{dict.newsTitle}</h2>
            <p className="sub">{dict.newsSubtitle}</p>
          </div>
          <Link className="more" href={withLocale(locale, "/xeberler")}>{dict.newsCta}</Link>
        </div>
        <div className="news-grid">
          {home.articles.slice(0, 6).map((article) => (
            <article key={article.slug} className="news-card">
              <Link href={withLocale(locale, `/xeberler/${article.slug}`)} className="news-cover">
                <img src={article.image} alt="" />
              </Link>
              <div className="date">{article.date}</div>
              <h3>{article.title[locale]}</h3>
              <p className="muted">{article.lead[locale]}</p>
              <Link className="more" href={withLocale(locale, `/xeberler/${article.slug}`)}>{dict.readMore}</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section newsletter">
        <div>
          <h2>{dict.newsletterTitle}</h2>
          {subscribed ? <p className="ok">{dict.subscribed}</p> : (
            <form onSubmit={subscribe}>
              <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder={dict.emailPlaceholder} aria-label={dict.emailPlaceholder} />
              <button className="primary" type="submit">{dict.subscribe}</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
