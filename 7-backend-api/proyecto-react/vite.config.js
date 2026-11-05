import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Convierte una ruta relativa a este archivo en una ruta absoluta
const ruta = (carpeta) => fileURLToPath(new URL(carpeta, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Alias: en vez de '../../components/Header.jsx' se escribe '@components/Header.jsx'
    alias: {
      '@': ruta('./src'),
      '@components': ruta('./src/components'),
      '@pages': ruta('./src/pages'),
      '@styles': ruta('./src/styles'),
      '@data': ruta('./src/data'),
      '@assets': ruta('./src/assets'),
      '@api': ruta('./src/api'),
      '@utils': ruta('./src/utils'),
    },
  },
  server: {
    // json-server reescribe db.json cada vez que cambia el carrito:
    // se ignora para que Vite no recargue la página por eso
    watch: {
      ignored: ['**/src/data/db.json'],
    },
  },
})
