/**
 * Configuración de Vite para Portfolio Interactivo
 * Optimizado para GitHub Pages y máxima eficiencia
 * @see https://vitejs.dev/config/
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  
  // Base path para GitHub Pages (ajustar según tu repo)
  base: process.env.NODE_ENV === 'production' ? '/portfolio-interactivo-avalob/' : '/',

  
  server: {
    port: 5173,
    open: false,
  },
  
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
        },
      },
    },
    
    terserOptions: {
      compress: {
        drop_console: true,  // Eliminar console.log en producción
        drop_debugger: true,
      },
    },
    
    chunkSizeWarningLimit: 1000,
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
});

