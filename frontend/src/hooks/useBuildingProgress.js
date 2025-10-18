import { useCallback } from 'react';

/**
 * Hook para gestionar el progreso de edificios visitados
 * Maneja notificaciones y logros
 */
export function useBuildingProgress({
  visitedBuildings,
  setVisitedBuildings,
  notificationShownRef,
  addNotification
}) {
  const markBuildingAsVisited = useCallback((buildingName) => {
    // Verificar si ya mostramos la notificación en esta sesión
    if (notificationShownRef.current.has(buildingName)) {
      return; // Ya se mostró, no hacer nada
    }
    
    // Marcar inmediatamente para evitar duplicados
    notificationShownRef.current.add(buildingName);
    
    setVisitedBuildings(prev => {
      // Solo mostrar notificación si es la primera vez que visita
      if (!prev[buildingName]) {
        const buildingNames = {
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
        
        addNotification(
          'success',
          '¡Edificio Visitado!',
          `Has explorado: ${buildingNames[buildingName]}`,
          '🏢'
        );
      }
      
      const updated = { ...prev, [buildingName]: true };
      localStorage.setItem('portfolio-visited-buildings', JSON.stringify(updated));
      
      // Verificar si completó todos los edificios
      const allVisited = Object.values(updated).every(v => v);
      if (allVisited && !prev[buildingName]) {
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
  }, [visitedBuildings, setVisitedBuildings, notificationShownRef, addNotification]);

  return { markBuildingAsVisited };
}
