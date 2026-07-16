import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
    },
  },
  server: {
    fs: {
      // allow importing the /shared content directory that lives one
      // level above the client project root
      allow: ['..'],
    },
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})
