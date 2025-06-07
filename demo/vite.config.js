import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss(), vue()],
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
      '@demo': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
})
