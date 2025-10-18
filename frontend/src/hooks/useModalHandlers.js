import { useCallback } from 'react';
import { PUERTAS } from '../utils/mapConfig';

export function useModalHandlers(
  setModals,
  setAvatar,
  setEnEdificio,
  setNpc,
  setLastDoorUsed,
  visitedBuildings,
  lastDoorUsed,
  addNotification
) {
  const handleCloseModal = useCallback((buildingKey, modalKey) => {
    setModals(prev => ({ ...prev, [modalKey]: false }));
    let puertaSalida = PUERTAS[buildingKey];
    
    if (buildingKey === 'SOBRE_MI') {
      puertaSalida = lastDoorUsed || PUERTAS.SOBRE_MI[0];
    }
    
    if (puertaSalida) {
      setAvatar(prev => ({ 
        ...prev, 
        x: puertaSalida.x, 
        y: puertaSalida.y + 1, 
        dir: "down" 
      }));
      setEnEdificio(false);
      
      if (buildingKey === 'SOBRE_MI') {
        addNotification('info', '¡Gracias por visitarme!', 'Espero que hayas conocido un poco más sobre mí. ¡Sigue explorando!', '👋');
      }
      
      setNpc(prev => ({
        ...prev,
        x: puertaSalida.x + 1,
        y: puertaSalida.y + 1,
        dir: "left",
        showPhrase: false
      }));
      
      if (!visitedBuildings[buildingKey]) {
        const buildingIcons = {
          EDUCACION: '🎓', EXPERIENCIA: '💼', SOBRE_MI: '🏠',
          SKILLS: '⚡', OTROS: '🎨', CONTACTO: '📧',
          PROYECTOS: '🚀', RRSS: '📱', HOBBIES: '🎮'
        };
        
        const buildingNames = {
          EDUCACION: 'Educación', EXPERIENCIA: 'Experiencia', SOBRE_MI: 'Sobre Mí',
          SKILLS: 'Skills', OTROS: 'Otros Cursos', CONTACTO: 'Contacto',
          PROYECTOS: 'Proyectos', RRSS: 'Redes Sociales', HOBBIES: 'Hobbies'
        };
        
        addNotification({
          message: `${buildingIcons[buildingKey] || '🏢'} ${buildingNames[buildingKey] || buildingKey}`,
          type: 'achievement'
        });
      }
    }
  }, [visitedBuildings, addNotification, lastDoorUsed, setModals, setAvatar, setEnEdificio, setNpc, setLastDoorUsed]);

  const handleTeleport = useCallback((x, y) => {
    setAvatar(prev => ({ ...prev, teleporting: true }));
    setTimeout(() => {
      setAvatar(prev => ({ ...prev, x, y, teleporting: false }));
    }, 250);
  }, [setAvatar]);

  return { handleCloseModal, handleTeleport };
}
