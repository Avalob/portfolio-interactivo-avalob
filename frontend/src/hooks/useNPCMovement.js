/**
 * Custom hook para el movimiento autónomo de NPCs
 * Maneja la lógica de pathfinding, detección de colisiones y frases
 */

import { useEffect } from 'react';
import { NPC_WALKABLE_TILES, NPC_BUILDING_PHRASES, RECRUITER_PHRASES, DEVELOPER_PHRASES, CAT_PHRASES, CAT_EASTER_EGGS } from './mapConfig';
import { MAP, WIDTH, HEIGHT } from './tiledMapData';

/**
 * Verifica si una casilla es transitable para NPCs
 */
const isWalkable = (x, y) => {
  if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) return false;
  const tileId = MAP[y][x];
  return NPC_WALKABLE_TILES.includes(tileId);
};

/**
 * Calcula la distancia Manhattan entre dos puntos
 */
const manhattanDistance = (x1, y1, x2, y2) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

/**
 * Hook para manejar el movimiento de un NPC genérico
 * @param {object} npc - Estado del NPC
 * @param {function} setNpc - Función para actualizar el estado
 * @param {Array<string>} phrases - Array de frases del NPC
 * @param {object} avatar - Estado del avatar del jugador
 * @param {number} movementInterval - Intervalo de movimiento en ms (default: 2000)
 */
export function useNPCMovement(npc, setNpc, phrases, avatar, movementInterval = 2000) {
  useEffect(() => {
    if (npc.waiting || npc.moving) return;

    const moveNPC = () => {
      const { x, y, zone } = npc;
      
      // Probabilidad de quedarse quieto (30%)
      if (Math.random() < 0.3) {
        setNpc(prev => ({
          ...prev,
          waiting: true,
          phrase: phrases[Math.floor(Math.random() * phrases.length)]
        }));
        setTimeout(() => {
          setNpc(prev => ({ ...prev, waiting: false, showPhrase: false }));
        }, 3000);
        return;
      }

      // Intentar moverse a una casilla adyacente
      const directions = [
        { dir: "up", dx: 0, dy: -1 },
        { dir: "down", dx: 0, dy: 1 },
        { dir: "left", dx: -1, dy: 0 },
        { dir: "right", dx: 1, dy: 0 }
      ];

      // Ordenar direcciones aleatoriamente
      directions.sort(() => Math.random() - 0.5);

      for (const { dir, dx, dy } of directions) {
        const newX = x + dx;
        const newY = y + dy;

        // Verificar límites de zona y si es transitable
        if (
          newX >= zone.minX && newX <= zone.maxX &&
          newY >= zone.minY && newY <= zone.maxY &&
          isWalkable(newX, newY) &&
          !(newX === avatar.x && newY === avatar.y) // No chocar con avatar
        ) {
          setNpc(prev => ({ ...prev, dir, moving: true }));
          
          // Animación de movimiento
          let step = 0;
          const moveAnimation = setInterval(() => {
            step++;
            setNpc(prev => ({ ...prev, step: step % 3 }));
          }, 100);

          setTimeout(() => {
            clearInterval(moveAnimation);
            setNpc(prev => ({
              ...prev,
              x: newX,
              y: newY,
              moving: false,
              step: 0
            }));
          }, 500);
          
          return;
        }
      }
    };

    const interval = setInterval(moveNPC, movementInterval);
    return () => clearInterval(interval);
  }, [npc, setNpc, phrases, avatar, movementInterval]);
}

/**
 * Hook especializado para el Cat NPC con easter eggs
 */
export function useCatNPCMovement(cat, setCat, avatar) {
  useEffect(() => {
    if (cat.waiting || cat.moving) return;

    const moveCat = () => {
      const { x, y, zone, interactions } = cat;
      
      // Easter eggs basados en interacciones
      if (Math.random() < 0.2) {
        const easterEgg = CAT_EASTER_EGGS[Math.min(interactions, CAT_EASTER_EGGS.length - 1)];
        setCat(prev => ({
          ...prev,
          waiting: true,
          phrase: easterEgg || CAT_PHRASES[Math.floor(Math.random() * CAT_PHRASES.length)]
        }));
        setTimeout(() => {
          setCat(prev => ({ ...prev, waiting: false, showPhrase: false }));
        }, 3000);
        return;
      }

      // Movimiento normal (similar a otros NPCs)
      const directions = [
        { dir: "up", dx: 0, dy: -1 },
        { dir: "down", dx: 0, dy: 1 },
        { dir: "left", dx: -1, dy: 0 },
        { dir: "right", dx: 1, dy: 0 }
      ];

      directions.sort(() => Math.random() - 0.5);

      for (const { dir, dx, dy } of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (
          newX >= zone.minX && newX <= zone.maxX &&
          newY >= zone.minY && newY <= zone.maxY &&
          isWalkable(newX, newY) &&
          !(newX === avatar.x && newY === avatar.y)
        ) {
          setCat(prev => ({ ...prev, dir, moving: true }));
          
          let step = 0;
          const moveAnimation = setInterval(() => {
            step++;
            setCat(prev => ({ ...prev, step: step % 3 }));
          }, 100);

          setTimeout(() => {
            clearInterval(moveAnimation);
            setCat(prev => ({
              ...prev,
              x: newX,
              y: newY,
              moving: false,
              step: 0
            }));
          }, 500);
          
          return;
        }
      }
    };

    const interval = setInterval(moveCat, 2500);
    return () => clearInterval(interval);
  }, [cat, setCat, avatar]);
}

/**
 * Hook para mostrar frases cuando el avatar está cerca
 */
export function useProximityPhrases(avatar, npc, setNpc, buildingPhrases = NPC_BUILDING_PHRASES) {
  useEffect(() => {
    const distance = manhattanDistance(avatar.x, avatar.y, npc.x, npc.y);
    
    if (distance <= 2 && !npc.moving) {
      if (!npc.showPhrase) {
        const phrase = buildingPhrases[Math.floor(Math.random() * buildingPhrases.length)];
        setNpc(prev => ({ ...prev, showPhrase: true, phrase }));
      }
    } else {
      if (npc.showPhrase) {
        setNpc(prev => ({ ...prev, showPhrase: false }));
      }
    }
  }, [avatar.x, avatar.y, npc.x, npc.y, npc.moving, npc.showPhrase, setNpc, buildingPhrases]);
}
