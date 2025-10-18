/**
 * Hook personalizado para detectar y manejar la entrada a edificios
 * @module useBuildingEntrance
 */

import { useEffect } from 'react';
import { PUERTAS } from '../utils/mapConfig';

/**
 * Hook para detectar cuando el avatar está en una puerta y abrir el edificio correspondiente
 * @param {Object} params - Parámetros de configuración
 */
export function useBuildingEntrance({
  enEdificio,
  avatar,
  autoEnterBuilding,
  setAutoEnterBuilding,
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
  setEnEdificio,
  setLastBuildingVisited,
  setLastDoorUsed,
  markBuildingAsVisited
}) {
  useEffect(() => {
    if (enEdificio) return; // No detectar si ya está dentro
    
    // Edificio Educación
    if (avatar.x === PUERTAS.EDUCACION.x && avatar.y === PUERTAS.EDUCACION.y && !showEducacion) {
      // Entrar si viene del botón O si ya está allí
      if (autoEnterBuilding === 'EDUCACION' || !autoEnterBuilding) {
        setShowEducacion(true);
        setEnEdificio(true);
        setLastBuildingVisited('EDUCACION');
        markBuildingAsVisited('EDUCACION');
        if (autoEnterBuilding) setAutoEnterBuilding(null);
      }
    }
    // Edificio Experiencia
    else if (avatar.x === PUERTAS.EXPERIENCIA.x && avatar.y === PUERTAS.EXPERIENCIA.y && !showExperiencia) {
      if (autoEnterBuilding === 'EXPERIENCIA' || !autoEnterBuilding) {
        setShowExperiencia(true);
        setEnEdificio(true);
        setLastBuildingVisited('EXPERIENCIA');
        markBuildingAsVisited('EXPERIENCIA');
        if (autoEnterBuilding) setAutoEnterBuilding(null);
      }
    }
    // Edificio Skills - puerta individual en (38,27)
    else if (avatar.x === PUERTAS.SKILLS.x && avatar.y === PUERTAS.SKILLS.y && !showSkillsBuilding) {
      if (autoEnterBuilding === 'SKILLS' || !autoEnterBuilding) {
        setShowSkillsBuilding(true);
        setEnEdificio(true);
        setLastBuildingVisited('SKILLS');
        setLastDoorUsed(PUERTAS.SKILLS);
        markBuildingAsVisited('SKILLS');
        if (autoEnterBuilding) setAutoEnterBuilding(null);
      }
    }
    // Edificio SOBRE MI (Casa) - tiene 2 puertas posibles
    else if (PUERTAS.SOBRE_MI.some(puerta => avatar.x === puerta.x && avatar.y === puerta.y) && !showSkills) {
      if (autoEnterBuilding === 'SOBRE_MI' || !autoEnterBuilding) {
        setShowSkills(true);
        setEnEdificio(true);
        setLastBuildingVisited('SOBRE_MI');
        setLastDoorUsed(PUERTAS.SOBRE_MI.find(puerta => avatar.x === puerta.x && avatar.y === puerta.y));
        markBuildingAsVisited('SOBRE_MI');
        if (autoEnterBuilding) setAutoEnterBuilding(null);
      }
    }
    // Edificio Otros
    else if (avatar.x === PUERTAS.OTROS.x && avatar.y === PUERTAS.OTROS.y && !showOtros) {
      if (autoEnterBuilding === 'OTROS' || !autoEnterBuilding) {
        setShowOtros(true);
        setEnEdificio(true);
        setLastBuildingVisited('OTROS');
        markBuildingAsVisited('OTROS');
        if (autoEnterBuilding) setAutoEnterBuilding(null);
      }
    }
    // Edificio Proyectos
    else if (avatar.x === PUERTAS.PROYECTOS.x && avatar.y === PUERTAS.PROYECTOS.y && !showProyectos) {
      if (autoEnterBuilding === 'PROYECTOS' || !autoEnterBuilding) {
        setShowProyectos(true);
        setEnEdificio(true);
        setLastBuildingVisited('PROYECTOS');
        markBuildingAsVisited('PROYECTOS');
        if (autoEnterBuilding) setAutoEnterBuilding(null);
      }
    }
    // Edificio Contacto (Cafetería)
    else if (avatar.x === PUERTAS.CONTACTO.x && avatar.y === PUERTAS.CONTACTO.y && !showContacto) {
      if (autoEnterBuilding === 'CONTACTO' || !autoEnterBuilding) {
        setShowContacto(true);
        setEnEdificio(true);
        setLastBuildingVisited('CONTACTO');
        markBuildingAsVisited('CONTACTO');
        if (autoEnterBuilding) setAutoEnterBuilding(null);
      }
    }
    // Edificio Hobbies - puerta individual
    else if (avatar.x === PUERTAS.HOBBIES.x && avatar.y === PUERTAS.HOBBIES.y && !showHobbies) {
      if (autoEnterBuilding === 'HOBBIES' || !autoEnterBuilding) {
        setShowHobbies(true);
        setEnEdificio(true);
        setLastBuildingVisited('HOBBIES');
        markBuildingAsVisited('HOBBIES');
        if (autoEnterBuilding) setAutoEnterBuilding(null);
      }
    }
    // Edificio RRSS - puerta individual
    else if (avatar.x === PUERTAS.RRSS.x && avatar.y === PUERTAS.RRSS.y && !showRRSS) {
      if (autoEnterBuilding === 'RRSS' || !autoEnterBuilding) {
        setShowRRSS(true);
        setEnEdificio(true);
        setLastBuildingVisited('RRSS');
        markBuildingAsVisited('RRSS');
        if (autoEnterBuilding) setAutoEnterBuilding(null);
      }
    }
  }, [
    avatar.x,
    avatar.y,
    showEducacion,
    showExperiencia,
    showSkills,
    showSkillsBuilding,
    showOtros,
    showProyectos,
    showContacto,
    showHobbies,
    showRRSS,
    enEdificio,
    autoEnterBuilding,
    setAutoEnterBuilding,
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
    setLastBuildingVisited,
    setLastDoorUsed,
    markBuildingAsVisited
  ]);
}
