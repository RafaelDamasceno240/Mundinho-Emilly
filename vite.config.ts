import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `base: './'` faz o site funcionar em qualquer endereço
// (Vercel, Netlify, GitHub Pages em subpasta etc.).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
