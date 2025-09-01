import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),
            react()],
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api', // backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix for backend
      },
    }
  },
  css: {
    postcss: './postcss.config.js',
  },
})
