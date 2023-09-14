import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/admin',
  server: {
    host: '0.0.0.0',
    port: 8091,
    strictPort: true,
    watch: {
      ignored: '**/node_modules',
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '!': fileURLToPath(new URL('./', import.meta.url))
    }
  },
  build: {
    minify: true,
    sourcemap: true,
    chunkSizeWarningLimit: 1000
  }
})