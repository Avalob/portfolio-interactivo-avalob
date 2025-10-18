import { useCallback } from 'react';
import { WIDTH, HEIGHT } from '../utils/tiledMapData';

/**
 * Hook para detección de colisiones en el mapa
 * Verifica si una posición es caminable considerando:
 * - Límites del mapa
 * - Objetos de colisión
 * - Vehículos
 * - NPCs
 */
export function useCollisionDetection({
  COLLISION_OBJECTS,
  carsPositionsRef,
  npc,
  obrero,
  fernando,
  pedro
}) {
  const canWalk = useCallback((x, y, checkNPCs = true) => {
    // Verificar límites del mapa
    if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) return false;

    // El mapa base es transitable; bloqueamos únicamente los elementos superpuestos
    const hasCollision = COLLISION_OBJECTS.some(obj => obj.x === x && obj.y === y);
    if (hasCollision) return false;

    // Comprobamos ocupación por vehículos, que ocupan dos tiles según su orientación
    const hasCarCollision = carsPositionsRef.current.some(car => {
      if (!car.isActive) return false;
      
      // Verificar tile principal del coche
      if (car.x === x && car.y === y) return true;
      
      // Si el coche está en orientación horizontal (left o right), verificar el segundo tile
      if (car.direction === 'left' || car.direction === 'right') {
        const secondTileX = car.direction === 'right' ? car.x + 1 : car.x - 1;
        if (secondTileX === x && car.y === y) return true;
      }
      
      // Si el coche está en orientación vertical (up o down), verificar el segundo tile
      if (car.direction === 'up' || car.direction === 'down') {
        const secondTileY = car.direction === 'down' ? car.y + 1 : car.y - 1;
        if (car.x === x && secondTileY === y) return true;
      }
      
      return false;
    });
    if (hasCarCollision) return false;
    
    // Evitamos superposición con NPC activos
    if (checkNPCs) {
      if ((npc.x === x && npc.y === y) || 
          (obrero.x === x && obrero.y === y) || 
          (fernando.x === x && fernando.y === y) ||
          (pedro.x === x && pedro.y === y)) {
        return false;
      }
    }
    
    return true;
  }, [COLLISION_OBJECTS, carsPositionsRef, npc.x, npc.y, obrero.x, obrero.y, fernando.x, fernando.y, pedro.x, pedro.y]);

  return { canWalk };
}
