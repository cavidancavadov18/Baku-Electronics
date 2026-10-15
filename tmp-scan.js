const fs = require("fs");
const https = require("https");
function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    }).on("error", reject);
  });
}
(async () => {
  const url = "https://bakuelectronics.az/_next/static/chunks/pages/catalog/%5B...slug%5D-d6da9697ad1deee9.js";
  const s = await get(url);
  fs.writeFileSync("tmp-cat.js", s);
  const hits = [...s.matchAll(/["']([^"']{0,80}(?:api|graphql|products|catalog)[^"']{0,80})["']/gi)].map((m) => m[1]);
  const uniq = [...new Set(hits)].filter((h) => !h.includes("node_modules") && h.length < 160);
  console.log(uniq.slice(0, 60).join("\n"));
  console.log("LEN", s.length);
})();
