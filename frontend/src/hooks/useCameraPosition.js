import { useMemo } from 'react';
import { TILE_SIZE } from '../utils/mapConfig';

/**
 * Hook para calcular la posición de la cámara centrada en el avatar
 * Maneja los límites del mapa y el viewport
 */
export function useCameraPosition({
  avatar,
  viewportSize,
  MAP_PIXEL_WIDTH,
  MAP_PIXEL_HEIGHT
}) {
  const cameraPosition = useMemo(() => {
    const viewportWidth = viewportSize.width;
    const viewportHeight = viewportSize.height;
    const VIEWPORT_PIXEL_WIDTH = Math.min(viewportWidth, MAP_PIXEL_WIDTH);
    const VIEWPORT_PIXEL_HEIGHT = Math.min(viewportHeight, MAP_PIXEL_HEIGHT);
    const containerWidth = Math.min(viewportWidth, MAP_PIXEL_WIDTH);
    const containerHeight = Math.min(viewportHeight, MAP_PIXEL_HEIGHT);

    // Mantener la cámara centrada en el avatar
    // Centro del avatar en píxeles para mantener la cámara estable
    const avatarCenterX = avatar.x * TILE_SIZE + TILE_SIZE / 2;
    const avatarCenterY = avatar.y * TILE_SIZE + TILE_SIZE / 2;

    let rawOffsetX = avatarCenterX - VIEWPORT_PIXEL_WIDTH / 2;
    let rawOffsetY = avatarCenterY - VIEWPORT_PIXEL_HEIGHT / 2;
    
    // Limitar la cámara para que nunca muestre más allá de los bordes del mapa
    // Si el mapa es más pequeño que el viewport, centrar el mapa
    if (MAP_PIXEL_WIDTH <= VIEWPORT_PIXEL_WIDTH) {
      rawOffsetX = (MAP_PIXEL_WIDTH - VIEWPORT_PIXEL_WIDTH) / 2;
    } else {
      // Limitar offset X para no mostrar más allá de los bordes visibles
      rawOffsetX = Math.max(0, Math.min(rawOffsetX, MAP_PIXEL_WIDTH - VIEWPORT_PIXEL_WIDTH));
    }
    
    // Solo limitar arriba para TopBar (permitir -2 tiles = -72px)
    const TOP_BAR_OFFSET = 2 * TILE_SIZE;
    
    if (MAP_PIXEL_HEIGHT <= VIEWPORT_PIXEL_HEIGHT) {
      rawOffsetY = (MAP_PIXEL_HEIGHT - VIEWPORT_PIXEL_HEIGHT) / 2;
    } else {
      // Limitar offset Y entre el límite superior (TopBar) y el borde inferior del mapa
      rawOffsetY = Math.max(-TOP_BAR_OFFSET, Math.min(rawOffsetY, MAP_PIXEL_HEIGHT - VIEWPORT_PIXEL_HEIGHT));
    }
    
    return {
      cameraOffsetX: rawOffsetX,
      cameraOffsetY: rawOffsetY,
      VIEWPORT_PIXEL_WIDTH,
      VIEWPORT_PIXEL_HEIGHT,
      containerWidth,
      containerHeight
    };
  }, [avatar.x, avatar.y, viewportSize.width, viewportSize.height, MAP_PIXEL_WIDTH, MAP_PIXEL_HEIGHT]);

  return cameraPosition;
}
