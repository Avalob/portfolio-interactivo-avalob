/**
 * Hook personalizado para gestionar la entrada/salida de edificios
 * @module useBuildingNavigation
 */

import { useState, useCallback } from 'react';

/**
 * Estados iniciales de edificios visitados
 */
const INITIAL_VISITED_STATE = {
  EDUCACION: false,
  EXPERIENCIA: false,
  SKILLS: false,
  OTROS: false,
  CONTACTO: false,
  PROYECTOS: false,
  RRSS: false,
  HOBBIES: false
};

/**
 * Nombres legibles de edificios
 */
const BUILDING_NAMES = {
  EDUCACION: 'Formación',
  EXPERIENCIA: 'Experiencia',
  SKILLS: 'Skills',
  SOBRE_MI: 'Sobre Mí',
  OTROS: 'Cursos',
  CONTACTO: 'Contacto',
  PROYECTOS: 'Proyectos',
  HOBBIES: 'Hobbies',
  RRSS: 'Redes Sociales'
};

/**
 * Hook para gestionar edificios visitados y progreso
 * @returns {Object} Estado y funciones para gestión de edificios
 */
export const useBuildingProgress = () => {
  const [visitedBuildings, setVisitedBuildings] = useState(() => {
    const saved = localStorage.getItem('portfolio-visited-buildings');
    return saved ? JSON.parse(saved) : INITIAL_VISITED_STATE;
  });

  const markAsVisited = useCallback((buildingKey, addNotification, notificationShownRef) => {
    // Verificar si ya se mostró la notificación en esta sesión
    if (notificationShownRef.current.has(buildingKey)) {
      return;
    }
    
    notificationShownRef.current.add(buildingKey);
    
    setVisitedBuildings(prev => {
      if (!prev[buildingKey]) {
        addNotification(
          'success',
          '¡Edificio Visitado!',
          `Has explorado: ${BUILDING_NAMES[buildingKey]}`,
          '🏢'
        );
      }
      
      const updated = { ...prev, [buildingKey]: true };
      localStorage.setItem('portfolio-visited-buildings', JSON.stringify(updated));
      
      // Verificar si completó todos
      const allVisited = Object.values(updated).every(v => v);
      if (allVisited && !prev[buildingKey]) {
        setTimeout(() => {
          addNotification(
            'achievement',
            '🏆 ¡LOGRO DESBLOQUEADO!',
            '¡Has explorado todos los edificios! Eres un crack.',
            '⭐'
          );
        }, 500);
      }
      
      return updated;
    });
  }, []);

  const resetProgress = useCallback((addNotification, notificationShownRef) => {
    setVisitedBuildings(INITIAL_VISITED_STATE);
    localStorage.setItem('portfolio-visited-buildings', JSON.stringify(INITIAL_VISITED_STATE));
    notificationShownRef.current.clear();
    addNotification('info', '🔄 Progreso Reseteado', 'Todos los checkmarks han sido borrados', '✨');
  }, []);

  return {
    visitedBuildings,
    markAsVisited,
    resetProgress
  };
};

/**
 * Hook para gestionar estados de edificios (mostrar/ocultar modales)
 * @returns {Object} Estados y setters de edificios
 */
export const useBuildingStates = () => {
  const [showEducacion, setShowEducacion] = useState(false);
  const [showExperiencia, setShowExperiencia] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showSkillsBuilding, setShowSkillsBuilding] = useState(false);
  const [showOtros, setShowOtros] = useState(false);
  const [showProyectos, setShowProyectos] = useState(false);
  const [showContacto, setShowContacto] = useState(false);
  const [showHobbies, setShowHobbies] = useState(false);
  const [showRRSS, setShowRRSS] = useState(false);
  const [enEdificio, setEnEdificio] = useState(false);
  const [lastBuildingVisited, setLastBuildingVisited] = useState(null);
  const [lastDoorUsed, setLastDoorUsed] = useState(null);

  return {
    buildingStates: {
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
      lastBuildingVisited,
      lastDoorUsed
    },
    setBuildingState: {
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
      setLastDoorUsed
    }
  };
};
