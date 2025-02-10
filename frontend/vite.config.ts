import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      port: 3000,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
    publicDir: 'public',
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    define: {
      'process.env': env
    }
  }
})
