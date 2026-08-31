import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "src/index.ts",
  output: {
    file: "index.js",
    format: "iife",
    name: "plugin",
    footer: "module.exports = plugin.default || plugin;",
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
  ],
});
