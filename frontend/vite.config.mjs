
// ============================================================
// 1. IMPORTACIONES Y PLUGINS
// ============================================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ============================================================
// 2. CONFIGURACIÓN PRINCIPAL DE VITE
// ============================================================

export default defineConfig({
  // Plugins principales utilizados en el proyecto (React)
  plugins: [react()],

  // ============================================================
  // 3. CONFIGURACIÓN DE BASE SEGÚN ENTORNO
  // ============================================================

  // Define la ruta base para despliegue en GitHub Pages o desarrollo local
  base: process.env.NODE_ENV === 'production' ? '/portfolio-interactivo-avalob/' : '/',

  // ============================================================
  // 4. CONFIGURACIÓN DEL SERVIDOR DE DESARROLLO
  // ============================================================

  server: {
    port: 5173, // Puerto local para desarrollo
    open: false, // No abrir navegador automáticamente
  },

  // ============================================================
  // 5. OPCIONES DE COMPILACIÓN Y OPTIMIZACIÓN
  // ============================================================

  build: {
    target: 'esnext', // Objetivo de compilación moderno
    minify: 'terser', // Minificación avanzada con Terser
    sourcemap: false, // No generar sourcemaps en producción

    // Configuración avanzada de Rollup para dividir bundles
    rollupOptions: {
      output: {
        manualChunks: {
          // Separa React y framer-motion en bundles independientes para mejor caché
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
        },
      },
    },

    // Opciones de Terser para limpiar el código en producción
    terserOptions: {
      compress: {
        drop_console: true,   // Elimina todos los console.log en producción
        drop_debugger: true,  // Elimina los debugger
      },
    },

    chunkSizeWarningLimit: 1000, // Límite de advertencia para tamaño de chunks
  },

  // ============================================================
  // 6. OPTIMIZACIÓN DE DEPENDENCIAS
  // ============================================================

  optimizeDeps: {
    // Incluye dependencias clave para optimizar el arranque en desarrollo
    include: ['react', 'react-dom', 'framer-motion'],
  },

});

