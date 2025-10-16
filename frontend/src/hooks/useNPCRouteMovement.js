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
  const npcStateRef = useRef(npc);
  // Guardar la posición inicial del NPC
  const initialPositionRef = useRef({ x: npc.x, y: npc.y });

  const stepDuration = config.STEP_DURATION || 500;
  const animationInterval = config.ANIMATION_INTERVAL || 100;

  // Mantener actualizada la referencia del NPC
  useEffect(() => {
    npcStateRef.current = npc;
  }, [npc]);

  useEffect(() => {
    if (!route || route.length === 0) return;

    let executeWalk, executeWait, executeLook, finishAction;

    const executeNextAction = () => {
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
        case 'reset':
          // Volver a la posición inicial guardada
          setNpc(prev => ({ ...prev, x: initialPositionRef.current.x, y: initialPositionRef.current.y }));
          finishAction();
          break;
        default:
          finishAction();
          break;
      }
    };

    finishAction = () => {
      isExecutingRef.current = false;
      currentActionIndexRef.current = (currentActionIndexRef.current + 1) % route.length;
      timeoutRef.current = setTimeout(executeNextAction, 100);
    };

    executeWalk = (action) => {
      const { direction, steps } = action;
      let stepsCompleted = 0;
      console.log(`[NPC Walk] Starting walk: ${direction}, ${steps} steps`);

      const doStep = () => {
        console.log(`[NPC Walk] Step ${stepsCompleted + 1}/${steps}`);
        
        if (stepsCompleted >= steps) {
          console.log('[NPC Walk] Walk completed');
          setNpc(prev => ({ ...prev, moving: false, step: 0 }));
          finishAction();
          return;
        }

        const currentNpc = npcStateRef.current;
        console.log(`[NPC Walk] Current position: (${currentNpc.x}, ${currentNpc.y})`);
        const nextPos = getNextPosition(currentNpc.x, currentNpc.y, direction);
        console.log(`[NPC Walk] Next position: (${nextPos.x}, ${nextPos.y})`);
        
        // Verificar si la siguiente posición es válida
        const isNextWalkable = isWalkable(nextPos.x, nextPos.y);
        const isAvatarBlocking = (nextPos.x === avatar.x && nextPos.y === avatar.y);
        const isInZone = nextPos.x >= currentNpc.zone.minX && nextPos.x <= currentNpc.zone.maxX &&
                         nextPos.y >= currentNpc.zone.minY && nextPos.y <= currentNpc.zone.maxY;
        
        console.log(`[NPC Walk] Walkable: ${isNextWalkable}, Avatar blocking: ${isAvatarBlocking}, In zone: ${isInZone}`);
        
        if (!isNextWalkable || isAvatarBlocking || !isInZone) {
          console.log('[NPC Walk] Cannot walk, finishing action');
          setNpc(prev => ({ ...prev, moving: false, step: 0 }));
          finishAction();
          return;
        }

        // Iniciar movimiento
        console.log('[NPC Walk] Moving...');
        setNpc(prev => ({ ...prev, dir: direction, moving: true, step: 0 }));

        // Animación de pasos
        let animStep = 0;
        intervalRef.current = setInterval(() => {
          animStep = (animStep + 1) % 3;
          setNpc(prev => ({ ...prev, step: animStep }));
        }, animationInterval);

        // Mover a la nueva posición después de stepDuration
        timeoutRef.current = setTimeout(() => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          console.log(`[NPC Walk] Moving to (${nextPos.x}, ${nextPos.y})`);
          setNpc(prev => ({
            ...prev,
            x: nextPos.x,
            y: nextPos.y,
            step: 0
          }));

          stepsCompleted++;
          
          // Continuar con el siguiente paso después de una pausa
          timeoutRef.current = setTimeout(doStep, 150);
        }, stepDuration);
      };

      doStep();
    };

    executeWait = (action) => {
      const duration = action.duration || 1000;
      
      setNpc(prev => ({ ...prev, waiting: true, moving: false }));

      timeoutRef.current = setTimeout(() => {
        setNpc(prev => ({ ...prev, waiting: false }));
        finishAction();
      }, duration);
    };

    executeLook = (action) => {
      const { direction } = action;
      
      setNpc(prev => ({ ...prev, dir: direction, moving: false, step: 0 }));

      timeoutRef.current = setTimeout(() => {
        finishAction();
      }, 300);
    };

    // Iniciar la primera acción
    executeNextAction();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      isExecutingRef.current = false;
    };
  }, [route, avatar.x, avatar.y, stepDuration, animationInterval, setNpc]);
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
