import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/Env.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ["cjs", "esm"],
  minify: true,
  outDir: "lib",
  tsconfig: "tsconfig.build.json",
  target: ["es2021"],
});
