import { defineConfig } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";

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
    nodeResolve(),
    commonjs(),
    {
      name: "revenge-eval-wrap",
      renderChunk(code) {
        return `(() => {\n${code}\n})()`;
      },
    },
    esbuild({
      target: "es2021",
      minify: false,
    }),
  ],
});
