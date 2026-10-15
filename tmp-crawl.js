const fs = require("fs");
const https = require("https");

const raw = JSON.parse(fs.readFileSync("C:/Users/Cavadov/.cursor/browser-logs/cdp-response-Runtime.evaluate-2026-10-08T18-49-47-282Z.json", "utf8"));
const paths = (raw.result?.value || raw.value || []).filter((h) => typeof h === "string" && h.startsWith("/catalog/"));
const unique = [...new Set(paths.map((h) => h.replace(/\/$/, "")))];
const leaves = unique.filter((h) => !unique.some((other) => other !== h && other.startsWith(h + "/")));
console.log("paths", unique.length, "leaves", leaves.length);
fs.writeFileSync("tmp-leaves.json", JSON.stringify(leaves, null, 2));

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "az" } }, (res) => {
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
    req.setTimeout(30000, () => req.destroy(new Error("timeout " + url)));
  });
}

function parse(html) {
  const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) return null;
  const data = JSON.parse(m[1]);
  const box = data.props?.pageProps?.products;
  if (!box?.products?.items) return null;
  return {
    name: box.pageName || "",
    total: box.products.total || 0,
    page: box.products.page || 1,
    items: box.products.items,
  };
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

const brandWords = ["Samsung", "Apple", "Xiaomi", "Bosch", "LG", "Beko", "Midea", "Philips", "Tefal", "Sony", "Lenovo", "ASUS", "HP", "Honor", "HONOR", "Haier", "TCL", "Dreame", "Karcher", "DeLonghi", "Ardesto", "Yoshiro", "Immergas", "Gefest", "Rowenta", "Braun", "Dyson", "Ninja", "Sencor", "Fakir", "Uğur", "DemirDokum", "Oasis", "Shark", "Kenwood", "Panasonic", "Hitachi", "Gorenje", "Indesit", "Arcelik", "Vestel", "Hoffmann", "Canon", "Nikon", "JBL", "Marshall", "Huawei", "Realme", "Poco", "Infinix", "Tecno", "Oppo", "Vivo", "Nothing"];

function brandOf(name) {
  const hit = brandWords.find((b) => name.toLowerCase().includes(b.toLowerCase()));
  return hit || name.split(" ").slice(0, 2).join(" ");
}

async function mapPool(list, limit, worker) {
  const out = new Array(list.length);
  let cursor = 0;
  async function run() {
    while (cursor < list.length) {
      const i = cursor++;
      out[i] = await worker(list[i], i);
    }
  }
  await Promise.all(Array.from({ length: limit }, run));
  return out;
}

(async () => {
  const seen = new Set();
  const rows = [];
  const categories = [];
  let pages = 0;
  let fails = 0;

  await mapPool(leaves, 6, async (path) => {
    const slug = path.replace("/catalog/", "").replace(/\//g, "--");
    let page = 1;
    let total = 0;
    let name = slug;
    let count = 0;
    while (page < 160) {
      const url = `https://bakuelectronics.az/az${path}?page=${page}`;
      let parsed = null;
      try {
        const res = await get(url);
        parsed = res.status === 200 ? parse(res.text) : null;
      } catch (err) {
        fails++;
      }
      pages++;
      if (!parsed || !parsed.items.length) break;
      total = parsed.total;
      name = parsed.name || name;
      for (const item of parsed.items) {
        if (!item?.slug || seen.has(item.product_code)) continue;
        seen.add(item.product_code);
        const price = Number(item.discounted_price || item.price || 0);
        const oldPrice = Number(item.price || price);
        rows.push({
          id: "c" + item.product_code,
          slug: item.slug,
          category: slug,
          brand: brandOf(item.name || ""),
          price,
          oldPrice: oldPrice > price ? oldPrice : Math.round(price * 1.08 * 100) / 100,
          months: item.perMonth?.month || 12,
          rating: Math.max(1, Math.round(item.rate || 5)),
          reviews: item.reviewCount || 0,
          code: String(item.product_code),
          name: item.name || item.slug,
          image: item.image || "",
        });
        count++;
      }
      if (page * 18 >= total) break;
      page++;
    }
    if (count) categories.push({ slug, group: groupOf(path), name, path, count });
    if (categories.length % 8 === 0) {
      fs.writeFileSync("data/live-catalog.json", JSON.stringify({ categories, products: rows }));
      console.log("cats", categories.length, "products", rows.length, "pages", pages, "fails", fails);
    }
  });

  fs.writeFileSync("data/live-catalog.json", JSON.stringify({ categories, products: rows }));
  console.log("DONE cats", categories.length, "products", rows.length, "pages", pages, "fails", fails);
})();
