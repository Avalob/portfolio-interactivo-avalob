import { useCallback, useRef } from 'react';
import { WIDTH, HEIGHT } from '../utils/tiledMapData';

/**
 * Hook para controles móviles (joystick virtual)
 * Maneja el movimiento del avatar mediante botones táctiles
 */
export function useMobileControls({
  enEdificio,
  canWalk,
  setAvatar,
  setShowHelp,
  setIsDarkMode,
  handleRecruiterModeToggle
}) {
  const mobileKeysPressed = useRef(new Set());
  const mobileMoveInterval = useRef(null);
  const MOBILE_MOVE_INTERVAL_MS = 190;

  const performMobileStep = useCallback((preferredDirection = null) => {
    let direction = preferredDirection;

    if (!direction) {
      if (mobileKeysPressed.current.has("up")) direction = "up";
      else if (mobileKeysPressed.current.has("down")) direction = "down";
      else if (mobileKeysPressed.current.has("left")) direction = "left";
      else if (mobileKeysPressed.current.has("right")) direction = "right";
    }

    if (!direction) return;

    let dx = 0, dy = 0;
    if (direction === "up") dy = -1;
    else if (direction === "down") dy = 1;
    else if (direction === "left") dx = -1;
    else if (direction === "right") dx = 1;

    setAvatar(prev => {
      const nextX = Math.max(0, Math.min(WIDTH - 1, prev.x + dx));
      const nextY = Math.max(0, Math.min(HEIGHT - 1, prev.y + dy));

      if (canWalk(nextX, nextY, true)) {
        return {
          ...prev,
          x: nextX,
          y: nextY,
          dir: direction,
          step: (prev.step + 1) % 3
        };
      }

      return { ...prev, dir: direction };
    });
  }, [canWalk, setAvatar]);

  const handleMobileDirectionPress = useCallback((direction) => {
    if (enEdificio) return;
    
    mobileKeysPressed.current.add(direction);

    performMobileStep(direction);
    
    if (!mobileMoveInterval.current) {
      mobileMoveInterval.current = setInterval(() => {
        if (mobileKeysPressed.current.size === 0) return;
        performMobileStep();
      }, MOBILE_MOVE_INTERVAL_MS);
    }
  }, [enEdificio, performMobileStep]);
  const handleMobileDirectionRelease = useCallback((direction) => {
    if (direction) {
      mobileKeysPressed.current.delete(direction);
    } else {
      mobileKeysPressed.current.clear();
    }
    
    if (mobileKeysPressed.current.size === 0 && mobileMoveInterval.current) {
      clearInterval(mobileMoveInterval.current);
      mobileMoveInterval.current = null;
      
      // Resetear step a 0 cuando se suelta el botón (sprite parado)
      setAvatar(prev => ({ ...prev, step: 0 }));
    }
  }, [setAvatar]);

  const handleMobileMenuButton = useCallback((option) => {
    // Manejar las opciones del menú desplegable
    switch(option) {
      case 'help':
        setShowHelp(true);
        break;
      case 'darkmode':
        setIsDarkMode(prev => !prev);
        break;
      case 'recruiter':
        handleRecruiterModeToggle(true);
        break;
      default:
        break;
    }
  }, [setShowHelp, setIsDarkMode, handleRecruiterModeToggle]);

  return {
    handleMobileDirectionPress,
    handleMobileDirectionRelease,
    handleMobileMenuButton
  };
}
