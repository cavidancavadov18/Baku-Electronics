"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Campaign } from "@/data/content";
import { filterProducts, monthlyAmount, productImage, type Product } from "@/data/products";
import { money } from "@/lib/format";
import { withLocale, type Locale } from "@/lib/i18n";

type Need = "smartfonlar" | "notbuklar" | "tv-audio" | "soyuducular";
type Budget = "low" | "mid" | "high";
type Size = "small" | "mid" | "large";

const needs: { id: Need; az: string; ru: string }[] = [
  { id: "smartfonlar", az: "Telefon", ru: "Телефон" },
  { id: "notbuklar", az: "Notbuk", ru: "Ноутбук" },
  { id: "tv-audio", az: "Televizor", ru: "Телевизор" },
  { id: "soyuducular", az: "Ev texnikası", ru: "Техника для дома" },
];

const budgets: { id: Budget; az: string; ru: string; min: number; max: number }[] = [
  { id: "low", az: "400 ₼-dək", ru: "до 400 ₼", min: 0, max: 400 },
  { id: "mid", az: "400–1200 ₼", ru: "400–1200 ₼", min: 400, max: 1200 },
  { id: "high", az: "1200 ₼+", ru: "от 1200 ₼", min: 1200, max: Number.POSITIVE_INFINITY },
];

const sizes: { id: Size; az: string; ru: string }[] = [
  { id: "small", az: "Kiçik", ru: "Маленький" },
  { id: "mid", az: "Orta", ru: "Средний" },
  { id: "large", az: "Böyük", ru: "Большой" },
];

function copy(locale: Locale, az: string, ru: string) {
  return locale === "az" ? az : ru;
}

function endOfDay(until: string) {
  const match = until.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (!match) return null;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  return Date.UTC(year, month - 1, day, 19, 59, 59);
}

export function CampaignClock({ until, locale, compact = false }: { until: string; locale: Locale; compact?: boolean }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const end = endOfDay(until);
  const left = end && now ? Math.max(0, end - now) : 0;
  const parts = [
    { label: copy(locale, "gün", "дн"), value: Math.floor(left / 86400000) },
    { label: copy(locale, "saat", "ч"), value: Math.floor((left % 86400000) / 3600000) },
    { label: copy(locale, "dəq", "мин"), value: Math.floor((left % 3600000) / 60000) },
    { label: copy(locale, "san", "сек"), value: Math.floor((left % 60000) / 1000) },
  ];
  const finished = Boolean(end && now && left <= 0);
  return (
    <div className={compact ? "clock compact" : "clock"} aria-label={copy(locale, "Kampaniya saatı", "Таймер акции")}>
      {finished ? <strong>{copy(locale, "Müddət bitib", "Срок истёк")}</strong> : parts.map((part) => (
        <span key={part.label}><b>{now ? String(part.value).padStart(2, "0") : "--"}</b><small>{part.label}</small></span>
      ))}
    </div>
  );
}

export function DealClock({ locale, campaigns }: { locale: Locale; campaigns: Campaign[] }) {
  const next = campaigns
    .map((item) => ({ item, end: endOfDay(item.until) }))
    .filter((item): item is { item: Campaign; end: number } => item.end !== null && item.end > Date.now())
    .sort((a, b) => a.end - b.end)[0];
  if (!next) return null;
  return (
    <section className="deal-bar">
      <div>
        <strong>{next.item.title[locale]}</strong>
        <p>{copy(locale, `${next.item.until} tarixinədək`, `до ${next.item.until}`)}</p>
      </div>
      <CampaignClock until={next.item.until} locale={locale} />
      <Link className="light-btn" href={withLocale(locale, "/kampaniyalar")}>{copy(locale, "Kampaniyaya bax", "К акции")}</Link>
    </section>
  );
}

function picks(need: Need, budget: Budget, size: Size) {
  const band = budgets.find((item) => item.id === budget) ?? budgets[1];
  const sorted = filterProducts({ category: need, sort: "price-asc" });
  let list = sorted.filter((item) => item.price >= band.min && item.price <= band.max);
  if (!list.length) {
    const center = Number.isFinite(band.max) ? (band.min + band.max) / 2 : band.min;
    list = [...sorted].sort((a, b) => Math.abs(a.price - center) - Math.abs(b.price - center));
  }
  if (size === "large") list = [...list].sort((a, b) => b.price - a.price);
  if (size === "small") list = [...list].sort((a, b) => a.price - b.price);
  if (size === "mid" && list.length > 3) {
    const start = Math.max(0, Math.floor((list.length - 3) / 2));
    list = list.slice(start);
  }
  return list.slice(0, 3);
}

function ProductPicks({ locale, items }: { locale: Locale; items: Product[] }) {
  if (!items.length) return <p className="muted">{copy(locale, "Bu seçimə uyğun məhsul tapılmadı.", "По этому выбору товаров нет.")}</p>;
  return (
    <div className="tool-picks">
      {items.map((product) => (
        <Link key={product.id} className="tool-pick" href={withLocale(locale, `/mehsul/${product.slug}`)}>
          <img src={productImage(product)} alt="" />
          <span>{product.name[locale]}</span>
          <b>{money(product.price)}</b>
        </Link>
      ))}
    </div>
  );
}

export function HomeTools({ locale }: { locale: Locale }) {
  const [step, setStep] = useState(0);
  const [need, setNeed] = useState<Need>("smartfonlar");
  const [budget, setBudget] = useState<Budget>("mid");
  const [size, setSize] = useState<Size>("mid");
  const [ready, setReady] = useState(false);
  const [meters, setMeters] = useState(2.5);
  const phones = useMemo(() => filterProducts({ category: "smartfonlar", sort: "price-desc" }).slice(0, 8), []);
  const [phoneId, setPhoneId] = useState(phones[0]?.id ?? "");
  const [trade, setTrade] = useState(150);
  const phone = phones.find((item) => item.id === phoneId) ?? phones[0];
  const advice = picks(need, budget, size);
  const inches = meters < 1.8 ? 32 : meters < 3 ? 55 : 65;
  const tvs = filterProducts({ category: "tv-audio", sort: "popular" });
  const sized = tvs.filter((item) => item.name.az.includes(String(inches)) || item.name.ru.includes(String(inches)));
  const tvPicks = (sized.length ? sized : tvs).slice(0, 3);
  const tradeValue = phone ? Math.min(trade, Math.round(phone.price * 0.6)) : 0;
  const left = phone ? Math.max(phone.price - tradeValue, 0) : 0;

  return (
    <section className="home-tools">
      <article className="tool-card">
        <h2>{copy(locale, "Sənə uyğun məhsul", "Товар для вас")}</h2>
        <p className="muted">{copy(locale, "Üç sual, kataloqdan üç real seçim.", "Три вопроса и три реальных товара.")}</p>
        {step === 0 && (
          <>
            <p>{copy(locale, "Nə lazımdır?", "Что нужно?")}</p>
            <div className="choice-row">
              {needs.map((item) => (
                <button key={item.id} className={need === item.id ? "chip on" : "chip"} type="button" onClick={() => setNeed(item.id)}>{copy(locale, item.az, item.ru)}</button>
              ))}
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <p>{copy(locale, "Büdcə?", "Бюджет?")}</p>
            <div className="choice-row">
              {budgets.map((item) => (
                <button key={item.id} className={budget === item.id ? "chip on" : "chip"} type="button" onClick={() => setBudget(item.id)}>{copy(locale, item.az, item.ru)}</button>
              ))}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <p>{copy(locale, "Ölçü?", "Размер?")}</p>
            <div className="choice-row">
              {sizes.map((item) => (
                <button key={item.id} className={size === item.id ? "chip on" : "chip"} type="button" onClick={() => setSize(item.id)}>{copy(locale, item.az, item.ru)}</button>
              ))}
            </div>
          </>
        )}
        {!ready ? (
          <button className="primary" type="button" onClick={() => { if (step < 2) setStep(step + 1); else setReady(true); }}>
            {step < 2 ? copy(locale, "Növbəti", "Дальше") : copy(locale, "Göstər", "Показать")}
          </button>
        ) : (
          <>
            <ProductPicks locale={locale} items={advice} />
            <button className="ghost" type="button" onClick={() => { setReady(false); setStep(0); }}>{copy(locale, "Yenidən", "Заново")}</button>
          </>
        )}
      </article>

      <article className="tool-card">
        <h2>{copy(locale, "Televizor ölçüsü", "Размер телевизора")}</h2>
        <p className="muted">{copy(locale, "Divardan oturacağadək məsafəni sürüşdür.", "Сдвиньте расстояние от стены до дивана.")}</p>
        <label className="meter">
          <strong>{meters.toFixed(1)} m</strong>
          <input type="range" min={1} max={5} step={0.1} value={meters} onChange={(event) => setMeters(Number(event.target.value))} />
        </label>
        <p className="tool-size">{inches}″</p>
        <p className="muted">{copy(locale, "Bu məsafə üçün rahat diaqonal.", "Комфортная диагональ для этой дистанции.")}</p>
        <ProductPicks locale={locale} items={tvPicks} />
      </article>

      <article className="tool-card">
        <h2>{copy(locale, "Köhnəni dəyiş", "Сдай старый")}</h2>
        <p className="muted">{copy(locale, "Köhnə telefonun təxmini dəyəri yeni qiymətdən çıxılır.", "Примерная цена старого телефона вычитается из нового.")}</p>
        {phone && (
          <>
            <select value={phone.id} onChange={(event) => setPhoneId(event.target.value)} aria-label={copy(locale, "Yeni model", "Новая модель")}>
              {phones.map((item) => <option key={item.id} value={item.id}>{item.name[locale]}</option>)}
            </select>
            <label className="meter">
              <strong>{copy(locale, "Köhnə telefon", "Старый телефон")}: {money(tradeValue)}</strong>
              <input type="range" min={0} max={Math.max(50, Math.round(phone.price * 0.6))} step={10} value={tradeValue} onChange={(event) => setTrade(Number(event.target.value))} />
            </label>
            <p className="tool-size">{money(left)}</p>
            <p className="muted">{copy(locale, `Aylıq təxminən ${money(monthlyAmount(left, phone.months))}`, `В месяц около ${money(monthlyAmount(left, phone.months))}`)}</p>
            <Link className="more" href={withLocale(locale, `/mehsul/${phone.slug}`)}>{copy(locale, "Modelə bax", "К модели")}</Link>
          </>
        )}
      </article>
    </section>
  );
}
