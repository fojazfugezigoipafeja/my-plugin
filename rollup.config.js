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
    globals: {
      "@vendetta/metro": "vendetta.metro",
      "@vendetta/patcher": "vendetta.patcher",
    },
  },
  external: ["@vendetta/metro", "@vendetta/patcher"],
  plugins: [
    nodeResolve(),
    commonjs(),
    esbuild({
      target: "es2021",
      minify: false,
    }),
    {
      name: "revenge-eval-fix",
      renderChunk(code) {
        // Return the plugin object directly from the eval string
        return `(() => {\n${code}\nreturn plugin.default || plugin;\n})()`;
      },
    },
  ],
});
