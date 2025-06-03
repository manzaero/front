import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
    proxy: {
      '/products': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/categories': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/register': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/logout': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/login': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/cart': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})
