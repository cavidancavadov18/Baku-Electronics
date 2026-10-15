const js = await (await fetch("https://bakuelectronics.az/_next/static/chunks/pages/index-84ff8f7ce2af8cc1.js")).text();
const hits = js.match(/https?:\/\/[^"'` ]{8,80}/g) || [];
console.log([...new Set(hits)].slice(0, 40).join("\n"));
const keys = [...js.matchAll(/\/api\/[a-zA-Z0-9_\/-]{3,40}/g)].map((m) => m[0]);
console.log("API", [...new Set(keys)].slice(0, 30).join("\n"));
console.log("len", js.length);
