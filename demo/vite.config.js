import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import path from 'path'
import utilityImportPlugin from '../utility-import-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  server: {
    port: 3000
  },
  plugins: [
    utilityImportPlugin(),
    vue(),
    eslint({
      fix: false
    })
  ],
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
      external: ['vue', 'axios', '@oruga-ui/oruga-next'],
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
