import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: true,
  outDir: 'lib',
  tsconfig: 'tsconfig.build.json',
  target: ['es5', 'es6', 'es2022', 'esnext', 'node16', 'node18', 'node20'],
});
