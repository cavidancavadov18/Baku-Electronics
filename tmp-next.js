const fs = require("fs");
const https = require("https");
function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "az" } }, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    }).on("error", reject);
  });
}
(async () => {
  const html = await get("https://bakuelectronics.az/az/catalog/boyuk-meiset-texnikasi/soyuducular");
  fs.writeFileSync("tmp-soy.html", html);
  const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  console.log("next", !!m, "html", html.length);
  if (!m) {
    const keys = [...html.matchAll(/products|pageCount|total/gi)].slice(0, 10).map((x) => x[0]);
    console.log("keys", keys);
    return;
  }
  const data = JSON.parse(m[1]);
  const props = data.props?.pageProps || {};
  console.log("pageProps keys", Object.keys(props));
  const text = JSON.stringify(props).slice(0, 500);
  console.log(text);
})();
