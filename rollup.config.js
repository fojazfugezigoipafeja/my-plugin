import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "src/index.ts",
  output: {
    file: "index.js",
    format: "es",
    compact: true,
  },
  plugins: [
    typescript(),
  ],
});
