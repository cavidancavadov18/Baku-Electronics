const names = [
  "7714-04bcb32ee8d410e6.js",
  "6057-6b5b07e840259341.js",
  "1211-f3e7a807bd4a3eef.js",
  "8117-21f092cf02dc26cc.js",
  "main-a126a7bb5b45cce7.js",
];
for (const n of names) {
  const js = await (await fetch("https://bakuelectronics.az/_next/static/chunks/" + n)).text();
  const i = js.indexOf("5vyra9x");
  console.log(n, js.length, i);
  if (i > -1) console.log(js.slice(Math.max(0, i - 200), i + 400));
}
