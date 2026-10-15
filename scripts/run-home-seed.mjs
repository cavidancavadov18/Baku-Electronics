import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("./ts-hook.mjs", { parentURL: import.meta.url });
await import("./build-home-seed.mjs");
