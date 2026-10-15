"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

type Line = { from: "shop" | "user"; text: string };

export function ChatWidget({ locale }: { locale: Locale }) {
  const az = locale === "az";
  const hello = az
    ? "Salam! Baku Electronics-ə xoş gəlmisiniz. Payız kampaniyası və məhsullar haqqında sualınızı yazın."
    : "Здравствуйте! Добро пожаловать в Baku Electronics. Напишите вопрос об осенней акции или товаре.";
  const reply = az
    ? "Mesajınız qəbul olundu. Operator baxır. Təcili halda 143 nömrəsinə zəng edin."
    : "Сообщение принято. Оператор уже смотрит. В срочном случае звоните 143.";
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [lines, setLines] = useState<Line[]>([{ from: "shop", text: hello }]);

  function send(event: React.FormEvent) {
    event.preventDefault();
    const message = text.trim();
    if (!message) return;
    setText("");
    setLines((current) => [...current, { from: "user", text: message }, { from: "shop", text: reply }]);
  }

  return (
    <>
      {open && (
        <section className="live-chat" aria-label={az ? "Çat" : "Чат"}>
          <header>
            <div>
              <strong>Baku Electronics</strong>
              <span>{az ? "Onlayn" : "Онлайн"}</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label={az ? "Bağla" : "Закрыть"}>×</button>
          </header>
          <div className="live-chat-log">
            {lines.map((line, index) => (
              <p key={index} className={line.from}>{line.text}</p>
            ))}
          </div>
          <form onSubmit={send}>
            <input value={text} onChange={(event) => setText(event.target.value)} placeholder={az ? "Mesaj yazın..." : "Напишите сообщение..."} />
            <button type="submit">{az ? "Göndər" : "Отправить"}</button>
          </form>
        </section>
      )}
      <button className={`chat-launcher${open ? " is-open" : ""}`} type="button" aria-label={az ? "Çat" : "Чат"} onClick={() => setOpen((value) => !value)}>
        {open ? (
          <svg viewBox="0 0 64 64" width="28" height="28" aria-hidden="true">
            <path d="M18 18 L46 46 M46 18 L18 46" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
            <path fill="#fff" d="M14 12h32a8 8 0 0 1 8 8v18a8 8 0 0 1-8 8H30l-12 12V46h-4a8 8 0 0 1-8-8V20a8 8 0 0 1 8-8z" />
          </svg>
        )}
      </button>
    </>
  );
}
