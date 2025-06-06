import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    vue()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
      '@demo': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000
  }
})
