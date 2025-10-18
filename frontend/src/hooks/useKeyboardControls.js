import { useEffect, useCallback, useRef } from 'react';
import { PUERTAS } from '../utils/mapConfig';

/**
 * Hook para manejar controles de teclado
 * Incluye movimiento, cerrar modales y hotkeys
 */
export function useKeyboardControls({
  enEdificio,
  movementPaused,
  showWelcome,
  canWalk,
  setAvatar,
  setNpc,
  setEnEdificio,
  setTargetPosition,
  setPathToTarget,
  showEducacion,
  setShowEducacion,
  showExperiencia,
  setShowExperiencia,
  showSkills,
  setShowSkills,
  showSkillsBuilding,
  setShowSkillsBuilding,
  showOtros,
  setShowOtros,
  showProyectos,
  setShowProyectos,
  showContacto,
  setShowContacto,
  showHobbies,
  setShowHobbies,
  showRRSS,
  setShowRRSS,
  lastDoorUsed,
  setShowHelp,
  setIsDarkMode,
  WIDTH,
  HEIGHT
}) {
  // Usar refs para mantener valores actualizados sin causar re-renders
  const stateRef = useRef({
    enEdificio,
    movementPaused,
    showWelcome,
    canWalk,
    setAvatar,
    setNpc,
    setEnEdificio,
    setTargetPosition,
    setPathToTarget,
    showEducacion,
    setShowEducacion,
    showExperiencia,
    setShowExperiencia,
    showSkills,
    setShowSkills,
    showSkillsBuilding,
    setShowSkillsBuilding,
    showOtros,
    setShowOtros,
    showProyectos,
    setShowProyectos,
    showContacto,
    setShowContacto,
    showHobbies,
    setShowHobbies,
    showRRSS,
    setShowRRSS,
    lastDoorUsed,
    setShowHelp,
    setIsDarkMode,
    WIDTH,
    HEIGHT
  });

  // Actualizar el ref en cada render
  useEffect(() => {
    stateRef.current = {
      enEdificio,
      movementPaused,
      showWelcome,
      canWalk,
      setAvatar,
      setNpc,
      setEnEdificio,
      setTargetPosition,
      setPathToTarget,
      showEducacion,
      setShowEducacion,
      showExperiencia,
      setShowExperiencia,
      showSkills,
      setShowSkills,
      showSkillsBuilding,
      setShowSkillsBuilding,
      showOtros,
      setShowOtros,
      showProyectos,
      setShowProyectos,
      showContacto,
      setShowContacto,
      showHobbies,
      setShowHobbies,
      showRRSS,
      setShowRRSS,
      lastDoorUsed,
      setShowHelp,
      setIsDarkMode,
      WIDTH,
      HEIGHT
    };
  });
  useEffect(() => {
    const keysPressed = new Set();
    let moveInterval = null;
      const handleKeyDown = (e) => {
      
      const {
        enEdificio,
        movementPaused,
        showWelcome,
        canWalk,
        setAvatar,
        setNpc,
        setEnEdificio,
        setTargetPosition,
        setPathToTarget,
        showEducacion,
        setShowEducacion,
        showExperiencia,
        setShowExperiencia,
        showSkills,
        setShowSkills,
        showSkillsBuilding,
        setShowSkillsBuilding,
        showOtros,
        setShowOtros,
        showProyectos,
        setShowProyectos,
        showContacto,
        setShowContacto,
        showHobbies,
        setShowHobbies,
        showRRSS,
        setShowRRSS,
        lastDoorUsed,
        setShowHelp,
        setIsDarkMode,
        WIDTH,
        HEIGHT
      } = stateRef.current;
      
      // Cerrar modales con ESC o X
      if ((e.key === "Escape" || e.key === "x" || e.key === "X") && enEdificio) {
        let puertaSalida = null;
        
        if (showEducacion) {
          setShowEducacion(false);
          puertaSalida = PUERTAS.EDUCACION;
        } else if (showExperiencia) {
          setShowExperiencia(false);
          puertaSalida = PUERTAS.EXPERIENCIA;
        } else if (showSkills) {
          setShowSkills(false);
          puertaSalida = lastDoorUsed || PUERTAS.SOBRE_MI[0];
        } else if (showSkillsBuilding) {
          setShowSkillsBuilding(false);
          puertaSalida = PUERTAS.SKILLS;
        } else if (showOtros) {
          setShowOtros(false);
          puertaSalida = PUERTAS.OTROS;
        } else if (showProyectos) {
          setShowProyectos(false);
          puertaSalida = PUERTAS.PROYECTOS;
        } else if (showContacto) {
          setShowContacto(false);
          puertaSalida = PUERTAS.CONTACTO;
        } else if (showHobbies) {
          setShowHobbies(false);
          puertaSalida = PUERTAS.HOBBIES;
        } else if (showRRSS) {
          setShowRRSS(false);
          puertaSalida = PUERTAS.RRSS;
        }
        
        if (puertaSalida) {
          setAvatar(prev => ({ 
            ...prev, 
            x: puertaSalida.x, 
            y: puertaSalida.y + 1, 
            dir: "down" 
          }));
          setEnEdificio(false);
          
          // Teletransportar NPC al lado del jugador
          setNpc(prev => ({
            ...prev,
            x: puertaSalida.x + 1,
            y: puertaSalida.y + 1,
            dir: "left",
            showPhrase: false
          }));
        }
        return;
      }
      
      // Hotkeys solo fuera de edificios
      if (!enEdificio) {
        // H para ayuda
        if (e.key === 'h' || e.key === 'H') {
          setShowHelp(prev => !prev);
          return;
        }
        
        // N para modo noche
        if (e.key === 'n' || e.key === 'N') {
          setIsDarkMode(prev => !prev);
          return;
        }
      }      // No mover si está dentro del edificio, movimiento pausado, o modal de bienvenida activo
      if (enEdificio || movementPaused || showWelcome) return;        // Movimiento con flechas y WASD
      const movementKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "W", "a", "A", "s", "S", "d", "D"];
      if (movementKeys.includes(e.key)) {
        if (e.repeat) return;
        
        keysPressed.add(e.key);
        
        // Cancelar movimiento automático del mouse
        setTargetPosition(null);
        setPathToTarget([]);          // Iniciar intervalo si no existe
        if (!moveInterval) {
          moveInterval = setInterval(() => {
            if (keysPressed.size === 0) return;
            
            // Obtener la última tecla presionada (soporta flechas y WASD)
            let dx = 0, dy = 0, dir = "down";
            
            if (keysPressed.has("ArrowUp") || keysPressed.has("w") || keysPressed.has("W")) {
              dy = -1;
              dir = "up";
            } else if (keysPressed.has("ArrowDown") || keysPressed.has("s") || keysPressed.has("S")) {
              dy = 1;
              dir = "down";
            } else if (keysPressed.has("ArrowLeft") || keysPressed.has("a") || keysPressed.has("A")) {
              dx = -1;
              dir = "left";
            } else if (keysPressed.has("ArrowRight") || keysPressed.has("d") || keysPressed.has("D")) {
              dx = 1;
              dir = "right";
            }              setAvatar(prev => {
              const nextX = Math.max(0, Math.min(WIDTH - 1, prev.x + dx));
              const nextY = Math.max(0, Math.min(HEIGHT - 1, prev.y + dy));
              
              if (canWalk(nextX, nextY, true)) {
                return {
                  ...prev,
                  x: nextX,
                  y: nextY,
                  dir,
                  step: (prev.step + 1) % 3,                  moving: true
                };
              }
              
              return { ...prev, dir, moving: false };
            });
          }, 70);
        }
      }
    };
    
    const handleKeyUp = (e) => {
      const movementKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "W", "a", "A", "s", "S", "d", "D"];
      if (movementKeys.includes(e.key)) {
        keysPressed.delete(e.key);
        
        if (keysPressed.size === 0 && moveInterval) {
          clearInterval(moveInterval);
          moveInterval = null;
        }
      }
    };
      window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (moveInterval) clearInterval(moveInterval);
    };
  }, []); // ✅ Array vacío - el hook se monta solo una vez
}
