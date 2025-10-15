/**
 * Hook personalizado para gestionar el movimiento del jugador con teclado
 * @module usePlayerMovement
 */

import { useEffect, useState, useCallback } from 'react';

/**
 * Hook para gestionar movimiento del jugador con teclado
 * @param {Object} params - Parámetros de configuración
 * @param {Object} params.avatar - Estado actual del avatar
 * @param {Function} params.setAvatar - Función para actualizar avatar
 * @param {Function} params.canWalk - Función para validar si una posición es caminable
 * @param {boolean} params.enEdificio - Si el jugador está dentro de un edificio
 * @param {number} params.mapWidth - Ancho del mapa
 * @param {number} params.mapHeight - Alto del mapa
 * @param {Function} params.onMove - Callback cuando el jugador se mueve
 * @param {number} params.moveSpeed - Velocidad de movimiento en ms (por defecto 80)
 */
export const usePlayerMovement = ({
  avatar,
  setAvatar,
  canWalk,
  enEdificio,
  mapWidth,
  mapHeight,
  onMove,
  moveSpeed = 80
}) => {
  const [keysPressed, setKeysPressed] = useState(new Set());

  useEffect(() => {
    if (enEdificio) return;

    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        if (e.repeat) return; // Ignorar eventos repetidos
        
        setKeysPressed(prev => new Set(prev).add(e.key));
        
        if (onMove) onMove();
      }
    };

    const handleKeyUp = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        setKeysPressed(prev => {
          const newSet = new Set(prev);
          newSet.delete(e.key);
          return newSet;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [enEdificio, onMove]);

  // Movimiento continuo
  useEffect(() => {
    if (keysPressed.size === 0 || enEdificio) return;

    const moveInterval = setInterval(() => {
      let dx = 0, dy = 0, dir = avatar.dir;

      if (keysPressed.has("ArrowUp")) { dy = -1; dir = "up"; }
      else if (keysPressed.has("ArrowDown")) { dy = 1; dir = "down"; }
      else if (keysPressed.has("ArrowLeft")) { dx = -1; dir = "left"; }
      else if (keysPressed.has("ArrowRight")) { dx = 1; dir = "right"; }

      setAvatar(prev => {
        const nextX = Math.max(0, Math.min(mapWidth - 1, prev.x + dx));
        const nextY = Math.max(0, Math.min(mapHeight - 1, prev.y + dy));

        if (canWalk(nextX, nextY)) {
          if (onMove) onMove();
          return {
            ...prev,
            x: nextX,
            y: nextY,
            dir,
            step: (prev.step + 1) % 3
          };
        }
        return { ...prev, dir };
      });
    }, moveSpeed);

    return () => clearInterval(moveInterval);
  }, [keysPressed, enEdificio, avatar.dir, mapWidth, mapHeight, canWalk, setAvatar, onMove, moveSpeed]);
};

/**
 * Hook para gestionar atajos de teclado adicionales
 * @param {Object} params - Parámetros de configuración
 * @param {boolean} params.enEdificio - Si está en un edificio
 * @param {Function} params.onToggleMenu - Toggle del menú de navegación
 * @param {Function} params.onCloseBuilding - Cerrar edificio actual
 */
export const useKeyboardShortcuts = ({
  enEdificio,
  onToggleMenu,
  onCloseBuilding
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle menú con "M"
      if ((e.key === "m" || e.key === "M") && !enEdificio) {
        e.preventDefault();
        if (onToggleMenu) onToggleMenu();
      }

      // Cerrar edificio con ESC o X
      if ((e.key === "Escape" || e.key === "x" || e.key === "X") && enEdificio) {
        if (onCloseBuilding) onCloseBuilding();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enEdificio, onToggleMenu, onCloseBuilding]);
};

/**
 * Hook para resetear el step del avatar cuando no se mueve
 * @param {Object} avatar - Estado del avatar
 * @param {Function} setAvatar - Setter del avatar
 */
export const useResetAvatarStep = (avatar, setAvatar) => {
  useEffect(() => {
    if (!avatar.moving && avatar.step !== 0) {
      setAvatar(prev => ({ ...prev, step: 0 }));
    }
  }, [avatar.moving, avatar.step, setAvatar]);
};
