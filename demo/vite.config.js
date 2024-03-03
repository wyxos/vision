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
    alias: {
      '@': path.join(__dirname, '../src'),
      '@frontend': path.join(__dirname, '../src/frontend'),
      '@components': path.join(__dirname, '../src/frontend/components'),
      '@utilities': path.join(__dirname, '../src/frontend/utilities'),
      '@cli': path.join(__dirname, '../src/cli'),
      '@commands': path.join(__dirname, '../src/cli/commands')
    },
    dedupe: ['vue', 'moment']
  },
  build: {
    sourcemap: true,
    outDir: '../dist',
    lib: {
      entry: path.resolve(__dirname, '../src/frontend/main.js'),
      name: 'Vision',
      // the proper extensions will be added
      fileName: 'vision'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'axios', 'moment', '@oruga-ui/oruga-next'],
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
