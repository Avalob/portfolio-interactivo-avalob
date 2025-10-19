/**
 * Hook personalizado para gestionar el movimiento automático del avatar por pathfinding
 * @module useAutoPathMovement
 */

import { useEffect } from 'react';

/**
 * Hook para mover automáticamente el avatar a lo largo de un camino calculado
 * @param {Object} params - Parámetros de configuración
 */
export function useAutoPathMovement({
  targetPosition,
  pathToTarget,
  setPathToTarget,
  setTargetPosition,
  enEdificio,
  autoPathIntervalMs,
  setAvatar
}) {
  useEffect(() => {
    if (!targetPosition || pathToTarget.length === 0) return;
    if (enEdificio) return; // No mover si está dentro de un edificio
    
      const interval = setInterval(() => {
      setPathToTarget(prevPath => {
        if (prevPath.length === 0) {
          setTargetPosition(null);
          // Resetear step a 0 cuando termina el movimiento automático
          setAvatar(prev => ({ ...prev, step: 0 }));
          return [];
        }
        
        const nextPos = prevPath[0];
        const remainingPath = prevPath.slice(1);
        
        // Mover avatar usando el estado previo para calcular dirección
        setAvatar(prev => {
          // Determinar dirección basándose en la posición actual
          let newDir = prev.dir;
          if (nextPos.x > prev.x) newDir = "right";
          else if (nextPos.x < prev.x) newDir = "left";
          else if (nextPos.y > prev.y) newDir = "down";
          else if (nextPos.y < prev.y) newDir = "up";
          
          return {
            ...prev,
            x: nextPos.x,
            y: nextPos.y,
            dir: newDir,
            step: (prev.step + 1) % 3 // Ciclo completo: 0 → 1 → 2 → 0
          };
        });
        
        return remainingPath;
      });
    }, autoPathIntervalMs); // Ajuste para un desplazamiento más pausado en rutas automáticas, más lento en móvil
    
    return () => {
      clearInterval(interval);
    };
  }, [targetPosition, pathToTarget, enEdificio, autoPathIntervalMs, setPathToTarget, setTargetPosition, setAvatar]);
}
