import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "src/index.ts",
  output: {
    file: "index.js",
    format: "iife",
    name: "plugin",
    footer: "return plugin.default || plugin;",
    globals: {
      "@vendetta/metro": "vendetta.metro",
      "@vendetta/patcher": "vendetta.patcher",
    },
  },
  external: ["@vendetta/metro", "@vendetta/patcher"],
  plugins: [
    typescript({
      compilerOptions: {
        noEmitOnError: false,
      },
    }),
    {
      name: "swc-eval-wrapper",
      renderChunk(code) {
        // Wraps the IIFE in an immediate function execution so `return` is valid inside React Native eval
        return `(() => {\n${code}\n})();`;
      },
    },
  ],
});
