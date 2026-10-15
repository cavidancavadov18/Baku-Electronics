"use client";

import { useEffect, useState } from "react";
import { AdminFrame } from "@/components/admin/AdminFrame";
import type { Article, Campaign, Store } from "@/data/content";
import type { SiteContent, VideoItem } from "@/lib/site-content";

type Tab = "news" | "stores" | "campaigns" | "banners" | "videos";

type ArticleDraft = {
  index: number;
  slug: string;
  date: string;
  image: string;
  titleAz: string;
  titleRu: string;
  leadAz: string;
  leadRu: string;
  bodyAz: string;
  bodyRu: string;
};

type StoreDraft = {
  index: number;
  id: string;
  city: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
};

type CampaignDraft = {
  index: number;
  slug: string;
  tone: Campaign["tone"];
  until: string;
  image: string;
  titleAz: string;
  titleRu: string;
  textAz: string;
  textRu: string;
};

type VideoDraft = { index: number; id: string; title: string; href: string };

const tabs: { id: Tab; label: string }[] = [
  { id: "news", label: "Xəbərlər" },
  { id: "stores", label: "Mağazalar" },
  { id: "campaigns", label: "Kampaniyalar" },
  { id: "banners", label: "Bannerlər" },
  { id: "videos", label: "YouTube" },
];

function paragraphs(value: string) {
  return value.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
}

export default function AdminContentPage() {
  const [tab, setTab] = useState<Tab>("news");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saved, setSaved] = useState("");
  const [article, setArticle] = useState<ArticleDraft | null>(null);
  const [store, setStore] = useState<StoreDraft | null>(null);
  const [campaign, setCampaign] = useState<CampaignDraft | null>(null);
  const [video, setVideo] = useState<VideoDraft | null>(null);
  const [banner, setBanner] = useState("");

  useEffect(() => {
    fetch("/api/admin/content").then((response) => response.json()).then((data) => {
      if (data.ok) setContent(data.content);
    });
  }, []);

  async function persist(next: SiteContent) {
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    const data = await response.json();
    if (!data.ok) {
      setSaved("Saxlanılmadı. Məcburi xanaları doldurun.");
      return;
    }
    setContent(data.content);
    setSaved("Yadda saxlandı. Saytda görünür.");
  }

  function saveArticle(event: React.FormEvent) {
    event.preventDefault();
    if (!content || !article) return;
    const bodyAz = paragraphs(article.bodyAz);
    const bodyRu = paragraphs(article.bodyRu);
    const nextArticle: Article = {
      slug: article.slug.trim(),
      date: article.date.trim(),
      image: article.image.trim(),
      title: { az: article.titleAz.trim(), ru: article.titleRu.trim() || article.titleAz.trim() },
      lead: { az: article.leadAz.trim(), ru: article.leadRu.trim() || article.leadAz.trim() },
      body: bodyAz.map((az, index) => ({ az, ru: bodyRu[index] || az })),
    };
    if (!nextArticle.slug || !nextArticle.image || !nextArticle.title.az || !nextArticle.lead.az || !nextArticle.body.length) {
      setSaved("Xəbər üçün başlıq, şəkil, giriş və mətn lazımdır.");
      return;
    }
    const articles = [...content.articles];
    const duplicate = articles.some((item, index) => item.slug === nextArticle.slug && index !== article.index);
    if (duplicate) {
      setSaved("Bu ünvan artıq var.");
      return;
    }
    if (article.index >= 0) articles[article.index] = nextArticle;
    else articles.unshift(nextArticle);
    setArticle(null);
    persist({ ...content, articles });
  }

  function saveStore(event: React.FormEvent) {
    event.preventDefault();
    if (!content || !store) return;
    const nextStore: Store = {
      id: store.id.trim() || `store-${Date.now()}`,
      city: { az: store.city.trim(), ru: store.city.trim() },
      name: { az: store.name.trim(), ru: store.name.trim() },
      address: { az: store.address.trim(), ru: store.address.trim() },
      hours: store.hours.trim(),
      phone: store.phone.trim(),
    };
    if (!nextStore.name.az || !nextStore.address.az || !nextStore.city.az || !nextStore.hours || !nextStore.phone) {
      setSaved("Mağaza üçün şəhər, ad, ünvan, saat və telefon lazımdır.");
      return;
    }
    const stores = [...content.stores];
    if (store.index >= 0) stores[store.index] = nextStore;
    else stores.unshift(nextStore);
    setStore(null);
    persist({ ...content, stores });
  }

  function saveCampaign(event: React.FormEvent) {
    event.preventDefault();
    if (!content || !campaign) return;
    const nextCampaign: Campaign = {
      slug: campaign.slug.trim(),
      tone: campaign.tone,
      until: campaign.until.trim(),
      image: campaign.image.trim(),
      title: { az: campaign.titleAz.trim(), ru: campaign.titleRu.trim() || campaign.titleAz.trim() },
      text: { az: campaign.textAz.trim(), ru: campaign.textRu.trim() || campaign.textAz.trim() },
    };
    if (!nextCampaign.slug || !nextCampaign.image || !nextCampaign.title.az || !nextCampaign.text.az || !nextCampaign.until) {
      setSaved("Kampaniya üçün ad, şəkil, mətn və tarix lazımdır.");
      return;
    }
    const campaigns = [...content.campaigns];
    if (campaign.index >= 0) campaigns[campaign.index] = nextCampaign;
    else campaigns.unshift(nextCampaign);
    setCampaign(null);
    persist({ ...content, campaigns });
  }

  function saveVideo(event: React.FormEvent) {
    event.preventDefault();
    if (!content || !video) return;
    const nextVideo: VideoItem = { id: video.id.trim(), title: video.title.trim(), href: video.href.trim() };
    if (!nextVideo.id || !nextVideo.title || !nextVideo.href.startsWith("http")) {
      setSaved("Video üçün kod, başlıq və keçid lazımdır.");
      return;
    }
    const videos = [...content.videos];
    if (video.index >= 0) videos[video.index] = nextVideo;
    else videos.unshift(nextVideo);
    setVideo(null);
    persist({ ...content, videos });
  }

  function openArticle(item?: Article, index = -1) {
    setSaved("");
    setArticle({
      index,
      slug: item?.slug ?? "",
      date: item?.date ?? "",
      image: item?.image ?? "",
      titleAz: item?.title.az ?? "",
      titleRu: item?.title.ru ?? "",
      leadAz: item?.lead.az ?? "",
      leadRu: item?.lead.ru ?? "",
      bodyAz: item?.body.map((part) => part.az).join("\n\n") ?? "",
      bodyRu: item?.body.map((part) => part.ru).join("\n\n") ?? "",
    });
  }

  if (!content) return <AdminFrame><p className="admin-loading">Yüklənir...</p></AdminFrame>;

  return (
    <AdminFrame>
      <h1>Sayt məzmunu</h1>
      <p className="admin-lead">Xəbər, mağaza, kampaniya, ana banner və YouTube videoları saytda birbaşa dəyişir.</p>
      <div className="admin-tabs">
        {tabs.map((item) => (
          <button key={item.id} className={tab === item.id ? "on" : ""} type="button" onClick={() => { setTab(item.id); setSaved(""); }}>{item.label}</button>
        ))}
      </div>
      {saved && <p className="admin-ok">{saved}</p>}

      {tab === "news" && (
        <>
          <button className="admin-add" type="button" onClick={() => openArticle()}>Yeni xəbər</button>
          <table className="admin-table">
            <thead><tr><th>Xəbər</th><th>Tarix</th><th></th></tr></thead>
            <tbody>
              {content.articles.map((item, index) => (
                <tr key={item.slug}>
                  <td>
                    <div className="admin-product">
                      <img src={item.image} alt="" />
                      <strong>{item.title.az}</strong>
                    </div>
                  </td>
                  <td>{item.date}</td>
                  <td className="admin-row-actions">
                    <button type="button" onClick={() => openArticle(item, index)}>Dəyiş</button>
                    <button type="button" onClick={() => { if (confirm("Xəbər silinsin?")) persist({ ...content, articles: content.articles.filter((_, itemIndex) => itemIndex !== index) }); }}>Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === "stores" && (
        <>
          <button className="admin-add" type="button" onClick={() => { setSaved(""); setStore({ index: -1, id: "", city: "Bakı", name: "", address: "", hours: "Hər gün 10:00-dan 21:00-dək", phone: "143" }); }}>Yeni mağaza</button>
          <table className="admin-table">
            <thead><tr><th>Mağaza</th><th>Telefon</th><th></th></tr></thead>
            <tbody>
              {content.stores.map((item, index) => (
                <tr key={item.id}>
                  <td><strong>{item.name.az}</strong><span className="admin-sub">{item.city.az} · {item.address.az}</span></td>
                  <td>{item.phone}</td>
                  <td className="admin-row-actions">
                    <button type="button" onClick={() => { setSaved(""); setStore({ index, id: item.id, city: item.city.az, name: item.name.az, address: item.address.az, hours: item.hours, phone: item.phone }); }}>Dəyiş</button>
                    <button type="button" onClick={() => { if (confirm("Mağaza silinsin?")) persist({ ...content, stores: content.stores.filter((_, itemIndex) => itemIndex !== index) }); }}>Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === "campaigns" && (
        <>
          <button className="admin-add" type="button" onClick={() => { setSaved(""); setCampaign({ index: -1, slug: "", tone: "red", until: "", image: "", titleAz: "", titleRu: "", textAz: "", textRu: "" }); }}>Yeni kampaniya</button>
          <table className="admin-table">
            <thead><tr><th>Kampaniya</th><th>Tarixədək</th><th></th></tr></thead>
            <tbody>
              {content.campaigns.map((item, index) => (
                <tr key={item.slug}>
                  <td>
                    <div className="admin-product">
                      <img src={item.image} alt="" />
                      <strong>{item.title.az}</strong>
                    </div>
                  </td>
                  <td>{item.until}</td>
                  <td className="admin-row-actions">
                    <button type="button" onClick={() => { setSaved(""); setCampaign({ index, slug: item.slug, tone: item.tone, until: item.until, image: item.image, titleAz: item.title.az, titleRu: item.title.ru, textAz: item.text.az, textRu: item.text.ru }); }}>Dəyiş</button>
                    <button type="button" onClick={() => { if (confirm("Kampaniya silinsin?")) persist({ ...content, campaigns: content.campaigns.filter((_, itemIndex) => itemIndex !== index) }); }}>Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === "banners" && (
        <>
          <form className="admin-search" onSubmit={(event) => { event.preventDefault(); if (!banner.trim().startsWith("http")) { setSaved("Banner ünvanı http ilə başlamalıdır."); return; } setBanner(""); persist({ ...content, banners: [banner.trim(), ...content.banners] }); }}>
            <input value={banner} onChange={(event) => setBanner(event.target.value)} placeholder="Banner şəkil ünvanı" />
            <button type="submit">Əlavə et</button>
          </form>
          <div className="admin-banners">
            {content.banners.map((item, index) => (
              <article key={`${item}-${index}`}>
                <img src={item} alt="" />
                <button type="button" onClick={() => persist({ ...content, banners: content.banners.filter((_, itemIndex) => itemIndex !== index) })}>Sil</button>
              </article>
            ))}
          </div>
        </>
      )}

      {tab === "videos" && (
        <>
          <button className="admin-add" type="button" onClick={() => { setSaved(""); setVideo({ index: -1, id: "", title: "", href: "https://www.youtube.com/watch?v=" }); }}>Yeni video</button>
          <table className="admin-table">
            <thead><tr><th>Video</th><th></th></tr></thead>
            <tbody>
              {content.videos.map((item, index) => (
                <tr key={`${item.id}-${index}`}>
                  <td>
                    <div className="admin-product">
                      <img src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`} alt="" />
                      <strong>{item.title}</strong>
                    </div>
                  </td>
                  <td className="admin-row-actions">
                    <button type="button" onClick={() => { setSaved(""); setVideo({ index, ...item }); }}>Dəyiş</button>
                    <button type="button" onClick={() => { if (confirm("Video silinsin?")) persist({ ...content, videos: content.videos.filter((_, itemIndex) => itemIndex !== index) }); }}>Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {article && (
        <div className="admin-modal">
          <form className="wide" onSubmit={saveArticle}>
            <h2>{article.index >= 0 ? "Xəbəri dəyiş" : "Yeni xəbər"}</h2>
            <label>Ünvan<input value={article.slug} onChange={(event) => setArticle({ ...article, slug: event.target.value })} /></label>
            <label>Tarix<input value={article.date} onChange={(event) => setArticle({ ...article, date: event.target.value })} placeholder="09.10.2026" /></label>
            <label>Şəkil ünvanı<input value={article.image} onChange={(event) => setArticle({ ...article, image: event.target.value })} /></label>
            <label>Başlıq<input value={article.titleAz} onChange={(event) => setArticle({ ...article, titleAz: event.target.value })} /></label>
            <label>Başlıq RU<input value={article.titleRu} onChange={(event) => setArticle({ ...article, titleRu: event.target.value })} /></label>
            <label>Giriş<textarea value={article.leadAz} onChange={(event) => setArticle({ ...article, leadAz: event.target.value })} /></label>
            <label>Giriş RU<textarea value={article.leadRu} onChange={(event) => setArticle({ ...article, leadRu: event.target.value })} /></label>
            <label>Mətn<textarea value={article.bodyAz} onChange={(event) => setArticle({ ...article, bodyAz: event.target.value })} /></label>
            <label>Mətn RU<textarea value={article.bodyRu} onChange={(event) => setArticle({ ...article, bodyRu: event.target.value })} /></label>
            <div className="admin-actions">
              <button type="button" onClick={() => setArticle(null)}>Bağla</button>
              <button type="submit">Yadda saxla</button>
            </div>
          </form>
        </div>
      )}

      {store && (
        <div className="admin-modal">
          <form className="wide" onSubmit={saveStore}>
            <h2>{store.index >= 0 ? "Mağazanı dəyiş" : "Yeni mağaza"}</h2>
            <label>Şəhər<input value={store.city} onChange={(event) => setStore({ ...store, city: event.target.value })} /></label>
            <label>Ad<input value={store.name} onChange={(event) => setStore({ ...store, name: event.target.value })} /></label>
            <label>Ünvan<textarea value={store.address} onChange={(event) => setStore({ ...store, address: event.target.value })} /></label>
            <label>İş saatı<input value={store.hours} onChange={(event) => setStore({ ...store, hours: event.target.value })} /></label>
            <label>Telefon<input value={store.phone} onChange={(event) => setStore({ ...store, phone: event.target.value })} /></label>
            <div className="admin-actions">
              <button type="button" onClick={() => setStore(null)}>Bağla</button>
              <button type="submit">Yadda saxla</button>
            </div>
          </form>
        </div>
      )}

      {campaign && (
        <div className="admin-modal">
          <form className="wide" onSubmit={saveCampaign}>
            <h2>{campaign.index >= 0 ? "Kampaniyanı dəyiş" : "Yeni kampaniya"}</h2>
            <label>Ünvan<input value={campaign.slug} onChange={(event) => setCampaign({ ...campaign, slug: event.target.value })} /></label>
            <label>Başlıq<input value={campaign.titleAz} onChange={(event) => setCampaign({ ...campaign, titleAz: event.target.value })} /></label>
            <label>Başlıq RU<input value={campaign.titleRu} onChange={(event) => setCampaign({ ...campaign, titleRu: event.target.value })} /></label>
            <label>Mətn<textarea value={campaign.textAz} onChange={(event) => setCampaign({ ...campaign, textAz: event.target.value })} /></label>
            <label>Mətn RU<textarea value={campaign.textRu} onChange={(event) => setCampaign({ ...campaign, textRu: event.target.value })} /></label>
            <label>Tarixədək<input value={campaign.until} onChange={(event) => setCampaign({ ...campaign, until: event.target.value })} /></label>
            <label>Şəkil ünvanı<input value={campaign.image} onChange={(event) => setCampaign({ ...campaign, image: event.target.value })} /></label>
            <label>Ton
              <select value={campaign.tone} onChange={(event) => setCampaign({ ...campaign, tone: event.target.value as Campaign["tone"] })}>
                <option value="red">Qırmızı</option>
                <option value="navy">Tünd</option>
                <option value="gold">Qızılı</option>
              </select>
            </label>
            <div className="admin-actions">
              <button type="button" onClick={() => setCampaign(null)}>Bağla</button>
              <button type="submit">Yadda saxla</button>
            </div>
          </form>
        </div>
      )}

      {video && (
        <div className="admin-modal">
          <form className="wide" onSubmit={saveVideo}>
            <h2>{video.index >= 0 ? "Videonu dəyiş" : "Yeni video"}</h2>
            <label>YouTube kodu<input value={video.id} onChange={(event) => setVideo({ ...video, id: event.target.value })} /></label>
            <label>Başlıq<input value={video.title} onChange={(event) => setVideo({ ...video, title: event.target.value })} /></label>
            <label>Keçid<input value={video.href} onChange={(event) => setVideo({ ...video, href: event.target.value })} /></label>
            <div className="admin-actions">
              <button type="button" onClick={() => setVideo(null)}>Bağla</button>
              <button type="submit">Yadda saxla</button>
            </div>
          </form>
        </div>
      )}
    </AdminFrame>
  );
}
