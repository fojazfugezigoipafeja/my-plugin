import { defineConfig } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import swc from "@swc/core";

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
      name: "swc",
      async transform(code, id) {
        const result = await swc.transform(code, {
          filename: id,
          jsc: {
            parser: {
              syntax: "typescript",
              tsx: true,
            },
            target: "es5",
          },
        });
        return { code: result.code, map: result.map };
      },
    },
    esbuild({
      minify: true,
    }),
  ],
});
