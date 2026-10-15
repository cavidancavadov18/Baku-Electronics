const fs = require("fs");
const https = require("https");
const agent = new https.Agent({ keepAlive: true, maxSockets: 32 });

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { agent, headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "az" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        const next = res.headers.location.startsWith("http") ? res.headers.location : new URL(res.headers.location, url).href;
        get(next).then(resolve, reject);
        return;
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve({ status: res.statusCode || 0, text: Buffer.concat(chunks).toString("utf8") }));
    });
    req.on("error", reject);
    req.setTimeout(25000, () => req.destroy(new Error("timeout")));
  });
}

function groupOf(path) {
  const p = path.toLowerCase();
  if (/telefon|smartfon|planset|qulaqliq|saat|apple-watch|qadcet/.test(p)) return "phones";
  if (/notbuk|komputer|monitor|printer|noutbuk/.test(p)) return "computers";
  if (/tv-audio|televizor|audio|kamera/.test(p)) return "tv";
  if (/boyuk-meiset/.test(p)) return "big";
  if (/kicik-meiset/.test(p) && /metbex|yemek|qehve|sire|caydan|blender|mikser/.test(p)) return "kitchen";
  if (/kicik-meiset/.test(p)) return "small";
  if (/iqlim|qizdirici|kondisioner|kombi/.test(p)) return "climate";
  if (/gozellik|fen|sac-|epilya|trimmer/.test(p)) return "care";
  return "more";
}

async function mapPool(list, limit, worker) {
  let cursor = 0;
  async function run() {
    while (cursor < list.length) {
      const i = cursor++;
      await worker(list[i], i);
    }
  }
  await Promise.all(Array.from({ length: limit }, run));
}

(async () => {
  const catalog = JSON.parse(fs.readFileSync("data/live-catalog.json", "utf8"));
  for (const item of catalog.products) {
    if (item.price > 0 && Math.abs(item.oldPrice / item.price - 1.08) < 0.002) item.oldPrice = item.price;
  }
  const seen = new Set(catalog.products.map((p) => String(p.code)));
  const catBySlug = new Map(catalog.categories.map((c) => [c.slug, c]));
  const missing = JSON.parse(fs.readFileSync("tmp-missing.json", "utf8")).filter((slug) => {
    const code = String(slug).split("-").pop();
    return !seen.has(code);
  });
  console.log("already", seen.size, "to fetch", missing.length);
  let done = 0;
  let fails = 0;
  let added = 0;

  function save() {
    const file = "data/live-catalog.json";
    const tmp = "data/live-catalog.tmp.json";
    fs.writeFileSync(tmp, JSON.stringify({ categories: catalog.categories, products: catalog.products }));
    fs.renameSync(tmp, file);
  }

  await mapPool(missing, 24, async (slug) => {
    const url = "https://bakuelectronics.az/az/mehsul/" + encodeURI(slug);
    let html = "";
    let status = 0;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await get(url);
        status = res.status;
        html = res.text;
        if (status === 200 && html.includes("__NEXT_DATA__")) break;
      } catch (err) {
        status = 0;
      }
    }
    done++;
    if (status !== 200) {
      fails++;
    } else {
      const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
      if (!m) fails++;
      else {
        try {
          const d = JSON.parse(m[1]).props?.pageProps?.prodDetails;
          const code = String(d?.productCode || "");
          const image = Array.isArray(d?.images) ? d.images.find(Boolean) : "";
          const price = Number(d?.price || 0);
          if (d?.slug && code && image && price > 0 && !seen.has(code)) {
            seen.add(code);
            const crumbs = (d.breadcrumb || []).filter((b) => b && b.slug);
            const catSlug = crumbs.map((b) => b.slug).join("--") || "diger";
            const path = "/catalog/" + crumbs.map((b) => b.slug).join("/");
            const sale = price;
            const disc = Number(d.discount || 0);
            const oldPrice = disc > 0 && disc < 90 ? Math.round((sale / (1 - disc / 100)) * 100) / 100 : sale;
            catalog.products.push({
              id: "c" + code,
              slug: d.slug,
              category: catSlug,
              brand: d.brand_name || d.brand || (d.title || "").split(" ").slice(0, 2).join(" "),
              price: sale,
              oldPrice,
              months: d.perMonth?.month || 12,
              rating: Math.max(1, Math.round(Number(d.averageRate) || 5)),
              reviews: Number(d.review_count) || 0,
              code,
              name: d.title || d.slug,
              image,
            });
            if (!catBySlug.has(catSlug)) {
              const cat = {
                slug: catSlug,
                group: groupOf(path),
                name: crumbs.length ? crumbs[crumbs.length - 1].name : "Digər",
                path,
                count: 1,
              };
              catBySlug.set(catSlug, cat);
              catalog.categories.push(cat);
            } else catBySlug.get(catSlug).count++;
            added++;
          } else fails++;
        } catch (err) {
          fails++;
        }
      }
    }
    if (done % 200 === 0) {
      if (done % 400 === 0) save();
      console.log("done", done, "added", added, "fails", fails, "total", catalog.products.length);
    }
  });

  save();
  console.log("DONE added", added, "fails", fails, "total", catalog.products.length);
})();
