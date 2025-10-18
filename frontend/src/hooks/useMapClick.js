/**
 * Hook personalizado para manejar clics en el mapa
 * Gestiona pathfinding, entrada a edificios y visitas
 * @module useMapClick
 */

import { useCallback } from 'react';
import { PUERTAS } from '../utils/mapConfig';

/**
 * Hook para manejar clics en el mapa con pathfinding y entrada a edificios
 * @param {Object} params - Parámetros de configuración
 * @returns {Function} Función handleMapClick
 */
export function useMapClick({
  enEdificio,
  showWelcome,
  avatar,
  cameraOffsetX,
  cameraOffsetY,
  TILE_SIZE,
  WIDTH,
  HEIGHT,
  canWalk,
  findPath,
  setTargetPosition,
  setPathToTarget,
  setAutoEnterBuilding,
  setAvatar,
  setShowEducacion,
  setShowExperiencia,
  setShowSkills,
  setShowSkillsBuilding,
  setShowOtros,
  setShowProyectos,
  setShowContacto,
  setShowHobbies,
  setShowRRSS,
  setEnEdificio,
  setLastDoorUsed,
  visitedBuildings,
  setVisitedBuildings,
  setLastBuildingVisited
}) {
  const handleMapClick = useCallback((e) => {
    // Deshabilitar clicks en móvil, en edificio, o cuando el modal de bienvenida está activo
    const isMobile = window.matchMedia('(max-width: 768px) and (hover: none) and (pointer: coarse)').matches;
    if (isMobile || enEdificio || showWelcome) return;

    // Detectar si el clic ocurrió sobre elementos de interfaz superpuestos
    const target = e.target;
    const clickedOnUI = target.closest('.recruiter-panel') || 
                        target.closest('.topbar') || 
                        target.closest('.modal-overlay') ||
                        target.closest('.notification-container') ||
                        target.closest('.mobile-joystick');
    if (clickedOnUI) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left + cameraOffsetX;
    const clickY = e.clientY - rect.top + cameraOffsetY;
    const mapX = Math.floor(clickX / TILE_SIZE);
    const mapY = Math.floor(clickY / TILE_SIZE);

    // Detectar si el clic corresponde a una puerta de edificio
    let clickedBuilding = null;
    
    // Verificar si se hizo click en una puerta
    for (const [buildingName, coords] of Object.entries(PUERTAS)) {
      if (Array.isArray(coords)) {
        // Edificio con múltiples puertas (SOBRE_MI)
        for (const door of coords) {
          if (mapX === door.x && mapY === door.y) {
            clickedBuilding = buildingName;
            break;
          }
        }
      } else {
        // Edificio con una sola puerta
        if (mapX === coords.x && mapY === coords.y) {
          clickedBuilding = buildingName;
          break;
        }
      }
      if (clickedBuilding) break;
    }

    // Si se hizo click en una puerta, el avatar camina hasta allí y entra automáticamente
    if (clickedBuilding) {
      const doorCoords = Array.isArray(PUERTAS[clickedBuilding]) 
        ? PUERTAS[clickedBuilding][0] 
        : PUERTAS[clickedBuilding];
      
      // Calcular ruta hasta la puerta
      const path = findPath({ x: avatar.x, y: avatar.y }, { x: doorCoords.x, y: doorCoords.y });
      if (path && path.length > 0) {
        setTargetPosition({ x: doorCoords.x, y: doorCoords.y });
        setPathToTarget(path);
        setAutoEnterBuilding(clickedBuilding); // Marcar para entrar automáticamente
      } else {
        // Si no hay camino, teletransportar directamente
        setAvatar(prev => ({ ...prev, x: doorCoords.x, y: doorCoords.y }));
        
        // Abrir el modal correspondiente
        setTimeout(() => {
          switch(clickedBuilding) {
            case 'EDUCACION':
              setShowEducacion(true);
              setEnEdificio(true);
              break;
            case 'EXPERIENCIA':
              setShowExperiencia(true);
              setEnEdificio(true);
              break;
            case 'SOBRE_MI':
              setShowSkills(true);
              setLastDoorUsed(doorCoords);
              setEnEdificio(true);
              break;
            case 'SKILLS':
              setShowSkillsBuilding(true);
              setEnEdificio(true);
              break;
            case 'OTROS':
              setShowOtros(true);
              setEnEdificio(true);
              break;
            case 'PROYECTOS':
              setShowProyectos(true);
              setEnEdificio(true);
              break;
            case 'CONTACTO':
              setShowContacto(true);
              setEnEdificio(true);
              break;
            case 'HOBBIES':
              setShowHobbies(true);
              setEnEdificio(true);
              break;
            case 'RRSS':
              setShowRRSS(true);
              setEnEdificio(true);
              break;
            default:
              break;
          }
          
          // Marcar edificio como visitado
          if (clickedBuilding && visitedBuildings[clickedBuilding] === false) {
            setVisitedBuildings(prev => {
              const updated = { ...prev, [clickedBuilding]: true };
              localStorage.setItem('portfolio-visited-buildings', JSON.stringify(updated));
              return updated;
            });
            setLastBuildingVisited(clickedBuilding);
          }
        }, 100);
      }
      
      return; // Evita ejecutar el pathfinding genérico en este caso
    }

    // Si no se hizo click en puerta, comportamiento normal de movimiento
    if (mapX >= 0 && mapX < WIDTH && mapY >= 0 && mapY < HEIGHT && canWalk(mapX, mapY, true)) {
      const path = findPath({ x: avatar.x, y: avatar.y }, { x: mapX, y: mapY });
      if (path && path.length > 0) {
        setTargetPosition({ x: mapX, y: mapY });
        setPathToTarget(path);
      }
    }
  }, [
    enEdificio,
    showWelcome,
    avatar,
    cameraOffsetX,
    cameraOffsetY,
    TILE_SIZE,
    WIDTH,
    HEIGHT,
    canWalk,
    findPath,
    setTargetPosition,
    setPathToTarget,
    setAutoEnterBuilding,
    setAvatar,
    setShowEducacion,
    setShowExperiencia,
    setShowSkills,
    setShowSkillsBuilding,
    setShowOtros,
    setShowProyectos,
    setShowContacto,
    setShowHobbies,
    setShowRRSS,
    setEnEdificio,
    setLastDoorUsed,
    visitedBuildings,
    setVisitedBuildings,
    setLastBuildingVisited
  ]);

  return handleMapClick;
}
