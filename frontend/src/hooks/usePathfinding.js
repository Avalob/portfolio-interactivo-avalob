/**
 * Hook personalizado para pathfinding A*
 * Implementa algoritmo A* para encontrar rutas en el mapa
 */
import { useCallback } from 'react';

/**
 * Hook para pathfinding A* 
 * @param {number} WIDTH - Ancho del mapa
 * @param {number} HEIGHT - Alto del mapa
 * @param {Function} canWalk - Función que determina si una posición es caminable
 * @returns {Function} findPath - Función para encontrar camino entre dos puntos
 */
export const usePathfinding = (WIDTH, HEIGHT, canWalk) => {
  const findPath = useCallback((startX, startY, endX, endY) => {
    // Estructura de nodo para A*
    const getKey = (x, y) => `${x},${y}`;
    
    const openSet = [{ x: startX, y: startY, g: 0, h: 0, f: 0, parent: null }];
    const closedSet = new Set();
    const nodes = new Map();
    
    // Función heurística (distancia Manhattan)
    const heuristic = (x, y) => Math.abs(x - endX) + Math.abs(y - endY);
    
    nodes.set(getKey(startX, startY), openSet[0]);
    
    while (openSet.length > 0) {
      // Encontrar nodo con menor f
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift();
      const currentKey = getKey(current.x, current.y);
      
      // Si llegamos al destino, reconstruir el camino
      if (current.x === endX && current.y === endY) {
        const path = [];
        let node = current;
        while (node.parent) {
          path.unshift({ x: node.x, y: node.y });
          node = node.parent;
        }
        return path;
      }
      
      closedSet.add(currentKey);
      
      // Explorar vecinos (4 direcciones)
      const neighbors = [
        { x: current.x + 1, y: current.y },
        { x: current.x - 1, y: current.y },
        { x: current.x, y: current.y + 1 },
        { x: current.x, y: current.y - 1 }
      ];
      
      for (const neighbor of neighbors) {
        const { x, y } = neighbor;
        const neighborKey = getKey(x, y);
        
        // Verificar límites del mapa
        if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) continue;
        
        // Verificar si ya está en closed set
        if (closedSet.has(neighborKey)) continue;
        
        // Verificar si es caminable (excepto el destino)
        if (!(x === endX && y === endY) && !canWalk(x, y)) continue;
        
        const g = current.g + 1;
        const h = heuristic(x, y);
        const f = g + h;
        
        const existingNode = nodes.get(neighborKey);
        
        if (!existingNode || g < existingNode.g) {
          const newNode = { x, y, g, h, f, parent: current };
          nodes.set(neighborKey, newNode);
          
          if (!existingNode) {
            openSet.push(newNode);
          } else {
            // Actualizar nodo existente en openSet
            const index = openSet.findIndex(n => getKey(n.x, n.y) === neighborKey);
            if (index !== -1) {
              openSet[index] = newNode;
            }
          }
        }
      }
      
      // Límite de seguridad (evitar búsquedas infinitas)
      if (closedSet.size > 2000) {
        return null;
      }
    }
    
    // No se encontró camino
    return null;
  }, [WIDTH, HEIGHT, canWalk]);

  return findPath;
};
