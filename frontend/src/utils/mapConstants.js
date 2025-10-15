/**
 * Constantes del mapa - Ventanas iluminadas y configuración visual
 * @module mapConstants
 */

import { TILE_SIZE } from './mapConfig';

/**
 * Coordenadas de ventanas iluminadas para efecto nocturno
 * Cada objeto representa una ventana con su posición y tamaño
 */
export const VENTANAS_ILUMINADAS = [
  // === EDIFICIOS GRANDES - Zona superior derecha ===
  // VENTANA simple (tile 418)
  { x: 8, y: 2, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 8, y: 4, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 12, y: 2, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 12, y: 4, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 15, y: 3, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 20, y: 3, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 17, y: 2, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
{ x: 39, y: 2, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
{ x: 44, y: 4, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
{ x: 32, y: 2, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
{ x: 36, y: 2, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 22, y: 15, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 19, y: 15, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 42, y: 14, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 7, y: 15, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 8, y: 15, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 9, y: 15, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 1, y: 13, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 6, y: 28, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
 
  { x: 37, y: 25, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 38, y: 25, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 41, y: 25, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
  { x: 42, y: 25, width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8 },
]
/**
 * Configuración de cámara y viewport
 */
export const getCameraConfig = (windowWidth, windowHeight, mapWidth, mapHeight, tileSize) => {
  const viewportWidth = Math.min(Math.floor(windowWidth / tileSize), mapWidth);
  const viewportHeight = Math.min(Math.floor(windowHeight / tileSize), mapHeight);
  const finalViewportWidth = Math.min(viewportWidth, mapWidth);
  const finalViewportHeight = Math.min(viewportHeight, mapHeight);
  const viewportPixelWidth = finalViewportWidth * tileSize;
  const viewportPixelHeight = finalViewportHeight * tileSize;
  
  return {
    viewportWidth: finalViewportWidth,
    viewportHeight: finalViewportHeight,
    viewportPixelWidth,
    viewportPixelHeight,
    maxOffsetX: Math.max(0, mapWidth * tileSize - viewportPixelWidth),
    maxOffsetY: Math.max(0, mapHeight * tileSize - viewportPixelHeight)
  };
};

/**
 * Calcula el offset de la cámara centrado en el avatar
 */
export const calculateCameraOffset = (avatar, cameraConfig, tileSize) => {
  const { viewportWidth, viewportHeight, maxOffsetX, maxOffsetY } = cameraConfig;
  
  let rawOffsetX = avatar.x * tileSize - Math.floor(viewportWidth / 2) * tileSize;
  let rawOffsetY = avatar.y * tileSize - Math.floor(viewportHeight / 2) * tileSize;
  
  // Clamp y alinear a múltiplo de TILE_SIZE
  rawOffsetX = Math.max(0, Math.min(rawOffsetX, maxOffsetX));
  rawOffsetY = Math.max(0, Math.min(rawOffsetY, maxOffsetY));
  
  // Redondear los offsets al múltiplo más cercano de TILE_SIZE
  return {
    x: Math.round(rawOffsetX / tileSize) * tileSize,
    y: Math.round(rawOffsetY / tileSize) * tileSize
  };
};
