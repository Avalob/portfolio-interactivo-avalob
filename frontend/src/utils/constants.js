/**
 * Constantes globales de la aplicación
 * Centraliza valores utilizados en múltiples lugares
 */

// Colores del tema
export const COLORS = {
  SKY_BLUE: '#7ec0ee',
  RETRO_GREEN: '#0f380f',
  MODAL_BACKDROP: 'rgba(0, 0, 0, 0.6)',
};

// Configuración de la aplicación
export const APP_CONFIG = {
  TITLE: 'Portfolio Interactivo',
  VERSION: '1.0.0',
  AUTHOR: 'Tu Nombre',
};

// URLs de la API (para futuro uso)
export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  PROJECTS: '/projects',
  PROGRESS: '/progress',
};

// Z-index layers para controlar superposición de elementos
export const Z_INDEX = {
  BASE: 1,
  TILES: 10,
  EFFECTS: 25,
  OBJECTS: 40,
  MODALS: 50,
  MODAL_BACKDROP: 99,
  MODAL_CONTENT: 100,
};
