import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook useCarMovement - Maneja el movimiento, animación y colisiones de un coche
 * 
 * @param {Object} config
 * @param {Array} config.path - Recorrido del coche [[x,y], [x,y], ...]
 * @param {number} config.speed - Velocidad en ms por tile (menor = más rápido)
 * @param {Object} config.sprites - Sprites del coche { up: [], down: [], left: [], right: [] }
 * @param {Object} config.avatar - Avatar del jugador (solo colisiona con el jugador)
 * @param {Array} config.otherCars - Otros coches para evitar colisiones
 * @param {Function} config.onComplete - Callback cuando termina el recorrido
 */
export const useCarMovement = ({
  path,
  speed = 500,
  sprites,
  avatar = null,
  otherCars = [],
  onComplete = () => {},
}) => {
  const [position, setPosition] = useState({ x: path[0][0], y: path[0][1] });
  const [pathIndex, setPathIndex] = useState(0);
  const [direction, setDirection] = useState('right');
  const [currentSprites, setCurrentSprites] = useState(sprites.right);
  const [showHorn, setShowHorn] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isActive, setIsActive] = useState(true);
  
  // Usar refs para avatar y otherCars para evitar re-renders
  const avatarRef = useRef(avatar);
  const otherCarsRef = useRef(otherCars);
  const animationFrame = useRef(0);
  const hornTimeout = useRef(null);
  const moveInterval = useRef(null);

  // Actualizar refs cuando cambien los valores (sin causar re-renders)
  useEffect(() => {
    avatarRef.current = avatar;
  }, [avatar]);

  useEffect(() => {
    otherCarsRef.current = otherCars;
  }, [otherCars]);

  // Calcular dirección entre dos puntos
  const getDirection = useCallback((from, to) => {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    
    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? 'right' : 'left';
    } else {
      return dy > 0 ? 'down' : 'up';
    }
  }, []);

  // Verificar si hay colisión en la siguiente posición (considerando coches de 2 tiles)
  const checkCollision = useCallback((nextX, nextY) => {
    // Usar refs para evitar dependencias que causen re-renders
    const currentAvatar = avatarRef.current;
    const currentOtherCars = otherCarsRef.current;

    // Helper para saber si una posición está ocupada por un coche (considerando 2 tiles si es horizontal)
    function carOccupies(car, x, y) {
      if (!car.isActive) return false;
      // Horizontal: ocupa (x, y) y (x+1, y) si right, (x, y) y (x-1, y) si left
      if (car.direction === 'right') {
        return (car.x === x && car.y === y) || (car.x + 1 === x && car.y === y);
      } else if (car.direction === 'left') {
        return (car.x === x && car.y === y) || (car.x - 1 === x && car.y === y);
      } else {
        // Vertical: solo ocupa (x, y)
        return car.x === x && car.y === y;
      }
    }

    // Verificar colisión con el avatar (jugador)
    let hasAvatarCollision = false;
    if (currentAvatar) {
      if (direction === 'right') {
        hasAvatarCollision =
          (currentAvatar.x === nextX && currentAvatar.y === nextY) ||
          (currentAvatar.x === nextX + 1 && currentAvatar.y === nextY);
      } else if (direction === 'left') {
        hasAvatarCollision =
          (currentAvatar.x === nextX && currentAvatar.y === nextY) ||
          (currentAvatar.x === nextX - 1 && currentAvatar.y === nextY);
      } else {
        hasAvatarCollision = currentAvatar.x === nextX && currentAvatar.y === nextY;
      }
    }

    // Verificar colisión con otros coches (ambos tiles si es horizontal)
    const hasCarCollision = currentOtherCars.some(car => carOccupies(car, nextX, nextY));

    return {
      blocked: hasAvatarCollision || hasCarCollision,
      isPlayer: hasAvatarCollision,
    };
  }, [direction]); // Solo depende de direction propia

  // Mostrar bocina
  const honkHorn = useCallback(() => {
    setShowHorn(true);
    if (hornTimeout.current) clearTimeout(hornTimeout.current);
    hornTimeout.current = setTimeout(() => {
      setShowHorn(false);
    }, 2000);
  }, []);

  // Actualizar sprites cuando cambia la dirección
  useEffect(() => {
    const spriteArray = sprites[direction] || sprites.right;
    setCurrentSprites(spriteArray);
  }, [direction, sprites]);

  // Movimiento principal
  useEffect(() => {
    if (!isActive || pathIndex >= path.length) {
      if (pathIndex >= path.length && isActive) {
        setIsActive(false);
        onComplete();
      }
      return;
    }

    moveInterval.current = setInterval(() => {
      setPathIndex(currentIndex => {
        // Verificar si aún hay camino
        if (currentIndex >= path.length) {
          return currentIndex;
        }
        
        const nextPoint = path[currentIndex];
        const collision = checkCollision(nextPoint[0], nextPoint[1]);
        
        if (collision.blocked) {
          // Bloqueado
          setIsBlocked(blocked => {
            if (!blocked && collision.isPlayer) {
              honkHorn();
            }
            return true;
          });
          return currentIndex; // No avanzar
        }
        
        // Desbloquear si estaba bloqueado
        setIsBlocked(false);
        
        // Calcular dirección y actualizar posición
        setPosition(prevPos => {
          const newDirection = getDirection([prevPos.x, prevPos.y], nextPoint);
          setDirection(newDirection);
          return { x: nextPoint[0], y: nextPoint[1] };
        });
        
        return currentIndex + 1;
      });
    }, speed);

    return () => {
      if (moveInterval.current) clearInterval(moveInterval.current);
    };
  }, [
    isActive,
    pathIndex,
    path,
    speed,
    getDirection,
    honkHorn,
    onComplete,
  ]); // checkCollision ya no está aquí - es estable sin dependencias

  // Cleanup
  useEffect(() => {
    return () => {
      if (hornTimeout.current) clearTimeout(hornTimeout.current);
      if (moveInterval.current) clearInterval(moveInterval.current);
    };
  }, []);

  return {
    x: position.x,
    y: position.y,
    direction,
    currentSprites,
    showHorn,
    isActive,
    isBlocked,
  };
};
