"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { partners, type Article, type Campaign, type Store } from "@/data/content";
import { CampaignClock } from "./HomeTools";
import type { SiteContent } from "@/lib/site-content";
import { getInfo } from "@/data/info";
import { brands, categories } from "@/data/products";
import { getDictionary, withLocale, type Locale } from "@/lib/i18n";

export function ContentView({ locale, slug, site }: { locale: Locale; slug: string; site: SiteContent }) {
  const dict = getDictionary(locale);
  if (slug === "kampaniyalar") return <Campaigns locale={locale} items={site.campaigns} />;
  if (slug === "magazalar") return <Stores locale={locale} items={site.stores} />;
  if (slug === "partnyorlar") return <Partners locale={locale} />;
  if (slug === "brend-siyahi") return <BrandList locale={locale} />;
  if (slug === "aktiv-muqavileler") return <ContractForm locale={locale} />;
  if (slug === "muraciet-ve-sikayetler" || slug === "korporativ-satishlar") return <LeadForm locale={locale} slug={slug} />;

  const page = getInfo(slug);
  if (!page) return null;
  return (
    <div className="wrap page article">
      <Crumbs locale={locale} title={page.title[locale]} />
      <h1 className="page-title">{page.title[locale]}</h1>
      <p>{page.lead[locale]}</p>
      {page.blocks.map((block) => (
        <section key={block.heading.az}>
          <h2>{block.heading[locale]}</h2>
          {block.paragraphs.map((paragraph) => <p key={paragraph.az}>{paragraph[locale]}</p>)}
        </section>
      ))}
      <p className="muted">{dict.callUs}</p>
    </div>
  );
}

function Crumbs({ locale, title }: { locale: Locale; title: string }) {
  const dict = getDictionary(locale);
  return (
    <div className="crumbs">
      <Link href={withLocale(locale, "/")}>{dict.home}</Link>
      <span>/</span>
      <span>{title}</span>
    </div>
  );
}

function Campaigns({ locale, items }: { locale: Locale; items: Campaign[] }) {
  const dict = getDictionary(locale);
  return (
    <div className="wrap page">
      <Crumbs locale={locale} title={dict.nav.campaigns} />
      <h1 className="page-title">{dict.nav.campaigns}</h1>
      <p className="sub">{dict.campaignsLead}</p>
      <div className="campaign-grid">
        {items.map((item) => (
          <article key={item.slug} className={`campaign-card hero ${item.tone}`} style={{ minHeight: 220, backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.62), rgba(0,0,0,.12)), url("${item.image}")` }}>
            <div className="kicker">{item.until}</div>
            <CampaignClock until={item.until} locale={locale} compact />
            <h2 style={{ fontSize: 24 }}>{item.title[locale]}</h2>
            <p>{item.text[locale]}</p>
            <Link className="light-btn" href={withLocale(locale, "/catalog")}>{dict.buyNow}</Link>
          </article>
        ))}
      </div>
    </div>
  );
}

function Stores({ locale, items }: { locale: Locale; items: Store[] }) {
  const dict = getDictionary(locale);
  const allLabel = locale === "az" ? "Hamısı" : "Все";
  const cities = [...new Set(items.map((store) => store.city[locale]))];
  const [city, setCity] = useState(allLabel);
  const near = city === allLabel ? [] : items.filter((store) => store.city[locale] === city);
  const rest = city === allLabel ? items : items.filter((store) => store.city[locale] !== city);
  return (
    <div className="wrap page">
      <Crumbs locale={locale} title={dict.nav.stores} />
      <h1 className="page-title">{dict.nav.stores}</h1>
      <p className="sub">{dict.storesLead}</p>
      <div className="tabs">
        {[allLabel, ...cities].map((item) => (
          <button key={item} className={city === item ? "chip on" : "chip"} type="button" onClick={() => setCity(item)}>{item}</button>
        ))}
      </div>
      {near.length > 0 && <p className="sub">{locale === "az" ? `${city} filialları öndədir. Xəritə keçidi hər kartda qalır.` : `Филиалы города ${city} идут первыми. Ссылка на карту остаётся на каждой карточке.`}</p>}
      <div className="store-grid">
        {[...near, ...rest].map((store) => (
          <article key={store.id} className={near.some((item) => item.id === store.id) ? "store-card is-near" : "store-card"}>
            <div className="muted">{store.city[locale]}</div>
            <h2 style={{ fontSize: 22, margin: "6px 0" }}>{store.name[locale]}</h2>
            <p>{dict.address}: {store.address[locale]}</p>
            <p>{dict.hours}: {store.hours}</p>
            <p>{dict.phoneLabel}: <a href={`tel:${store.phone}`}>{store.phone}</a></p>
            <a className="more" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address[locale])}`} target="_blank" rel="noreferrer">{locale === "az" ? "Xəritədə aç" : "Открыть на карте"}</a>
          </article>
        ))}
      </div>
    </div>
  );
}

function Partners({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <div className="wrap page">
      <Crumbs locale={locale} title={dict.nav.partners} />
      <h1 className="page-title">{dict.nav.partners}</h1>
      <p className="sub">{dict.partnersLead}</p>
      <div className="partner-grid">
        {partners.map((item) => (
          <article key={item.name} className="partner-card">
            <img src={item.logo} alt={item.name} />
            <strong>{item.name}</strong>
            <span className="muted">{item.text[locale]}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

function BrandList({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <div className="wrap page">
      <Crumbs locale={locale} title={dict.footerLinks.info[2].label} />
      <h1 className="page-title">{dict.footerLinks.info[2].label}</h1>
      <p className="sub">{dict.brandsLead}</p>
      <div className="brand-grid">
        {brands().map((brand) => (
          <Link key={brand} className="brand-card" href={withLocale(locale, `/catalog?brand=${encodeURIComponent(brand)}`)}>
            <strong>{brand}</strong>
            <span className="more">{dict.seeAll}</span>
          </Link>
        ))}
      </div>
      <div className="tabs" style={{ marginTop: 18 }}>
        {categories.map((item) => (
          <Link key={item.slug} className="chip" href={withLocale(locale, `/catalog/${item.slug}`)}>{item.name[locale]}</Link>
        ))}
      </div>
    </div>
  );
}

function ContractForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [done, setDone] = useState(false);
  return (
    <div className="wrap page article">
      <Crumbs locale={locale} title={dict.nav.contracts} />
      <h1 className="page-title">{dict.nav.contracts}</h1>
      <p>{locale === "az" ? "FİN və müqavilə nömrəsini yazın. Nəticə nümunə məlumatıdır və serverə getmir." : "Введите FIN и номер договора. Результат образцовый и не уходит на сервер."}</p>
      <form className="plain-card" onSubmit={(event) => { event.preventDefault(); setDone(true); }}>
        <div className="field"><label>{dict.fin}</label><input required minLength={5} /></div>
        <div className="field"><label>{dict.contractNo}</label><input required /></div>
        <button className="primary" type="submit">{dict.check}</button>
        {done && <p className="ok">{dict.contractOk}</p>}
      </form>
    </div>
  );
}

function LeadForm({ locale, slug }: { locale: Locale; slug: string }) {
  const dict = getDictionary(locale);
  const corporate = slug === "korporativ-satishlar";
  const [done, setDone] = useState(false);
  const title = corporate ? dict.nav.corporate : dict.footerLinks.buyers[7].label;

  function submit(event: FormEvent) {
    event.preventDefault();
    setDone(true);
  }

  return (
    <div className="wrap page article">
      <Crumbs locale={locale} title={title} />
      <h1 className="page-title">{title}</h1>
      {corporate ? (
        <>
          <p>{locale === "az" ? "Ofis, mağaza və otel sifarişləri üçün toplu qiymət hazırlanır. Modelləri və sayını yazın." : "Для офиса, магазина и отеля готовим оптовую цену. Напишите модели и количество."}</p>
          <p>{locale === "az" ? "Çatdırılma Bakı daxilində 24 saat, bölgələrə 2–5 iş günü planlanır. Quraşdırma ayrıca qiymətləndirilir." : "Доставка по Баку планируется за 24 часа, в регионы — за 2–5 рабочих дней. Установка считается отдельно."}</p>
        </>
      ) : (
        <>
          <p>{locale === "az" ? "Şikayət, servis və sifariş suallarını buradan yazın. Mesaj bu cihazda qalır, operator cavabı nümunə mətnidir." : "Пишите вопросы по жалобе, сервису и заказу. Сообщение остаётся на устройстве, ответ оператора — образец."}</p>
          <p>{locale === "az" ? "Təcili halda 143 nömrəsinə zəng edin. İş saatı hər gün 09:00–21:00." : "В срочном случае звоните на 143. Часы работы ежедневно 09:00–21:00."}</p>
        </>
      )}
      <form className="plain-card" onSubmit={submit}>
        <div className="field"><label>{dict.name}</label><input required /></div>
        {corporate && <div className="field"><label>{dict.companyName}</label><input required /></div>}
        <div className="field"><label>{dict.phone}</label><input required /></div>
        <div className="field"><label>{dict.email}</label><input type="email" required /></div>
        <div className="field"><label>{dict.message}</label><textarea required minLength={10} /></div>
        <button className="primary" type="submit">{dict.send}</button>
        {done && <p className="ok">{dict.sent}</p>}
      </form>
    </div>
  );
}

export function NewsList({ locale, articles }: { locale: Locale; articles: Article[] }) {
  const dict = getDictionary(locale);
  return (
    <div className="wrap page">
      <Crumbs locale={locale} title={dict.newsTitle} />
      <h1 className="page-title">{dict.newsTitle}</h1>
      <p className="sub">{dict.newsSubtitle}</p>
      <div className="news-grid">
        {articles.map((article) => (
          <article key={article.slug} className="news-card">
            <Link href={withLocale(locale, `/xeberler/${article.slug}`)} className="news-cover">
              <img src={article.image} alt="" />
            </Link>
            <div className="date">{article.date}</div>
            <h2 style={{ fontSize: 18 }}>{article.title[locale]}</h2>
            <p>{article.lead[locale]}</p>
            <Link className="more" href={withLocale(locale, `/xeberler/${article.slug}`)}>{dict.readMore}</Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export function NewsArticle({ locale, article }: { locale: Locale; article: Article }) {
  const dict = getDictionary(locale);
  return (
    <div className="wrap page article">
      <div className="crumbs">
        <Link href={withLocale(locale, "/")}>{dict.home}</Link>
        <span>/</span>
        <Link href={withLocale(locale, "/xeberler")}>{dict.newsTitle}</Link>
        <span>/</span>
        <span>{article.title[locale]}</span>
      </div>
      <img className="article-cover" src={article.image} alt="" />
      <div className="date">{article.date}</div>
      <h1 className="page-title">{article.title[locale]}</h1>
      <p><strong>{article.lead[locale]}</strong></p>
      {article.body.map((paragraph) => <p key={paragraph.az}>{paragraph[locale]}</p>)}
    </div>
  );
}
