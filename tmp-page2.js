const https = require("https");
function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve({ status: res.statusCode, text: Buffer.concat(chunks).toString("utf8") }));
    }).on("error", reject);
  });
}
function items(html) {
  const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) return null;
  const data = JSON.parse(m[1]);
  const box = data.props.pageProps.products.products;
  return { total: box.total, page: box.page, n: box.items.length, first: box.items[0]?.name, keys: Object.keys(box.items[0] || {}) };
}
(async () => {
  const a = await get("https://bakuelectronics.az/az/catalog/boyuk-meiset-texnikasi/soyuducular?page=2");
  console.log("status", a.status);
  console.log(items(a.text));
})();
