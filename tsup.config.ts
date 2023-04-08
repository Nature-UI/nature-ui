import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  format: ['cjs', 'esm'],
  outExtension(ctx) {
    return { js: `.${ctx.format}.js` };
  },
  target: 'es2019',
  // inject: process.env.JSX ? [findUpSync("react-shim.js")!] : undefined,
});
