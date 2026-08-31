import { defineConfig } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";

export default defineConfig({
  input: "src/index.ts",
  output: {
    file: "index.js",
    format: "cjs",
    exports: "default",
  },
  external: ["@vendetta/metro", "@vendetta/patcher"],
  plugins: [
    nodeResolve(),
    commonjs(),
    esbuild({
      target: "es2021",
      minify: false,
    }),
  ],
});
