import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

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
    compact: true,
  },
  external: [/^@vendetta\/.*/],
  plugins: [
    typescript({
      compilerOptions: {
        noEmitOnError: false,
      },
    }),
  ],
});
