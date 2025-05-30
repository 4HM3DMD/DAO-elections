import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3001, // Use a different port to avoid conflict with the main app
  },
  preview: {
    port: 4173, // Default Vite preview port
    strictPort: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'dao-elections.onrender.com' // Add your Render domain here
    ]
  }
}) 