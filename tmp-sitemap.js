const https = require("https");
const fs = require("fs");
const zlib = require("zlib");

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0", "Accept-Encoding": "gzip" } }, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        let buf = Buffer.concat(chunks);
        if (res.headers["content-encoding"] === "gzip") buf = zlib.gunzipSync(buf);
        resolve({ status: res.statusCode, text: buf.toString("utf8") });
      });
    });
    req.on("error", reject);
  });
}

(async () => {
  const known = new Set(JSON.parse(fs.readFileSync("data/live-catalog.json", "utf8")).products.map((p) => p.slug));
  let mehsul = 0;
  let catalog = 0;
  let other = 0;
  const missing = [];
  const catalogPaths = new Set();
  for (let i = 0; i < 7; i++) {
    const sm = await get(`https://bakuelectronics.az/sitemap-${i}.xml`);
    const locs = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    console.log("file", i, "status", sm.status, "locs", locs.length, "sample", locs[0]);
    for (const loc of locs) {
      const u = new URL(loc);
      if (u.pathname.includes("/mehsul/")) {
        mehsul++;
        const slug = decodeURIComponent(u.pathname.split("/mehsul/")[1] || "").replace(/\/$/, "");
        if (slug && !known.has(slug)) missing.push(slug);
      } else if (u.pathname.includes("/catalog/")) {
        catalog++;
        catalogPaths.add(u.pathname.replace(/\/$/, ""));
      } else other++;
    }
  }
  console.log({ mehsul, catalog, other, missing: missing.length, catalogPaths: catalogPaths.size });
  fs.writeFileSync("tmp-missing.json", JSON.stringify(missing));
  fs.writeFileSync("tmp-catalog-paths.json", JSON.stringify([...catalogPaths]));
})();
