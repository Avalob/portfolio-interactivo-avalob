/**
 * Custom hook para movimiento de NPCs basado en rutas predefinidas
 * Los NPCs siguen una secuencia de acciones (caminar, esperar, mirar)
 */

import { useEffect, useRef } from 'react';
import { MAP, WIDTH, HEIGHT } from '../utils/tiledMapData';
import { NPC_WALKABLE_TILES } from '../utils/mapConfig';

/**
 * Verifica si una casilla es transitable para NPCs
 */
const isWalkable = (x, y) => {
  if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) return false;
  const tileId = MAP[y][x];
  return NPC_WALKABLE_TILES.includes(tileId);
};

/**
 * Obtiene las coordenadas del siguiente paso según la dirección
 */
const getNextPosition = (x, y, direction) => {
  const moves = {
    up: { dx: 0, dy: -1 },
    down: { dx: 0, dy: 1 },
    left: { dx: -1, dy: 0 },
    right: { dx: 1, dy: 0 }
  };
  
  const move = moves[direction];
  return { x: x + move.dx, y: y + move.dy };
};

/**
 * Hook para manejar el movimiento de NPCs con rutas predefinidas
 * 
 * @param {object} npc - Estado del NPC
 * @param {function} setNpc - Función para actualizar el estado
 * @param {Array} route - Array de acciones (walk, wait, look)
 * @param {object} avatar - Estado del avatar del jugador
 * @param {object} config - Configuración de velocidad
 */
export function useNPCRouteMovement(npc, setNpc, route, avatar, config = {}) {
  const currentActionIndexRef = useRef(0);
  const isExecutingRef = useRef(false);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const stepDuration = config.STEP_DURATION || 500;
  const animationInterval = config.ANIMATION_INTERVAL || 100;

  useEffect(() => {
    if (!route || route.length === 0) return;
    if (npc.moving || npc.waiting) return;
    if (isExecutingRef.current) return;

    const executeAction = () => {
      if (isExecutingRef.current) return;

      const currentAction = route[currentActionIndexRef.current];
      if (!currentAction) {
        currentActionIndexRef.current = 0;
        return;
      }

      isExecutingRef.current = true;

      switch (currentAction.type) {
        case 'walk':
          executeWalk(currentAction);
          break;
        
        case 'wait':
          executeWait(currentAction);
          break;
        
        case 'look':
          executeLook(currentAction);
          break;
        
        default:
          // Acción desconocida, pasar a la siguiente
          isExecutingRef.current = false;
          currentActionIndexRef.current = (currentActionIndexRef.current + 1) % route.length;
          break;
      }
    };

    /**
     * Ejecuta una acción de caminar
     */
    const executeWalk = (action) => {
      const { direction, steps } = action;
      let currentStep = 0;

      const walkStep = () => {
        if (currentStep >= steps) {
          // Terminó de caminar todos los pasos
          setNpc(prev => ({ ...prev, moving: false, step: 0 }));
          isExecutingRef.current = false;
          currentActionIndexRef.current = (currentActionIndexRef.current + 1) % route.length;
          return;
        }

        const nextPos = getNextPosition(npc.x, npc.y, direction);
        
        // Verificar si la siguiente posición es válida
        if (
          !isWalkable(nextPos.x, nextPos.y) ||
          (nextPos.x === avatar.x && nextPos.y === avatar.y) ||
          nextPos.x < npc.zone.minX || nextPos.x > npc.zone.maxX ||
          nextPos.y < npc.zone.minY || nextPos.y > npc.zone.maxY
        ) {
          // No puede caminar, terminar la acción
          setNpc(prev => ({ ...prev, moving: false, step: 0 }));
          isExecutingRef.current = false;
          currentActionIndexRef.current = (currentActionIndexRef.current + 1) % route.length;
          return;
        }

        // Iniciar movimiento
        setNpc(prev => ({ ...prev, dir: direction, moving: true }));

        // Animación de pasos
        let animStep = 0;
        intervalRef.current = setInterval(() => {
          animStep++;
          setNpc(prev => ({ ...prev, step: animStep % 3 }));
        }, animationInterval);

        // Completar el paso
        timeoutRef.current = setTimeout(() => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          setNpc(prev => ({
            ...prev,
            x: nextPos.x,
            y: nextPos.y,
            step: 0
          }));

          currentStep++;
          
          // Pequeña pausa entre pasos
          setTimeout(walkStep, 100);
        }, stepDuration);
      };

      walkStep();
    };

    /**
     * Ejecuta una acción de esperar
     */
    const executeWait = (action) => {
      const duration = action.duration || 1000;
      
      setNpc(prev => ({ ...prev, waiting: true, moving: false }));

      timeoutRef.current = setTimeout(() => {
        setNpc(prev => ({ ...prev, waiting: false }));
        isExecutingRef.current = false;
        currentActionIndexRef.current = (currentActionIndexRef.current + 1) % route.length;
      }, duration);
    };

    /**
     * Ejecuta una acción de mirar (cambiar dirección sin moverse)
     */
    const executeLook = (action) => {
      const { direction } = action;
      
      setNpc(prev => ({ ...prev, dir: direction, moving: false, step: 0 }));

      // Pausa breve antes de la siguiente acción
      timeoutRef.current = setTimeout(() => {
        isExecutingRef.current = false;
        currentActionIndexRef.current = (currentActionIndexRef.current + 1) % route.length;
      }, 300);
    };

    // Ejecutar la siguiente acción
    const actionTimeout = setTimeout(executeAction, 100);

    return () => {
      clearTimeout(actionTimeout);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [npc, setNpc, route, avatar, stepDuration, animationInterval]);
}

/**
 * Hook para mostrar frases cuando el avatar está cerca
 */
export function useProximityPhrases(avatar, npc, setNpc, phrases) {
  useEffect(() => {
    const distance = Math.abs(avatar.x - npc.x) + Math.abs(avatar.y - npc.y);
    
    if (distance <= 2 && !npc.moving) {
      if (!npc.showPhrase) {
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        setNpc(prev => ({ ...prev, showPhrase: true, phrase }));
      }
    } else {
      if (npc.showPhrase) {
        setNpc(prev => ({ ...prev, showPhrase: false }));
      }
    }
  }, [avatar.x, avatar.y, npc.x, npc.y, npc.moving, npc.showPhrase, setNpc, phrases]);
}
