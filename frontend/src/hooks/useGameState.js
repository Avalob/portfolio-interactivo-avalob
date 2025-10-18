import { useState, useRef } from 'react';
import { AVATAR_START } from '../utils/mapConfig';

const VISITED_BUILDINGS_DEFAULT = Object.freeze({
  EDUCACION: false,
  EXPERIENCIA: false,
  SKILLS: false,
  SOBRE_MI: false,
  OTROS: false,
  CONTACTO: false,
  PROYECTOS: false,
  RRSS: false,
  HOBBIES: false
});

export function useGameState() {
  // Estados del avatar
  const [avatar, setAvatar] = useState({ 
    ...AVATAR_START, 
    dir: "down", 
    step: 0,
    teleporting: false
  });

  // Estados de NPCs
  const [npc, setNpc] = useState({ 
    x: 6, y: 6, dir: "down", step: 0,
    phrase: "", showPhrase: false,
    moving: false, waiting: false,
    zone: { minX: 4, maxX: 18, minY: 4, maxY: 12 }
  });

  const [obrero, setObrero] = useState({
    x: 10, y: 19, dir: "down", step: 0,
    showPhrase: false, moving: false, waiting: false,
    zone: { minX: 1, maxX: 14, minY: 17, maxY: 19 }
  });

  const [fernando, setFernando] = useState({
    x: 31, y: 14, dir: "left", step: 0,
    showPhrase: false, moving: false, waiting: false,
    zone: { minX: 29, maxX: 40, minY: 10, maxY: 21 }
  });

  const [pedro, setPedro] = useState({
    x: 23, y: 30, dir: "left", step: 0,
    showPhrase: false, moving: false, waiting: false,
    zone: { minX: 15, maxX: 37, minY: 23, maxY: 30 }
  });

  // Estados de modales
  const [modals, setModals] = useState({
    educacion: false,
    experiencia: false,
    skills: false,
    skillsBuilding: false,
    otros: false,
    proyectos: false,
    contacto: false,
    hobbies: false,
    rrss: false,
    help: false,
    minimapModal: false,
    welcome: true,
    recruiterPanel: false,
    resetConfirm: false
  });

  // Estados de progreso
  const [visitedBuildings, setVisitedBuildings] = useState(() => {
    const saved = localStorage.getItem('portfolio-visited-buildings');
    if (!saved) return { ...VISITED_BUILDINGS_DEFAULT };
    
    try {
      return { ...VISITED_BUILDINGS_DEFAULT, ...JSON.parse(saved) };
    } catch {
      return { ...VISITED_BUILDINGS_DEFAULT };
    }
  });

  // Estados de entorno
  const [enEdificio, setEnEdificio] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lastBuildingVisited, setLastBuildingVisited] = useState(null);
  const [lastDoorUsed, setLastDoorUsed] = useState(null);
  const [isOverlappingNPC, setIsOverlappingNPC] = useState(false);

  // Referencias
  const notificationShownRef = useRef(new Set());
  const carsPositionsRef = useRef([]);

  return {
    avatar, setAvatar,
    npc, setNpc,
    obrero, setObrero,
    fernando, setFernando,
    pedro, setPedro,
    modals, setModals,
    visitedBuildings, setVisitedBuildings,
    enEdificio, setEnEdificio,
    isDarkMode, setIsDarkMode,
    lastBuildingVisited, setLastBuildingVisited,
    lastDoorUsed, setLastDoorUsed,
    isOverlappingNPC, setIsOverlappingNPC,
    notificationShownRef,
    carsPositionsRef,
    VISITED_BUILDINGS_DEFAULT
  };
}
