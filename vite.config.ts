import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { manifestPlugin } from '@journals/lib-manifest/vite-plugin'

export default defineConfig({
  plugins: [vue(), manifestPlugin()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'remoteEntry',
    },
    rollupOptions: {
      // external: ['vue'],
    },
  },
  server: { port: 3003 },
  preview: {
    port: 3003,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
})
