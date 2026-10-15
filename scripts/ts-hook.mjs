export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith(".") && !/\.(ts|js|json|mjs|cjs)$/.test(specifier)) {
    return nextResolve(`${specifier}.ts`, context);
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.endsWith(".json")) {
    const { readFileSync } = await import("node:fs");
    const { fileURLToPath } = await import("node:url");
    const text = readFileSync(fileURLToPath(url), "utf8");
    return { format: "module", source: `export default ${text}`, shortCircuit: true };
  }
  return nextLoad(url, context);
}
