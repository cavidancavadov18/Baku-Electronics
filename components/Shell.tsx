"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDictionary, withLocale, type Locale } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { ChatWidget } from "./ChatWidget";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Shell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const dict = getDictionary(locale);
  const store = useStore();
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("be-popup")) setPopup(true);
  }, []);

  useEffect(() => {
    if (!store.notice) return;
    const timer = window.setTimeout(() => store.setNotice(""), 1800);
    return () => window.clearTimeout(timer);
  }, [store]);

  function closePopup() {
    sessionStorage.setItem("be-popup", "1");
    setPopup(false);
  }

  return (
    <>
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
      <ChatWidget locale={locale} />
      {popup && (
        <div className="modal-back" role="presentation" onClick={closePopup}>
          <div className="modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <button className="x" type="button" onClick={closePopup} aria-label={dict.close}>×</button>
            <div className="kicker" style={{ color: "var(--red)" }}>7–31 OKT</div>
            <h2>{dict.popupTitle}</h2>
            <p>{dict.popupText}</p>
            <Link className="primary" href={withLocale(locale, "/kampaniyalar")} onClick={closePopup}>{dict.popupMore}</Link>
          </div>
        </div>
      )}
      {store.notice && <div className="toast">{store.notice}</div>}
    </>
  );
}
