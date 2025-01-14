import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"

export default defineConfig({
  base: '/SafeEyes/',
  plugins: [
    react(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  preview: {
    port: 8080,
    strictPort: true,
   },
  build: {
    sourcemap: true,
  }
})
