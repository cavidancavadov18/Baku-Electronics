const js = await (await fetch("https://bakuelectronics.az/_next/static/chunks/7714-04bcb32ee8d410e6.js")).text();
const urls = [...js.matchAll(/["'`](\/?[a-zA-Z0-9_\-\/]{4,60})["'`]/g)]
  .map((m) => m[1])
  .filter((s) => /product|search|catalog|invent|category|filter/i.test(s));
console.log([...new Set(urls)].slice(0, 80).join("\n"));
