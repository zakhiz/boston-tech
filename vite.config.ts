import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';


export default defineConfig({
  plugins: [ vue() , tailwindcss()],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',  // Permite popups y mantiene el aislamiento
      'Cross-Origin-Embedder-Policy': 'unsafe-none',           // Solo carga recursos de confianza
    }
  }
});
