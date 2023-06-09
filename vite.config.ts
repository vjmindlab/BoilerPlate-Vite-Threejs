import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { dependencies } from './package.json';
function renderChunks(deps: Record<string, string>) {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['three'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

export default defineConfig({
  base: './',
  build: {
    outDir: './docs',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['three'],
          vision: ['@mediapipe/tasks-vision'],
        },
      },
    },
  },
  plugins: [
    // input https://www.npmjs.com/package/html-minifier-terser options
    ViteMinifyPlugin({}),
  ],
});
