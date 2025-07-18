import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Ensure JSX runtime is set correctly
      jsxImportSource: undefined
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://protoagenthub-vpej--3001--96435430.local-credentialless.webcontainer.io',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})