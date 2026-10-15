import Link from "next/link";
import { getDictionary, withLocale, type Locale } from "@/lib/i18n";

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/bakuelectronics.mmc", path: "M14 8h2V6h-2V4h-2v2h-2v2h2v2h2V8zm-2 8a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" },
  { label: "YouTube", href: "https://www.youtube.com/user/BakuElectronicsMMC", path: "M10 15.5v-7l6 3.5-6 3.5zM4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 13.5v-7z" },
  { label: "Instagram", href: "https://www.instagram.com/bakuelectronics.az/", path: "M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4zm8.5 2.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM12 8.2A3.8 3.8 0 1 0 12 15.8 3.8 3.8 0 0 0 12 8.2z" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/bakuelectronics/", path: "M6 9H4v11h2V9zM5 4.5A1.5 1.5 0 1 0 5 7.5 1.5 1.5 0 0 0 5 4.5zM20 13.4c0-2.6-1.4-4.4-3.8-4.4-1.6 0-2.5.9-3 1.7V9H11v11h2.2v-6c0-1.6.8-2.6 2.2-2.6s1.9.9 1.9 2.6V20H20v-6.6z" },
  { label: "Telegram", href: "https://t.me/baku_electronics", path: "M20 5 3.8 11.2c-1 .4-1 1 .2 1.3l4.2 1.3 1.6 5c.2.6.1.8.7.8.4 0 .6-.2.8-.4l2.3-2.2 4.3 3.2c.8.4 1.4.2 1.6-.8L21.2 6c.3-1.1-.4-1.6-1.2-1z" },
  { label: "TikTok", href: "https://www.tiktok.com/@bakuelectronics", path: "M14 4c.6 2.4 2.2 3.8 4.5 4v2.2c-1.5 0-2.9-.5-4.1-1.3v5.6A5.5 5.5 0 1 1 9 9.1v2.4a3.2 3.2 0 1 0 2.2 3.1V4H14z" },
  { label: "WhatsApp", href: "https://whatsapp.com/channel/0029Vb4c8tl0lwgzdt5Lup0O", path: "M12 4a8 8 0 0 0-6.9 12L4 20l4.2-1.1A8 8 0 1 0 12 4zm4.4 11.2c-.2.5-1 .9-1.4 1-.4 0-.8.2-2.6-.6-2.2-.9-3.6-3.1-3.7-3.2-.1-.2-.9-1.2-.9-2.3s.6-1.6.8-1.8c.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4.2.5.6 1.6.7 1.7.1.1.1.3 0 .4-.1.2-.2.3-.3.5l-.2.2c-.1.1-.2.2-.1.4.1.2.6 1 1.3 1.6.9.8 1.6 1 1.8 1.1.2.1.3.1.4-.1.1-.1.5-.6.6-.8.2-.2.3-.2.5-.1.2.1 1.4.7 1.6.8.2.1.4.2.4.3.1.2 0 .6-.2 1.1z" },
  { label: "Spotify", href: "https://open.spotify.com/intl-tr/artist/1nN7GCD0CwRGvA7q7po2Hm", path: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.5 14.4a.7.7 0 0 1-1 .2c-2.6-1.6-5.9-2-9.7-1.1a.7.7 0 0 1-.4-1.3c4.2-1 7.8-.5 10.7 1.2a.7.7 0 0 1 .4 1zm1.3-2.9a.9.9 0 0 1-1.2.3c-3-1.8-7.6-2.4-11.1-1.3a.9.9 0 0 1-.5-1.7c4-.1 8.4.6 11.6 1.5.5.2.6.8.2 1.2zm.1-3a1 1 0 0 1-1.4.3C13.2 8.4 8 8.1 4.6 9.2a1 1 0 1 1-.6-1.9c3.9-1.2 9.7-.9 13.4 1.1a1 1 0 0 1 .5 1.1z" },
];

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const columns = [
    { title: dict.footer.buyers, links: dict.footerLinks.buyers },
    { title: dict.footer.info, links: dict.footerLinks.info },
    { title: dict.footer.company, links: dict.footerLinks.company },
  ];

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h3>{dict.footer.social}</h3>
            <div className="socials">
              {socials.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={item.path} /></svg>
                </a>
              ))}
            </div>
            <p style={{ marginTop: 16 }}>{dict.footer.appTitle}</p>
            <div className="store-badges">
              <a href="https://play.google.com/store/apps/details?id=com.bakuelectronics" target="_blank" rel="noreferrer" aria-label="Google Play">
                <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Google Play" />
              </a>
              <a href="https://apps.apple.com/us/app/baku-electronics/id6444839980" target="_blank" rel="noreferrer" aria-label="App Store">
                <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" alt="App Store" />
              </a>
            </div>
            <a className="call" href="tel:143">{dict.footer.call}</a>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map((link) => (
                <Link key={link.href} href={withLocale(locale, link.href)}>{link.label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="legal">
          <span>{dict.footer.copyright}</span>
          <Link href={withLocale(locale, "/mexfilik-siyaseti")}>{dict.footer.privacy}</Link>
        </div>
      </div>
    </footer>
  );
}
