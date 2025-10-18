/**
 * Configuración de iluminación del mapa
 * Ventanas iluminadas y sombras de edificios
 */

import { TILE_SIZE } from './mapConfig';

/**
 * Ventanas iluminadas en modo noche
 * @type {Array<{x: number, y: number, width: number, height: number}>}
 */
export const VENTANAS_ILUMINADAS = [
  // Edificio izquierdo
  { x: 8, y: 2, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 8, y: 3, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 8, y: 4, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  
  // Edificio central superior
  { x: 10, y: 4, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 12, y: 2, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 12, y: 3, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 12, y: 4, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 14, y: 3, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 15, y: 3, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 16, y: 2, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 17, y: 2, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 17, y: 3, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 18, y: 2, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 19, y: 3, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 20, y: 3, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  
  // Edificio zona media
  { x: 1, y: 14, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 2, y: 16, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 20, y: 16, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 21, y: 16, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  
  // Edificio derecho superior
  { x: 32, y: 2, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 32, y: 3, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 34, y: 4, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 36, y: 2, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 36, y: 3, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 38, y: 3, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 43, y: 3, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  
  // Edificio zona inferior
  { x: 42, y: 13, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  // Replica en nueva posición
  { x: 46, y: 25, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 }
];

/**
 * Sombras de edificios en modo día
 * @type {Array<{x: number, y: number, width: number, height: number}>}
 */
export const SOMBRAS_EDIFICIOS = [
  { x: 5, y: 4, width: TILE_SIZE * 5, height: TILE_SIZE * 2 },
  { x: 14, y: 4, width: TILE_SIZE * 7, height: TILE_SIZE * 2 },
  { x: 30, y: 4, width: TILE_SIZE * 5, height: TILE_SIZE * 2 },
  { x: 39, y: 4, width: TILE_SIZE * 5, height: TILE_SIZE * 2 }
];
