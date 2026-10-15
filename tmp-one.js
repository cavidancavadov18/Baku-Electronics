const https = require("https");
function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });
    req.on("error", reject);
  });
}
(async () => {
  const html = await get("https://bakuelectronics.az/az/mehsul/simsiz-sarj-cihazi-magssory-fold-pro-3-in-1-wch063p-with-magnetic-qi2-ve-magsafe-desteyi-ile-black-17813303-232786");
  const missing = require("./tmp-missing.json");
  const slug = missing.find((s) => s.includes("232786"));
  const html2 = await get("https://bakuelectronics.az/az/mehsul/" + slug);
  const d = JSON.parse(html2.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)[1]).props.pageProps.prodDetails;
  console.log(slug);
  console.log(JSON.stringify({ price: d.price, discount: d.discount, perMonth: d.perMonth, extra: d.extra }, null, 2).slice(0, 1500));
})();
