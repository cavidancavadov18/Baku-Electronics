const base = "https://5vyra9x.bakuelectronics.az/";
const paths = ["", "api", "products", "search", "graphql", "health", "v1/products", "api/products", "api/search"];
for (const p of paths) {
  try {
    const r = await fetch(base + p, { headers: { accept: "application/json" } });
    const t = await r.text();
    console.log(p || "/", r.status, t.slice(0, 180).replace(/\s+/g, " "));
  } catch (e) {
    console.log(p, e.message);
  }
}
