import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/todos': {
        target: 'https://localhost:7164',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
