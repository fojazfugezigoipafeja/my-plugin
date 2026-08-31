import { build } from "esbuild";
import { readFileSync, writeFileSync } from "fs";

const manifest = JSON.parse(readFileSync("manifest.json", "utf-8"));

await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  outfile: "index.js",
  format: "iife",
  globalName: "plugin",
  target: "es2021",
  banner: {
    js: "(() => {",
  },
  footer: {
    js: "return plugin.default || plugin;\n})();",
  },
  external: ["@vendetta/metro", "@vendetta/patcher"],
  minify: false,
});

manifest.main = "index.js";
writeFileSync("manifest.json", JSON.stringify(manifest, null, 2));
