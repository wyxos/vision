import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  server: {
    port: 3000
  },
  plugins: [vue()],
  resolve: {
    dedupe: ['vue']
  },
  build: {
    outDir: '../dist',
    lib: {
      entry: path.resolve(__dirname, '../src/main.js'),
      name: 'Vision',
      // the proper extensions will be added
      fileName: 'vision'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
