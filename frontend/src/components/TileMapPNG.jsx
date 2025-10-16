// ============================================================
// 1. IMPORTACIONES Y CARGA DIFERIDA
// ============================================================
import React, { useState, useEffect, useMemo, useCallback, useRef, lazy, Suspense } from "react";

// ------------------------------------------------------------
// 1.1 Modales con carga diferida
// ------------------------------------------------------------
const EducacionModal = lazy(() => import('./EducacionModal'));
const ExperienciaModal = lazy(() => import('./ExperienciaModal'));
const SkillsBuildingModal = lazy(() => import('./SkillsModal'));
const OtrosModal = lazy(() => import('./OtrosModal'));
const ContactoModal = lazy(() => import('./ContactoModal'));
const SobreMiModal = lazy(() => import('./SobreMiModal'));
const RRSSModal = lazy(() => import('./RRSSModal'));
const HobbiesModal = lazy(() => import('./HobbiesModal'));
const ProyectosModal = lazy(() => import('./ProyectosModal'));
const HelpModal = lazy(() => import('./HelpModal'));
const BuildingModal = lazy(() => import('./BuildingModal'));
const WelcomeScreen = lazy(() => import('./WelcomeScreen'));

// ------------------------------------------------------------
// 1.2 Componentes de interfaz
// ------------------------------------------------------------
import RecruiterPanel from './RecruiterPanel';
import Notification, { useNotifications } from './Notification';
import TopBar from './TopBar';
import MobileJoystick from './MobileJoystick';
import FixedMinimap from './FixedMinimap';
import ResetConfirmModal from './ResetConfirmModal';

// ------------------------------------------------------------
// 1.3 Utilidades de mapa y configuración general
// ------------------------------------------------------------
import { MAP, WIDTH, HEIGHT } from "../utils/tiledMapData";
import {
  TILE_SIZE,
  AVATAR_START,
  AVATAR_SPRITES,
  NPC_SPRITES,
  FERNANDO_SPRITES,
  OBRERO_SPRITES,
  PEDRO_SPRITES,
  PUERTAS,
  FAROLILLOS,
  SEMAFOROS,
  NPC_WALKABLE_TILES,
  WATER_TILES,
  CARS_CONFIG,
  isNearby
} from "../utils/mapConfig";

// ------------------------------------------------------------
// 1.4 Decoradores y constructores de edificios
// ------------------------------------------------------------
import {
  crearEdificio, CASA_TILES, EDIFICIO_EDUCACION_TILES, EDIFICIO_SOBRE_MI_TILES, EDIFICIO_SKILLS_TILES, EDIFICIO_OTROS_TILES, EDIFICIO_EXPERIENCIA_TILES, EDIFICIO_CONTACTO_TILES, EDIFICIO_PROYECTOS_TILES, EDIFICIO_RRSS_TILES, EDIFICIO_HOBBIES_TILES,
  PUERTA_285, PUERTA_310, PUERTA_311, PUERTA_312, PUERTA_386, PUERTA_388, PUERTA_414, PUERTA_415, PUERTA_DOBLE, PUERTA1, PUERTA_EMERGENCIA,
  VENTANA, VENTANA_338, VENTANA_363,
  VENTANA_417_446_473, VENTANA_418_473, VENTANA_418_446_473, VENTANA_445, VENTANA_446_ROTADA, VENTANA_255, VENTANA_470, VENTANA_CUADRADA,
  SEMAFORO,
  STOP,
  CARTELITOS,
  FAROLA_VERDE, FAROLA_GRIS, FAROLA_DOBLE,
  TOLDO, TOLDO_GRANDE, 
  ARBOL, ARBOL_TRIPLE, ARBUSTO,
  CABLE,
  BANCO, BANCO_IZQ, BANCO_DER,
  PARK,
  BUZON,
  PARKIMETRO,
  ESCALERITA,
  FUENTE_ALARGADA, FUENTE_ESPECIAL,
  COCHE_VERDE_DERECHA, COCHE_NARANJA_DERECHA
} from "../utils/mapDecorators";
import { VENTANAS_ILUMINADAS } from "../utils/mapConstants";
import { getContextualNPCPhrase, getObreroPhrase, getFernandoPhrase, getPedroPhrase } from "../utils/npcPhrases";
import { NPC_ROUTES, NPC_ROUTE_CONFIG } from "../utils/npcRoutes";
import { useNPCRouteMovement } from "../hooks/useNPCRouteMovement";
import CarsManager from './CarsManager';
import './TileMapPNG.css';

// ============================================================
// 2. INICIALIZACIÓN DE EDIFICIOS Y RENDER HELPERS
// ============================================================
const CASA = crearEdificio(CASA_TILES);
const EDIFICIO_EDUCACION = crearEdificio(EDIFICIO_EDUCACION_TILES);
const EDIFICIO_SOBRE_MI = crearEdificio(EDIFICIO_SOBRE_MI_TILES);
const EDIFICIO_SKILLS = crearEdificio(EDIFICIO_SKILLS_TILES);
const EDIFICIO_OTROS = crearEdificio(EDIFICIO_OTROS_TILES);
const EDIFICIO_EXPERIENCIA = crearEdificio(EDIFICIO_EXPERIENCIA_TILES);
const EDIFICIO_CONTACTO = crearEdificio(EDIFICIO_CONTACTO_TILES);
const EDIFICIO_PROYECTOS = crearEdificio(EDIFICIO_PROYECTOS_TILES);
const EDIFICIO_RRSS = crearEdificio(EDIFICIO_RRSS_TILES);
const EDIFICIO_HOBBIES = crearEdificio(EDIFICIO_HOBBIES_TILES);

// ------------------------------------------------------------
// 2.1 Helpers reutilizables para renderizar decoraciones
// ------------------------------------------------------------
const renderSingleParamFunc = (func, coords) => coords.map(([x, y]) => func(x, y));
const renderVentanas = (coords) => coords.flatMap(([x, y]) => VENTANA(x, y));
const renderVentanas338 = (coords) => coords.map(([x, y]) => VENTANA_338(x, y));
const renderVentanas363 = (coords) => coords.map(([x, y]) => VENTANA_363(x, y));
const renderVentanasSimples = (coords) => coords.flatMap(([x, y]) => VENTANA(x, y));
const renderVentanasCuadradas = (coords) => coords.flatMap(([x, y]) => VENTANA_CUADRADA(x, y));
const renderVentanas417_446_473 = (coords) => coords.flatMap(([x, y]) => VENTANA_417_446_473(x, y));
const renderVentanas418_473 = (coords) => coords.flatMap(([x, y]) => VENTANA_418_473(x, y));
const renderVentanas418_446_473 = (coords) => coords.flatMap(([x, y]) => VENTANA_418_446_473(x, y));
const renderArboles = (coords) => coords.flatMap(([x, y]) => ARBOL(x, y));
const renderArbolesTriples = (coords) => coords.flatMap(([x, y]) => ARBOL_TRIPLE(x, y));
const renderFarolasDobles = (coords) => coords.flatMap(([x, y]) => FAROLA_DOBLE(x, y));
const renderSemaforos = (coords) => coords.flatMap(([x, y, flip]) => SEMAFORO(x, y, flip));
const renderToldos = (coords) => coords.flatMap(([x, y]) => TOLDO(x, y));
const renderSimpleFunc = (func, coords) => coords.map(([x, y]) => func(x, y));
const renderFuentesAlargadas = (coords) => coords.flatMap(([x, y]) => FUENTE_ALARGADA(x, y));
const renderCoches = (func, coords) => coords.flatMap(([x, y]) => func(x, y));
const renderFarolas = (coords) => coords.flatMap(([x, y, flip]) => FAROLA_GRIS(x, y, flip));
const renderFarolaVerde = (coords) => coords.flatMap(([x, y]) => FAROLA_VERDE(x, y));
const renderTiles = (tile, coords) => coords.map(([x, y]) => ({ x, y, tile }));

// ------------------------------------------------------------
// 2.2 Textos y estados iniciales persistentes
// ------------------------------------------------------------
const WELCOME_NPC_PHRASE = "¡Bienvenido a mi ciudad! 🌟 Explora los edificios y descubre mi mundo.";

// ------------------------------------------------------------
// 2.3 Estado inicial de edificios visitados
// ------------------------------------------------------------
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

// ------------------------------------------------------------
// 2.4 Dimensiones precomputadas del mapa
// ------------------------------------------------------------
const MAP_PIXEL_WIDTH = WIDTH * TILE_SIZE;
const MAP_PIXEL_HEIGHT = HEIGHT * TILE_SIZE;

// ============================================================
// 3. COMPONENTE PRINCIPAL TILEMAPPNG
// ============================================================
function TileMapPNG() {
  // ------------------------------------------------------------
  // 3.1 Estados fundamentales del avatar y del entorno
  // ------------------------------------------------------------
  const [avatar, setAvatar] = useState({ 
    ...AVATAR_START, 
    dir: "down", 
    step: 0,
    teleporting: false
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ------------------------------------------------------------
  // 3.2 Estados para personajes no jugables
  // ------------------------------------------------------------
  const [npc, setNpc] = useState({ 
    x: 6,
    y: 6,
    dir: "down",
    step: 0,
    phrase: WELCOME_NPC_PHRASE,
    showPhrase: false,
    moving: false,
    waiting: false,
    zone: { minX: 10, maxX: 18, minY: 6, maxY: 12 }
  });

  // Obrero
  const [obrero, setObrero] = useState({
    x: 7,
    y: 17,
    dir: "down",
    step: 0,
    showPhrase: false,
    moving: false,
    waiting: false,
    zone: { minX: 1, maxX: 14, minY: 17, maxY: 19 }
  });

  // Fernando
  const [fernando, setFernando] = useState({
    x: 34,
    y: 14,
    dir: "left",
    step: 0,
    showPhrase: false,
    moving: false,
    waiting: false,
    zone: { minX: 29, maxX: 40, minY: 10, maxY: 21 }
  });
  const [pedro, setPedro] = useState({
    x: 24,
    y: 28,
    dir: "left",
    step: 0,
    showPhrase: false,
    moving: false,
    waiting: false,
    zone: { minX: 15, maxX: 37, minY: 23, maxY: 30 }
  });

  const [showEducacion, setShowEducacion] = useState(false);
  const [showExperiencia, setShowExperiencia] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showSkillsBuilding, setShowSkillsBuilding] = useState(false); // Nuevo edificio SKILLS
  const [showOtros, setShowOtros] = useState(false);
  const [showProyectos, setShowProyectos] = useState(false);
  const [showContacto, setShowContacto] = useState(false);
  const [showHobbies, setShowHobbies] = useState(false);
  const [showRRSS, setShowRRSS] = useState(false);
  const [enEdificio, setEnEdificio] = useState(false);
  const [lastBuildingVisited, setLastBuildingVisited] = useState(null);
  const [lastDoorUsed, setLastDoorUsed] = useState(null);

  const [showRecruiterPanel, setShowRecruiterPanel] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // ------------------------------------------------------------
  // 3.3 Estados de superposición y progreso
  // ------------------------------------------------------------
  const [isOverlappingNPC, setIsOverlappingNPC] = useState(false);
  useEffect(() => {
    const overlapping = 
      (avatar.x === npc.x && avatar.y === npc.y) ||
      (avatar.x === obrero.x && avatar.y === obrero.y) ||
      (avatar.x === fernando.x && avatar.y === fernando.y) ||
      (avatar.x === pedro.x && avatar.y === pedro.y);
    
    setIsOverlappingNPC(overlapping);
  }, [avatar.x, avatar.y, npc.x, npc.y, obrero.x, obrero.y, fernando.x, fernando.y, pedro.x, pedro.y]);
  const [visitedBuildings, setVisitedBuildings] = useState(() => {
    const saved = localStorage.getItem('portfolio-visited-buildings');

    if (!saved) {
      return { ...VISITED_BUILDINGS_DEFAULT };
    }

    try {
      const parsed = JSON.parse(saved);
      return { ...VISITED_BUILDINGS_DEFAULT, ...parsed };
    } catch (error) {
      console.warn('No se pudo parsear el progreso guardado, se restablece el estado por defecto.', error);
      return { ...VISITED_BUILDINGS_DEFAULT };
    }
  });
  
  // Estado para modo día/noche (por defecto día)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Alterna el modo día/noche
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Estado para pausar movimiento durante interacción con UI
  const [movementPaused, setMovementPaused] = useState(false);

  // ------------------------------------------------------------
  // 3.4 Sistema de notificaciones y recordatorios
  // ------------------------------------------------------------
  const { notifications, addNotification, removeNotification } = useNotifications();
  const notificationShownRef = useRef(new Set());
  
  // ------------------------------------------------------------
  // 3.5 Gestión del cierre de modales y retorno al mapa
  // ------------------------------------------------------------
  const handleCloseModal = useCallback((buildingKey, setModalState) => {
    setModalState(false);
    let puertaSalida = PUERTAS[buildingKey];
    
    // SOBRE_MI tiene 2 puertas, usar la que se usó para entrar
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
          EDUCACION: '🎓',
          EXPERIENCIA: '💼',
          SOBRE_MI: '🏠',
          SKILLS: '⚡',
          OTROS: '🎨',
          CONTACTO: '📧',
          PROYECTOS: '🚀',
          RRSS: '📱',
          HOBBIES: '🎮'
        };
        
        const buildingNames = {
          EDUCACION: 'Educación',
          EXPERIENCIA: 'Experiencia',
          SOBRE_MI: 'Sobre Mí',
          SKILLS: 'Skills',
          OTROS: 'Otros Cursos',
          CONTACTO: 'Contacto',
          PROYECTOS: 'Proyectos',
          RRSS: 'Redes Sociales',
          HOBBIES: 'Hobbies'
        };
        
        const icon = buildingIcons[buildingKey] || '🏢';
        const name = buildingNames[buildingKey] || buildingKey;
        
        addNotification({
          message: `${icon} ${name}`,
          type: 'achievement'
        });
      }
    }
  }, [visitedBuildings, addNotification, lastDoorUsed]);
  
  // ------------------------------------------------------------
  // 3.6 Teletransporte con animación suave
  // ------------------------------------------------------------
  const handleTeleport = useCallback((x, y) => {
    setAvatar(prev => ({ ...prev, teleporting: true }));
    
    setTimeout(() => {
      setAvatar(prev => ({ 
        ...prev, 
        x, 
        y,
        teleporting: false 
      }));
    }, 250);
  }, []);

  // ------------------------------------------------------------
  // 3.7 Movimiento automático y soporte de minimapa
  // ------------------------------------------------------------
  const [targetPosition, setTargetPosition] = useState(null);
  const [pathToTarget, setPathToTarget] = useState([]);
  const carsPositionsRef = useRef([]);
  const [autoEnterBuilding, setAutoEnterBuilding] = useState(null);
  const [lastMoveTime, setLastMoveTime] = useState(Date.now());
  const [inactivityWarningShown, setInactivityWarningShown] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [isPlayerInactive, setIsPlayerInactive] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showMinimapModal, setShowMinimapModal] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // ------------------------------------------------------------
  // 3.8 Métricas de progreso del jugador
  // ------------------------------------------------------------

  const totalBuildingsCount = Object.keys(visitedBuildings).length;
  const visitedBuildingsCount = Object.values(visitedBuildings).filter(Boolean).length;
  const progressPercent = totalBuildingsCount > 0
    ? (visitedBuildingsCount / totalBuildingsCount) * 100
    : 0;
  const autoPathIntervalMs = useMemo(() => (isMobileDevice ? 190 : 190), [isMobileDevice]);

  // ------------------------------------------------------------
  // 3.9 Efectos para adaptación por dispositivo e inactividad
  // ------------------------------------------------------------
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.matchMedia('(max-width: 768px) and (hover: none) and (pointer: coarse)').matches;
      setIsMobileDevice(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [showingWelcomeMessage, setShowingWelcomeMessage] = useState(false);
  useEffect(() => {
    if (showWelcome) {
      setNpc(prev => ({ ...prev, showPhrase: false }));
      return;
    }

    setShowingWelcomeMessage(true);
    setNpc(prev => ({ ...prev, phrase: WELCOME_NPC_PHRASE, showPhrase: true }));

    const timer = setTimeout(() => {
      setNpc(prev => ({ ...prev, showPhrase: false }));
      setShowingWelcomeMessage(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showWelcome]);

  useEffect(() => {
    const checkInactivity = setInterval(() => {
      const now = Date.now();
      const inactive = (now - lastMoveTime) > 9000; 
      setIsPlayerInactive(inactive);
    }, 1000);

    return () => clearInterval(checkInactivity);
  }, [lastMoveTime]);

  useEffect(() => {
    if (!avatar.moving && avatar.step !== 0) {
      const timer = setTimeout(() => {
        setAvatar(prev => ({ ...prev, step: 0 }));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [avatar.moving, avatar.step]);
  // ------------------------------------------------------------
  // 3.10 Diálogos contextuales de NPC y animaciones de frase
  // ------------------------------------------------------------
  // Mostrar frase solo si el avatar está cerca
  const phraseTimeout = React.useRef();
  useEffect(() => {
    if (showingWelcomeMessage) return;
    if (phraseTimeout.current) clearTimeout(phraseTimeout.current);

    const isNear = isNearby(avatar, npc);
    if (isNear && !npc.showPhrase) {
      const phrase = getContextualNPCPhrase(visitedBuildings, isDarkMode, lastBuildingVisited);
      setNpc(prev => ({ ...prev, phrase, showPhrase: true }));
      phraseTimeout.current = setTimeout(() => {
        setNpc(prev => ({ ...prev, showPhrase: false }));
      }, 4000);

      if (lastBuildingVisited) {
        setTimeout(() => setLastBuildingVisited(null), 500);
      }
    } else if (!isNear && npc.showPhrase) {
      setNpc(prev => ({ ...prev, showPhrase: false }));
    }

    return () => {
      if (phraseTimeout.current) clearTimeout(phraseTimeout.current);
    };
  }, [avatar.x, avatar.y, npc.x, npc.y, visitedBuildings, isDarkMode, lastBuildingVisited, showingWelcomeMessage]);

  const obreroTimeout = React.useRef();
  useEffect(() => {
    if (obreroTimeout.current) clearTimeout(obreroTimeout.current);
    const isNear = isNearby(avatar, obrero);

    if (isNear && !obrero.showPhrase) {
      const phrase = getObreroPhrase();
      setObrero(prev => ({ ...prev, phrase, showPhrase: true }));
      obreroTimeout.current = setTimeout(() => {
        setObrero(prev => ({ ...prev, showPhrase: false }));
      }, 4000);
    } else if (!isNear && obrero.showPhrase) {
      setObrero(prev => ({ ...prev, showPhrase: false }));
    }

    return () => {
      if (obreroTimeout.current) clearTimeout(obreroTimeout.current);
    };
  }, [avatar.x, avatar.y, obrero.x, obrero.y]);

  const pedroTimeout = React.useRef();
  useEffect(() => {
    if (pedroTimeout.current) clearTimeout(pedroTimeout.current);
    const isNear = isNearby(avatar, pedro);

    if (isNear && !pedro.showPhrase) {
      const phrase = getPedroPhrase();
      setPedro(prev => ({ ...prev, phrase, showPhrase: true }));
      pedroTimeout.current = setTimeout(() => {
        setPedro(prev => ({ ...prev, showPhrase: false }));
      }, 4000);
    } else if (!isNear && pedro.showPhrase) {
      setPedro(prev => ({ ...prev, showPhrase: false }));
    }

    return () => {
      if (pedroTimeout.current) clearTimeout(pedroTimeout.current);
    };
  }, [avatar.x, avatar.y, pedro.x, pedro.y]);

  const fernandoTimeout = React.useRef();
  useEffect(() => {
    if (fernandoTimeout.current) clearTimeout(fernandoTimeout.current);
    const isNear = isNearby(avatar, fernando);

    if (isNear && !fernando.showPhrase) {
      const phrase = getFernandoPhrase();
      setFernando(prev => ({ ...prev, phrase, showPhrase: true }));
      fernandoTimeout.current = setTimeout(() => {
        setFernando(prev => ({ ...prev, showPhrase: false }));
      }, 4000);
    } else if (!isNear && fernando.showPhrase) {
      setFernando(prev => ({ ...prev, showPhrase: false }));
    }

    return () => {
      if (fernandoTimeout.current) clearTimeout(fernandoTimeout.current);
    };
  }, [avatar.x, avatar.y, fernando.x, fernando.y]);

  // ------------------------------------------------------------
  // 3.11 Plantillas de edificios renderizados
  // ------------------------------------------------------------
  const EDIFICIOS_RENDER = useMemo(() => [
    ...EDIFICIO_EDUCACION(8, 0),
    ...EDIFICIO_EXPERIENCIA(14, 0),
    ...EDIFICIO_SOBRE_MI(19, 12),
    ...EDIFICIO_OTROS(32, 0),
    ...CASA (38,-1),
    ...CASA (42,-1),
    ...EDIFICIO_PROYECTOS(20, 19),
    ...CASA (0,11),
    ...EDIFICIO_CONTACTO(4, 12),
    ...CASA (37,11),
    ...CASA (41,11),
    ...CASA (46,11), // Casa adicional
    ...CASA(0,24 ),
    ...EDIFICIO_HOBBIES(4,24 ),
    ...EDIFICIO_SKILLS(36,22 ),
    ...EDIFICIO_RRSS(40,22 ),
    ...CASA (45,22),

  ], []);

  // ------------------------------------------------------------
  // 3.12 Catálogo de decoraciones urbanas
  // ------------------------------------------------------------
  const OBJECTS = useMemo(() => [
    // -- Esculturas y detalles de plaza
    { x: 24, y: 25, tile: 500 },
    { x: 24, y: 26, tile: 501 },
    { x: 28, y: 25, tile: 500 },
    { x: 28, y: 26, tile: 501 },
    ...renderTiles(245, [[44, 23]]),
    ...renderTiles(248, [[3, 1], [5, 2]]),
    
    // -- Puertas y accesos principales
    PUERTA_EMERGENCIA(4, 15),
    ...renderSingleParamFunc(PUERTA_386, [[5, 16], [7, 16], [10, 16]]),
    ...renderSingleParamFunc(PUERTA_388, [[6, 16], [9, 16], [11, 16]]),
    ...PUERTA_DOBLE(10, 4),
    PUERTA1(9, 4),
    PUERTA1(11, 4),
    PUERTA_414(20, 16),
    PUERTA_415(21, 16),
    ...renderSingleParamFunc(PUERTA_310, [[38, 27], [5, 29], [41, 27], [8, 16]]),
    PUERTA_311(34, 4),
    PUERTA_312(26, 25),
    ...PUERTA_DOBLE(17, 3),
    ...renderSingleParamFunc(PUERTA_285, [[16, 3], [18, 3], [25, 25], [27, 25]]),

    // -- Ventanas y cristaleras
    ...renderSingleParamFunc(VENTANA_445, [[32, 2], [36, 2]]),
    ...renderSingleParamFunc(VENTANA_255, [[32, 3], [36, 3]]),
    ...renderSingleParamFunc(VENTANA_470, [[32, 4], [36, 4]]),
    ...renderSingleParamFunc(VENTANA_446_ROTADA, [[16, 2], [17, 2], [18, 2], [19, 3], [20, 3], [14, 3], [15, 3]]),
    ...renderVentanas417_446_473([[8, 2], [12, 2]]),
    ...renderVentanas418_473([[21, 24], [23, 24], [25, 23], [26, 23], [27, 23], [29, 24], [31, 24]]),
    ...renderVentanas418_446_473([[22, 23], [30, 23]]),
    ...renderVentanasSimples([[38, 2], [38, 3], [38, 4], [41, 2], [41, 3], [41, 4], [42, 2], [42, 3], [42, 4], [45, 2], [45, 3], [45, 4], [39, 4], [44, 4], [43, 16], [6, 29], [1, 29], [2, 16], [42, 27], [46, 27], [37, 27], [0, 14], [0, 15], [0, 16], [3, 14], [3, 15], [3, 16], [19, 15], [19, 16], [22, 15], [22, 16], [37, 14], [37, 15], [37, 16], [36, 25], [36, 26], [36, 27], [39, 25], [39, 26], [39, 27], [40, 25], [40, 26], [40, 27], [43, 25], [43, 26], [43, 27], [40, 14], [40, 15], [40, 16], [41, 14], [45, 25], [45, 26], [45, 27], [46, 14], [46, 15], [46, 16], [41, 15], [41, 16], [44, 14], [44, 15], [44, 16], [7, 27], [7, 28], [7, 29], [4, 27], [4, 28], [4, 29], [3, 27], [3, 28], [3, 29], [0, 27], [0, 28], [0, 29]]),
    ...renderVentanasCuadradas([[39, 1], [40, 1], [43, 1], [44, 1], [39, 2], [40, 2], [43, 2], [44, 2], [1, 13], [2, 13], [1, 14], [2, 14], [38, 13], [38, 14], [39, 13], [39, 14], [42, 13], [42, 14], [43, 13], [43, 14], [6, 27], [5, 27], [42, 25], [41, 25], [37, 25], [38, 25], [1, 27], [2, 27], [1, 26], [2, 26], [46, 25], [46, 24]]),
    ...renderSingleParamFunc(VENTANA_338, [[38, 16], [39, 16], [42, 16], [40, 4], [43, 4], [1, 16], [2, 29]]),
    ...renderVentanas363([[7, 15], [8, 15], [9, 15]]),

    // -- Cartelería de referencia
    { x: 9, y: 2, text: "ESCUELA", neon: true, compact: true, tiles: 3, colorClass: "neon-green" },
    { x: 16, y: 1, text: "OFICINA", neon: true, compact: true, tiles: 3, colorClass: "neon-blue" },
    { x: 33, y: 2, text: "ACADEMIA", neon: true, compact: true, tiles: 3, colorClass: "neon-yellow" },
    { x: 20, y: 14, text: "HOME", neon: true, compact: true, tiles: 2, colorClass: "neon-orange" },
    { x: 7, y: 14, text: "CAFETERIA", neon: true, compact: true, colorClass: "neon-red" },
    { x: 25, y: 22, text: "MUSEO", neon: true, compact: true, colorClass: "neon-purple" },
    { x: 37, y: 24, text: "TALLER", neon: true, compact: true, tiles: 2, colorClass: "neon-cyan" },
    { x: 41, y: 24, text: "RADIO", neon: true, compact: true, tiles: 2, colorClass: "neon-pink" },
    { x: 5, y: 26, text: "CLUB", neon: true, compact: true, tiles: 2, colorClass: "neon-teal" },

    // -- Iluminación pública
    ...FAROLA_VERDE(1, 2),
    ...FAROLA_GRIS(7, 3),
    ...FAROLA_GRIS(22, 3, true),
    ...FAROLA_GRIS(13, 14, true),
    ...FAROLA_GRIS(33, 23, true),
    ...FAROLA_GRIS(24, 29),
    ...FAROLA_GRIS(28, 29, true),
    ...FAROLA_GRIS(32, 31, true),
    ...FAROLA_GRIS(20, 31),
    ...FAROLA_GRIS(36, 15),
    ...renderFarolasDobles([[0, 9], [13, 4], [8, 18], [2, 18], [8, 9], [32, 9], [41, 9]]),
    ...renderTiles(169, [[34, 16], [30, 14]]),
    ...renderTiles(196, [[34, 17], [30, 15]]),
    ...renderTiles(164, [[31, 3]]),
    { x: 31, y: 4, tile: 191, flip: false },

    // -- Señalización y comercios al aire libre
    ...renderSemaforos([[2, 4, true], [23, 9, true], [14, 9, true], [9, 22, true], [30, 5, false]]),
    ...renderToldos([[5, 16], [10, 16]]),
    ...TOLDO_GRANDE(7, 16),
    BUZON(7, 5),
    BUZON(13, 23),
    { x: 17, y: 26, tile: 550 }, // Carrito parte superior
    { x: 17, y: 25, tile: 553 }, // Carrito parte inferior
    { x: 10, y: 17, tile: 676 }, // Caja de manzanas
    { x: 11, y: 17, tile: 679 }, // Caja de peras verdes
    ESCALERITA(22, 2),
    ...STOP(18, 9),
    ...CARTELITOS(26, 9),

    // -- Naturaleza y zonas verdes
    ...renderArboles([[21, 3], [12, 15], [23, 25], [22, 25], [21, 25], [20, 25], [29, 25], [30, 25], [31, 25], [32, 25], [33, 25], [19, 25]]),
    ...renderArbolesTriples([[37, 17], [38, 17], [39, 17], [42, 17], [43, 17], [46, 17], [13, 26], [13, 29]]),
    ...renderSimpleFunc(ARBUSTO, [[40, 18], [41, 18], [44, 18], [45, 18], [14, 26], [14, 27], [14, 28], [14, 30], [14, 31]]),

    // -- Detalles industriales puntuales
    { x: 21, y: 12, tile: 333 },
    ...FAROLA_GRIS(19, 23),

    // -- Mobiliario urbano
    CABLE(13, 1),
    ...renderSimpleFunc(BANCO, [[0, 4], [40, 19], [41, 19], [44, 19], [45, 19]]),
    ...renderSimpleFunc(BANCO_IZQ, [[33, 18], [33, 13]]),
    ...renderSimpleFunc(BANCO_DER, [[31, 18], [31, 13]]),
    ...renderSimpleFunc(PARK, [[28, 12], [28, 13], [28, 14], [28, 15], [28, 16], [28, 17]]),
    PARKIMETRO(28, 11),
    { x: 0, y: 0, tile: 499 },
    { x: 36, y: 5, tile: 499 },
    { x: 30, y: 17, tile: 499 },
    { x: 7, y: 30, tile: 499 },

    // -- Fuentes y detalles acuáticos
    ...renderFuentesAlargadas([[21, 28], [30, 28], [21, 31], [30, 31]]),
    ...FUENTE_ESPECIAL(25, 28),
    ...renderTiles(230, [[32, 15]]),

    // -- Baldosas decorativas
    ...renderTiles(238, [[30, 12], [31, 12], [30, 13], [33, 12], [34, 12], [30, 18], [33, 19], [34, 19], [34, 18], [34, 13]]),

    // -- Vehículos estacionados
    ...renderCoches(COCHE_VERDE_DERECHA, [[26, 17]]),
    ...renderCoches(COCHE_NARANJA_DERECHA, [[26, 13]]),

    // -- Valla decorativa perimetral
    ...renderTiles(356, [[13, 2]]),

  ], []);
  // ------------------------------------------------------------
  // 3.13 Puertas transitables y malla de colisiones
  // ------------------------------------------------------------
  const PUERTAS_CAMINABLES = useMemo(() => [
    { x: PUERTAS.EDUCACION.x, y: PUERTAS.EDUCACION.y },
    { x: PUERTAS.EXPERIENCIA.x, y: PUERTAS.EXPERIENCIA.y },
    ...PUERTAS.SOBRE_MI,
    { x: PUERTAS.SKILLS.x, y: PUERTAS.SKILLS.y },
    { x: PUERTAS.OTROS.x, y: PUERTAS.OTROS.y },
    { x: PUERTAS.PROYECTOS.x, y: PUERTAS.PROYECTOS.y },
    { x: PUERTAS.CONTACTO.x, y: PUERTAS.CONTACTO.y },
    { x: PUERTAS.HOBBIES.x, y: PUERTAS.HOBBIES.y },
    { x: PUERTAS.RRSS.x, y: PUERTAS.RRSS.y },
  ], []);

  const COLLISION_OBJECTS = useMemo(() => {
    const todosObjetos = [
      ...EDIFICIOS_RENDER.filter(obj => typeof obj.tile !== "undefined"),
      ...OBJECTS.filter(obj => typeof obj.tile !== "undefined" && !obj.text)
    ];
    return todosObjetos.filter(obj => {
      return !PUERTAS_CAMINABLES.some(puerta => puerta.x === obj.x && puerta.y === obj.y);
    });
  }, [EDIFICIOS_RENDER, OBJECTS, PUERTAS_CAMINABLES]);

  // ------------------------------------------------------------
  // 3.14 Validación de tiles caminables
  // ------------------------------------------------------------
  const canWalk = useCallback((x, y, checkNPCs = true) => {
    if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) return false;

  // El mapa base es transitable; bloqueamos únicamente los elementos superpuestos
    const hasCollision = COLLISION_OBJECTS.some(obj => obj.x === x && obj.y === y);
    if (hasCollision) return false;

    // Comprobamos ocupación por vehículos, que ocupan dos tiles según su orientación
    const hasCarCollision = carsPositionsRef.current.some(car => {
      if (!car.isActive) return false;
      
      // Verificar tile principal del coche
      if (car.x === x && car.y === y) return true;
      
      // Si el coche está en orientación horizontal (left o right), verificar el segundo tile
      if (car.direction === 'left' || car.direction === 'right') {
        const secondTileX = car.direction === 'right' ? car.x + 1 : car.x - 1;
        if (secondTileX === x && car.y === y) return true;
      }
      
      // Si el coche está en orientación vertical (up o down), verificar el segundo tile
      if (car.direction === 'up' || car.direction === 'down') {
        const secondTileY = car.direction === 'down' ? car.y + 1 : car.y - 1;
        if (car.x === x && secondTileY === y) return true;
      }
      
      return false;
    });
    if (hasCarCollision) return false;
    
    // Evitamos superposición con NPC activos
    if (checkNPCs) {
      if ((npc.x === x && npc.y === y) || 
          (obrero.x === x && obrero.y === y) || 
          (fernando.x === x && fernando.y === y) ||
          (pedro.x === x && pedro.y === y)) {
        return false;
      }
    }
    
    return true;
  }, [COLLISION_OBJECTS, npc.x, npc.y, obrero.x, obrero.y, fernando.x, fernando.y, pedro.x, pedro.y]);
  // ------------------------------------------------------------
  // 3.15 Movimiento automático de NPCs
  // ------------------------------------------------------------
  // Los NPC patrullan de forma aleatoria y se detienen al detectar obstáculos

  const createNPCMovement = useCallback((setNPC, moveSpeed, initialDelay, zone = null) => {
    if (enEdificio) return;
    
    const dirMap = {
      down: { dx: 0, dy: 1 },
      up: { dx: 0, dy: -1 },
      right: { dx: 1, dy: 0 },
      left: { dx: -1, dy: 0 }
    };
    
    let stepsRemaining = 0;
    let isWaiting = true;
    
    const randomDirection = () => {
      const dirs = ["down", "up", "right", "left"];
      return dirs[Math.floor(Math.random() * dirs.length)];
    };
    
    const startMoving = () => {
      isWaiting = false;
      stepsRemaining = 3; // Dar 3 pasos
      setNPC(prev => ({ ...prev, dir: randomDirection(), step: 1 }));
    };
    
    const stopMoving = () => {
      isWaiting = true;
      stepsRemaining = 0;
      setNPC(prev => ({ ...prev, step: 0 }));
      // Pausa de 4-7 segundos antes de volver a moverse
      setTimeout(startMoving, 4000 + Math.random() * 3000);
    };
    
    const tryMove = () => {
      if (isWaiting || stepsRemaining <= 0) {
        if (!isWaiting && stepsRemaining <= 0) stopMoving();
        return;
      }
      
      setNPC(prev => {
        const { dx, dy } = dirMap[prev.dir];
        const nx = prev.x + dx;
        const ny = prev.y + dy;
        
        // Verificar límites (zona específica o mapa completo)
        let withinBounds;
        if (zone) {
          withinBounds = nx >= zone.minX && nx <= zone.maxX && 
                        ny >= zone.minY && ny <= zone.maxY;
        } else {
          withinBounds = nx >= 0 && nx < WIDTH && ny >= 0 && ny < HEIGHT;
        }
        
        // Verificar si puede moverse
        const canMove = withinBounds &&
                       NPC_WALKABLE_TILES.includes(MAP[ny][nx]) &&
                       !COLLISION_OBJECTS.some(obj => obj.x === nx && obj.y === ny);
        
        if (canMove) {
          stepsRemaining--;
          return { ...prev, x: nx, y: ny, step: (prev.step + 1) % 3 };
        } else {
          // Chocó con algo, pararse inmediatamente
          stepsRemaining = 0;
          setTimeout(stopMoving, 0);
          return { ...prev, step: 0 };
        }
      });
    };
    
    // Iniciar después del delay
    const startTimeout = setTimeout(() => {
      startMoving();
      const interval = setInterval(tryMove, moveSpeed);
      return () => clearInterval(interval);
    }, initialDelay);
    
    return () => clearTimeout(startTimeout);
  }, [enEdificio, COLLISION_OBJECTS]);
  
  // Movimiento de Obrero (sin zona, se mueve por todo el mapa)
  useEffect(() => createNPCMovement(setObrero, 400, 5000), [createNPCMovement]);

  // Movimiento de Fernando (con zona restringida)
  useEffect(() => createNPCMovement(setFernando, 400, 5000, fernando.zone), [createNPCMovement, fernando.zone]);
  // Movimiento de Pedro (con zona restringida)
  useEffect(() => createNPCMovement(setPedro, 400, 5000, pedro.zone), [createNPCMovement, pedro.zone]);

  const [viewportSize, setViewportSize] = useState(() => {
    if (typeof window === 'undefined') {
      return { width: MAP_PIXEL_WIDTH, height: MAP_PIXEL_HEIGHT };
    }
    return {
      width: window.visualViewport?.width ?? window.innerWidth,
      height: window.visualViewport?.height ?? window.innerHeight
    };
  });

  // Ajustar la unidad vh personalizada para dispositivos móviles (iOS safari, etc.)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncViewportMetrics = () => {
      const currentWidth = window.visualViewport?.width ?? window.innerWidth;
      const currentHeight = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty('--app-vh', `${currentHeight * 0.01}px`);
      setViewportSize(prev => (
        prev.width === currentWidth && prev.height === currentHeight
          ? prev
          : { width: currentWidth, height: currentHeight }
      ));
    };

    syncViewportMetrics();

    window.addEventListener('resize', syncViewportMetrics);
    window.addEventListener('orientationchange', syncViewportMetrics);
    window.visualViewport?.addEventListener?.('resize', syncViewportMetrics);

    return () => {
      window.removeEventListener('resize', syncViewportMetrics);
      window.removeEventListener('orientationchange', syncViewportMetrics);
      window.visualViewport?.removeEventListener?.('resize', syncViewportMetrics);
    };
  }, []);
  // ------------------------------------------------------------
  // 3.16 Cálculo de cámara y centrado del mapa
  // ------------------------------------------------------------
  // Dimensiones totales del mapa en píxeles
  const viewportWidth = viewportSize.width;
  const viewportHeight = viewportSize.height;
  const VIEWPORT_PIXEL_WIDTH = Math.min(viewportWidth, MAP_PIXEL_WIDTH);
  const VIEWPORT_PIXEL_HEIGHT = Math.min(viewportHeight, MAP_PIXEL_HEIGHT);
  const containerWidth = Math.min(viewportWidth, MAP_PIXEL_WIDTH);
  const containerHeight = Math.min(viewportHeight, MAP_PIXEL_HEIGHT);

  // Mantener la cámara centrada en el avatar
  // Centro del avatar en píxeles para mantener la cámara estable
  const avatarCenterX = avatar.x * TILE_SIZE + TILE_SIZE / 2;
  const avatarCenterY = avatar.y * TILE_SIZE + TILE_SIZE / 2;

  let rawOffsetX = avatarCenterX - VIEWPORT_PIXEL_WIDTH / 2;
  let rawOffsetY = avatarCenterY - VIEWPORT_PIXEL_HEIGHT / 2;
  
  // Limitar la cámara para que nunca muestre más allá de los bordes del mapa
  // Si el mapa es más pequeño que el viewport, centrar el mapa
  if (MAP_PIXEL_WIDTH <= VIEWPORT_PIXEL_WIDTH) {
    rawOffsetX = (MAP_PIXEL_WIDTH - VIEWPORT_PIXEL_WIDTH) / 2;
  } else {
    // Limitar offset X para no mostrar más allá de los bordes visibles
    rawOffsetX = Math.max(0, Math.min(rawOffsetX, MAP_PIXEL_WIDTH - VIEWPORT_PIXEL_WIDTH));
  }
  
  // Solo limitar arriba para TopBar (permitir -2 tiles = -72px)
  const TOP_BAR_OFFSET = 2 * TILE_SIZE;
  
  if (MAP_PIXEL_HEIGHT <= VIEWPORT_PIXEL_HEIGHT) {
    rawOffsetY = (MAP_PIXEL_HEIGHT - VIEWPORT_PIXEL_HEIGHT) / 2;
  } else {
    // Limitar offset Y entre el límite superior (TopBar) y el borde inferior del mapa
    rawOffsetY = Math.max(-TOP_BAR_OFFSET, Math.min(rawOffsetY, MAP_PIXEL_HEIGHT - VIEWPORT_PIXEL_HEIGHT));
  }
  
  const cameraOffsetX = rawOffsetX;
  const cameraOffsetY = rawOffsetY;

  // ------------------------------------------------------------
  // 3.17 Pathfinding y efectos de desplazamiento
  // ------------------------------------------------------------

  // Función de pathfinding A* para encontrar rutas esquivando obstáculos
  const findPath = useCallback((start, end) => {
    const { x: startX, y: startY } = start;
    const { x: endX, y: endY } = end;
    const getKey = (x, y) => `${x},${y}`;

    const openSet = [{ x: startX, y: startY, g: 0, h: 0, f: 0, parent: null }];
    const closedSet = new Set();
    const nodes = new Map();
    const heuristic = (x, y) => Math.abs(x - endX) + Math.abs(y - endY);

    nodes.set(getKey(startX, startY), openSet[0]);

    while (openSet.length > 0) {
      // Encontrar nodo con menor f
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift();
      const currentKey = getKey(current.x, current.y);
      
      // Si llegamos al destino, reconstruir el camino
      if (current.x === endX && current.y === endY) {
        const path = [];
        let node = current;
        while (node.parent) {
          path.unshift({ x: node.x, y: node.y });
          node = node.parent;
        }
        return path;
      }
      
      closedSet.add(currentKey);
      
      // Explorar vecinos (4 direcciones)
      const neighbors = [
        { x: current.x + 1, y: current.y },
        { x: current.x - 1, y: current.y },
        { x: current.x, y: current.y + 1 },
        { x: current.x, y: current.y - 1 }
      ];
      
      for (const neighbor of neighbors) {
        const { x, y } = neighbor;
        const neighborKey = getKey(x, y);
        
        // Verificar límites del mapa
        if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) continue;
        
        // Verificar si ya está en closed set
        if (closedSet.has(neighborKey)) continue;
        
        // Verificar si es caminable (excepto el destino)
        if (!(x === endX && y === endY) && !canWalk(x, y)) continue;

        const g = current.g + 1;
        const h = heuristic(x, y);
        const f = g + h;
        
        const existingNode = nodes.get(neighborKey);
        
        if (!existingNode || g < existingNode.g) {
          const newNode = { x, y, g, h, f, parent: current };
          nodes.set(neighborKey, newNode);
          
          if (!existingNode) {
            openSet.push(newNode);
          } else {
            // Actualizar nodo existente en openSet
            const index = openSet.findIndex(n => getKey(n.x, n.y) === neighborKey);
            if (index !== -1) {
              openSet[index] = newNode;
            }
          }
        }
      }
      
      // Límite de seguridad (evitar búsquedas infinitas)
      if (closedSet.size > 2000) {
        return null;
      }
    }
    
    // No se encontró camino
    return null;
  }, [canWalk]);
  // ------------------------------------------------------------
  // 3.18 Seguimiento de progreso por edificio
  // ------------------------------------------------------------

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
  }, [addNotification]);
  // ------------------------------------------------------------
  // 3.19 Seguimiento desactivado del NPC al jugador
  // ------------------------------------------------------------

  // Detectar si el jugador está en rango y calcular ruta (desactivado actualmente)
  useEffect(() => {
    // Comportamiento intencionalmente inactivo para conservar la lógica previa
    return;
  }, [avatar.x, avatar.y, npc.x, npc.y, findPath]);
  
  // Mover el NPC por la ruta hacia el jugador (desactivado)
  useEffect(() => {
    // Comportamiento intencionalmente inactivo para conservar la lógica previa
    return;
  }, [npc.x, npc.y]);

  // Efecto: Movimiento automático con mouse
  useEffect(() => {
    if (!targetPosition || pathToTarget.length === 0) return;
    if (enEdificio) return; // No mover si está dentro de un edificio
    
  const interval = setInterval(() => {
      setPathToTarget(prevPath => {
        if (prevPath.length === 0) {
          setTargetPosition(null);
          return [];
        }
        
        const nextPos = prevPath[0];
        const remainingPath = prevPath.slice(1);
        
        // Determinar dirección
        let newDir = avatar.dir;
        if (nextPos.x > avatar.x) newDir = "right";
        else if (nextPos.x < avatar.x) newDir = "left";
        else if (nextPos.y > avatar.y) newDir = "down";
        else if (nextPos.y < avatar.y) newDir = "up";
        
        // Mover avatar
        setAvatar(prev => ({
          ...prev,
          x: nextPos.x,
          y: nextPos.y,
          dir: newDir,
          step: (prev.step + 1) % 3 // Ciclo completo: 0 → 1 → 2 → 0
        }));
        
        return remainingPath;
      });
  }, autoPathIntervalMs); // Ajuste para un desplazamiento más pausado en rutas automáticas, más lento en móvil
    
    return () => clearInterval(interval);
  }, [targetPosition, pathToTarget, enEdificio, avatar.dir, avatar.x, avatar.y, autoPathIntervalMs]);
  // ------------------------------------------------------------
  // 3.20 Rutas predefinidas para NPC principales
  // ------------------------------------------------------------

  // Aplicar movimiento basado en rutas para cada NPC
  useNPCRouteMovement(npc, setNpc, NPC_ROUTES.ANDREA, avatar, NPC_ROUTE_CONFIG);
  useNPCRouteMovement(obrero, setObrero, NPC_ROUTES.OBRERO, avatar, NPC_ROUTE_CONFIG);
  useNPCRouteMovement(fernando, setFernando, NPC_ROUTES.FERNANDO, avatar, NPC_ROUTE_CONFIG);
  useNPCRouteMovement(pedro, setPedro, NPC_ROUTES.PEDRO, avatar, NPC_ROUTE_CONFIG);
  // ------------------------------------------------------------
  // 3.21 Detección de inactividad y recordatorios
  // ------------------------------------------------------------

  // Actualizar tiempo de última actividad cuando el avatar se mueve
  useEffect(() => {
    setLastMoveTime(Date.now());
    setInactivityWarningShown(false);
  }, [avatar.x, avatar.y]);

  // Detectar inactividad de 30 segundos
  useEffect(() => {
    if (enEdificio) return; // No mostrar mientras está en un edificio
    
    const checkInactivity = setInterval(() => {
      const timeSinceLastMove = Date.now() - lastMoveTime;
      const thirtySeconds = 30000;
      
      if (timeSinceLastMove >= thirtySeconds && !inactivityWarningShown) {
        addNotification(
          'info',
          '¿Sigues ahí?',
          'No te duermas... ¡Hay mucho por explorar!',
          '😴'
        );
        setInactivityWarningShown(true);
      }
    }, 5000); // Verificar cada 5 segundos
    
    return () => clearInterval(checkInactivity);
  }, [lastMoveTime, inactivityWarningShown, enEdificio, addNotification]);

  // Efecto: Entrar en edificios (detecta en qué puerta está el avatar)
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
  }, [avatar.x, avatar.y, showEducacion, showExperiencia, showSkills, showSkillsBuilding, showOtros, showProyectos, showContacto, showHobbies, showRRSS, enEdificio, autoEnterBuilding]);

  // Efecto: Movimiento del Avatar (teclado con control de velocidad)
  useEffect(() => {
    const keysPressed = new Set();
    let moveInterval = null;
    
    const handleKeyDown = (e) => {
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
          puertaSalida = lastDoorUsed || PUERTAS.SOBRE_MI[0]; // Usar la puerta por la que entró
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
          // Teletransportar NPC al lado del jugador mirándolo
          setNpc(prev => ({
            ...prev,
            x: puertaSalida.x + 1, // A la derecha del jugador
            y: puertaSalida.y + 1,
            dir: "left", // Mirando al jugador
            showPhrase: false // Resetear para forzar nueva frase
          }));
        }
        return;
      }
      
      // Hotkey H para abrir ayuda
      if ((e.key === 'h' || e.key === 'H') && !enEdificio) {
        setShowHelp(prev => !prev);
        return;
      }
      
      // Hotkey M para abrir minimapa
      if ((e.key === 'm' || e.key === 'M') && !enEdificio) {
        // Esta funcionalidad está en TopBar - solo como referencia
        return;
      }
      
      // Hotkey N para cambiar modo día/noche
      if ((e.key === 'n' || e.key === 'N') && !enEdificio) {
        setIsDarkMode(prev => !prev);
        return;
      }
      
      // No mover si está dentro del edificio, movimiento pausado, o modal de bienvenida activo
      if (enEdificio || movementPaused || showWelcome) return;
      
      // Agregar tecla presionada
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        // Ignorar eventos repetidos cuando se mantiene presionada la tecla
        if (e.repeat) return;
        
        keysPressed.add(e.key);
        
        // Cancelar movimiento automático del mouse
        setTargetPosition(null);
        setPathToTarget([]);
        
        // Iniciar intervalo si no existe
        if (!moveInterval) {
          moveInterval = setInterval(() => {
            if (keysPressed.size === 0) return;
            
            // Obtener la última tecla presionada
            let dx = 0, dy = 0, dir = "down";
            
            if (keysPressed.has("ArrowUp"))    { dy = -1; dir = "up"; }
            else if (keysPressed.has("ArrowDown"))  { dy = 1;  dir = "down"; }
            else if (keysPressed.has("ArrowLeft"))  { dx = -1; dir = "left"; }
            else if (keysPressed.has("ArrowRight")) { dx = 1;  dir = "right"; }
            
            setAvatar(prev => {
              const nextX = Math.max(0, Math.min(WIDTH - 1, prev.x + dx));
              const nextY = Math.max(0, Math.min(HEIGHT - 1, prev.y + dy));
              
              if (canWalk(nextX, nextY, true)) {
                setLastMoveTime(Date.now()); // Actualizar tiempo de último movimiento
                return { 
                  ...prev, 
                  x: nextX, 
                  y: nextY, 
                  dir, 
                  step: (prev.step + 1) % 3 // Ciclo completo: 0 → 1 → 2 → 0
                };
              } else {
                // Si hay colisión, cambiar dirección instantáneamente sin bloquear animación
                return { ...prev, dir, step: 0 };
              }
            });
          }, 70); // Ajuste a 70ms para un ritmo más pausado
        }
      }
    };
    
    const handleKeyUp = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        keysPressed.delete(e.key);
        
        // Detener intervalo si no hay teclas presionadas
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
  }, [showEducacion, showExperiencia, showSkills, showOtros, enEdificio, canWalk, showWelcome]);
  // ------------------------------------------------------------
  // 3.22 Handlers de interacción con la interfaz
  // ------------------------------------------------------------

  // Handler para navegación desde HUD Menu
  const handleNavigateToBuilding = useCallback((buildingId) => {
    const doorCoords = {
      EDUCACION: PUERTAS.EDUCACION,
      EXPERIENCIA: PUERTAS.EXPERIENCIA,
      SKILLS: PUERTAS.SKILLS,
      OTROS: PUERTAS.OTROS,
      PROYECTOS: PUERTAS.PROYECTOS,
      HOBBIES: PUERTAS.HOBBIES,
      RRSS: PUERTAS.RRSS,
      CONTACTO: PUERTAS.CONTACTO
    };

    const door = doorCoords[buildingId];
    if (door) {
      // Calcular ruta hasta la puerta exacta
      const target = { x: door.x, y: door.y };
      
      const path = findPath({ x: avatar.x, y: avatar.y }, target);
      if (path && path.length > 0) {
        setTargetPosition(target);
  setPathToTarget(path);
  // Programar entrada automática al llegar
  setAutoEnterBuilding(buildingId);
      } else if (avatar.x === door.x && avatar.y === door.y) {
        // Ya está en la puerta, abrir directamente
  setAutoEnterBuilding(buildingId);
  // Apertura manual si ya está en la puerta
        setTimeout(() => {
          switch(buildingId) {
            case 'EDUCACION':
              setShowEducacion(true);
              break;
            case 'EXPERIENCIA':
              setShowExperiencia(true);
              break;
            case 'SKILLS':
              setShowSkillsBuilding(true);
              break;
            case 'OTROS':
              setShowOtros(true);
              break;
            case 'PROYECTOS':
              setShowProyectos(true);
              break;
            case 'HOBBIES':
              setShowHobbies(true);
              break;
            case 'RRSS':
              setShowRRSS(true);
              break;
            case 'CONTACTO':
              setShowContacto(true);
              break;
            default:
              break;
          }
          setEnEdificio(true);
          markBuildingAsVisited(buildingId);
        }, 100);
      }
    }
  }, [avatar.x, avatar.y, canWalk, findPath, markBuildingAsVisited]);

  // Handler para resetear progreso
  const handleResetProgress = useCallback(() => {
    const resetVisited = { ...VISITED_BUILDINGS_DEFAULT };
    setVisitedBuildings(resetVisited);
    localStorage.setItem('portfolio-visited-buildings', JSON.stringify(resetVisited));
  addNotification('info', '🔄 Progreso Reseteado', 'Todo vuelve a cero, como tu café esta mañana. Listo para la siguiente ronda.', '✨');
    setShowResetConfirm(false);
  }, [addNotification]);

  const handleResetRequest = useCallback(() => {
    setShowResetConfirm(true);
  }, []);

  const handleCancelReset = useCallback(() => {
    setShowResetConfirm(false);
  }, []);

  // Handler para toggle del modo Recruiter
  const handleRecruiterModeToggle = useCallback((enabled) => {
    setRecruiterMode(enabled);
    if (enabled) {
      // Abrir el panel de recruiter
      setShowRecruiterPanel(true);
    } else {
      // Cerrar panel y todos los modales
      setShowRecruiterPanel(false);
      setShowEducacion(false);
      setShowExperiencia(false);
      setShowSkills(false);
      setShowSkillsBuilding(false);
      setShowOtros(false);
      setShowContacto(false);
      setShowRRSS(false);
      setShowHobbies(false);
      setShowProyectos(false);
    }
  }, []);
  // ------------------------------------------------------------
  // 3.23 Controles móviles y joystick digital
  // ------------------------------------------------------------
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
        setLastMoveTime(Date.now());
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
  }, [canWalk, setAvatar, setLastMoveTime]);

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
    }
  }, []);

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
        // Forzar apertura del modo Recruiter en móvil para evitar toggles dobles
        handleRecruiterModeToggle(true);
        break;
      case 'reset':
        handleResetRequest();
        break;
      case 'map':
        // Abrir minimap en modal para móviles
        setShowMinimapModal(true);
        break;
      default:
        setShowHelp(true);
    }
  }, [handleResetRequest, handleRecruiterModeToggle]);

  useEffect(() => {
    if (enEdificio) {
      handleMobileDirectionRelease(null);
    }
  }, [enEdificio, handleMobileDirectionRelease]);
  // ------------------------------------------------------------
  // 3.24 Renderizado del mapa y gestión de clics
  // ------------------------------------------------------------

  // Función para manejar clics en el mapa
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
    
    // Si hizo click en UI, no mover el avatar
    if (clickedOnUI) {
      return;
    }

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
  }, [enEdificio, cameraOffsetX, cameraOffsetY, TILE_SIZE, WIDTH, HEIGHT, canWalk, findPath, avatar.x, avatar.y, visitedBuildings, showWelcome]);
  // ------------------------------------------------------------
  // 3.25 Renderizado del escenario en JSX
  // ------------------------------------------------------------

  return (
    <div 
      className={`tilemap-root${enEdificio ? ' edificio' : ''}${isDarkMode ? ' night-mode' : ' day-mode'}`}
      onClick={handleMapClick}
      style={{
        width: `${containerWidth}px`,
        minWidth: `${containerWidth}px`,
        height: `${containerHeight}px`,
        minHeight: `${containerHeight}px`,
        maxWidth: `${MAP_PIXEL_WIDTH}px`,
        maxHeight: `${MAP_PIXEL_HEIGHT}px`,
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        position: 'relative'
      }}
    >
    {/* Oculta el mapa cuando la pantalla de bienvenida está activa */}
      {!showWelcome && (
        <div 
          className="tilemap-canvas"
          style={{
            left: -cameraOffsetX,
            top: -cameraOffsetY,
            width: WIDTH * TILE_SIZE,
            height: HEIGHT * TILE_SIZE
          }}
        >
        {/* Capa 1: Mapa base */}
        {MAP.map((row, y) => (
          <div key={y} className="tilemap-row">
            {row.map((tile, x) => {
              // Borde de depuración desactivado
              return (
                <img
                  key={x}
                  src={`${import.meta.env.BASE_URL}Tiles/tile_${tile.toString().padStart(4, "0")}.png`}
                  width={TILE_SIZE}
                  height={TILE_SIZE}
                  alt={`tile ${tile}`}
                  className={`tilemap-tile${WATER_TILES.includes(tile) ? ' water-tile' : ''}`}
                  loading="lazy"
                />
              );
            })}
          </div>
        ))}

        {/* Capa 2: Edificios */}
        {EDIFICIOS_RENDER.map((obj, i) => (
          typeof obj.tile !== "undefined" && (
            <img
              key={`edificio-${obj.x}-${obj.y}-${i}`}
              src={`${import.meta.env.BASE_URL}Tiles/tile_${obj.tile.toString().padStart(4, "0")}.png`}
              width={TILE_SIZE}
              height={TILE_SIZE}
              className={`tilemap-edificio${obj.flip ? ' flip-x' : ''}`}
              style={{ left: obj.x * TILE_SIZE, top: obj.y * TILE_SIZE }}
              alt={`edificio ${obj.tile}`}
              loading="lazy"
            />
          )
        ))}



        {/* Capa 3: Objetos decorativos */}
        {OBJECTS.map((obj, i) => {
          // Determinar si es farola, semáforo o señal de tráfico para asignar z-index correcto
          const isFarola = obj.tile && [169, 196, 164, 191, 165, 192].includes(obj.tile);
          const isSemaforo = obj.tile && [409].includes(obj.tile);
          const isSenal = obj.tile && [166, 193, 167, 194].includes(obj.tile); // STOP y CARTELITOS
          const cssClass = isFarola ? 'tilemap-farola' : (isSemaforo || isSenal) ? 'tilemap-semaforo' : 'tilemap-objeto';
          
          return (
            <React.Fragment key={`objeto-${obj.x}-${obj.y}-${i}`}>
              {typeof obj.tile !== "undefined" && (
                <img
                  src={`${import.meta.env.BASE_URL}Tiles/tile_${obj.tile.toString().padStart(4, "0")}.png`}
                  width={TILE_SIZE}
                  height={TILE_SIZE}
                  className={`${cssClass}${obj.flip && !obj.rotate ? ' flip-x' : ''}${obj.rotate ? ' rotate' + obj.rotate : ''}`}
                  style={{ left: obj.x * TILE_SIZE, top: obj.y * TILE_SIZE }}
                  alt={`objeto ${obj.tile}`}
                  loading="lazy"
                />
              )}
              {obj.text && (
                <span
                  className={`tilemap-cartel
                    ${obj.neon ? ' neon-sign' : ''}
                    ${obj.letter ? ' neon-letter' : ''}
                    ${obj.compact ? ' neon-compact' : ''}
                    ${obj.colorClass ? ' ' + obj.colorClass : ''}`}
                  style={{
                    left: obj.x * TILE_SIZE + (obj.tiles ? (TILE_SIZE * obj.tiles) / 2 : (TILE_SIZE * 3) / 2),
                    top: obj.y * TILE_SIZE + TILE_SIZE / 2,
                    width: obj.tiles ? TILE_SIZE * obj.tiles * 0.9 : TILE_SIZE * 3 * 0.9,
                    height: TILE_SIZE * 0.85,
                  }}
                >
                  {obj.text.toUpperCase()}
                </span>
              )}
            </React.Fragment>
          );
        })}

        {/* Capa 4: Efectos de luz (farolillos) */}
        {FAROLILLOS.map((f, idx) => (
          <div
            key={`farolillo-${idx}`}
            className="tilemap-farolillo"
            style={{ left: f.x * TILE_SIZE + TILE_SIZE / 2 - 4, top: f.y * TILE_SIZE + TILE_SIZE / 2 - 4 }}
          />
        ))}

        {/* Capa 4.3: Luces de semáforos (luz sutil) */}
        {SEMAFOROS.map((sem, idx) => (
          <div
            key={`traffic-light-${idx}`}
            className="tilemap-semaforo-light"
            style={{
              left: sem.x * TILE_SIZE + TILE_SIZE / 2 - 2,
              top: sem.y * TILE_SIZE + 8
            }}
          />
        ))}

        {/* Capa 4.5: Ventanas iluminadas (solo en modo noche y desktop) */}
        {!isMobileDevice && VENTANAS_ILUMINADAS.map((ventana, i) => (
          <div
            key={`window-${i}`}
            className="tilemap-window"
            style={{
              left: ventana.x * TILE_SIZE + (TILE_SIZE - ventana.width) / 2,
              top: ventana.y * TILE_SIZE + (TILE_SIZE - ventana.height) / 2,
              width: ventana.width,
              height: ventana.height
            }}
          />
        ))}

        {/* Capa 5: Avatar */}
        {!enEdificio && (
          <img
            src={`${import.meta.env.BASE_URL}Tiles/tile_${AVATAR_SPRITES[avatar.dir][avatar.step].toString().padStart(4, "0")}.png`}
            width={TILE_SIZE}
            height={TILE_SIZE}
            className={`tilemap-avatar ${avatar.teleporting ? 'teleporting' : ''} ${isOverlappingNPC ? 'overlapping-npc' : ''}`}
            style={{ left: avatar.x * TILE_SIZE, top: avatar.y * TILE_SIZE }}
            alt="avatar"
            loading="lazy"
          />
        )}

        {/* Capa 6: NPC */}
        <img
          src={`${import.meta.env.BASE_URL}Tiles/tile_${NPC_SPRITES[npc.dir][npc.moving ? npc.step : 0].toString().padStart(4, "0")}.png`}
          width={TILE_SIZE}
          height={TILE_SIZE}
          className="tilemap-npc"
          style={{ left: npc.x * TILE_SIZE, top: npc.y * TILE_SIZE }}
          alt="npc"
          loading="lazy"
        />
        {npc.showPhrase && (
          <div
            className="npc-bubble"
            style={{
              left: `calc(${npc.x * TILE_SIZE}px + ${TILE_SIZE / 2}px)`,
              top: `${npc.y * TILE_SIZE - 10}px`
            }}
          >
            {npc.phrase}
            <div className="npc-bubble-triangle" />
          </div>
        )}
        {/* Capa 7:Pedro NPC */}
        <img
          src={`${import.meta.env.BASE_URL}Tiles/tile_${PEDRO_SPRITES[pedro.dir][pedro.moving ? pedro.step : 0].toString().padStart(4, "0")}.png`}
          width={TILE_SIZE}
          height={TILE_SIZE}
          className="tilemap-npc"
          style={{ left: pedro.x * TILE_SIZE, top: pedro.y * TILE_SIZE }}
          alt="pedro"
          loading="lazy"
        />
        {pedro.showPhrase && (
          <div
            className="npc-bubble pedro-bubble"
            style={{
              left: `calc(${pedro.x * TILE_SIZE}px + ${TILE_SIZE / 2}px)`,
              top: `${pedro.y * TILE_SIZE - 10}px`
            }}
          >
            {pedro.phrase}
            <div className="npc-bubble-triangle" />
          </div>
        )}


        {/* Capa 7:Obrero NPC */}
        <img
          src={`${import.meta.env.BASE_URL}Tiles/tile_${OBRERO_SPRITES[obrero.dir][obrero.moving ? obrero.step : 0].toString().padStart(4, "0")}.png`}
          width={TILE_SIZE}
          height={TILE_SIZE}
          className="tilemap-npc"
          style={{ left: obrero.x * TILE_SIZE, top: obrero.y * TILE_SIZE }}
          alt="obrero"
          loading="lazy"
        />
        {obrero.showPhrase && (
          <div
            className="npc-bubble obrero-bubble"
            style={{
              left: `calc(${obrero.x * TILE_SIZE}px + ${TILE_SIZE / 2}px)`,
              top: `${obrero.y * TILE_SIZE - 10}px`
            }}
          >
            {obrero.phrase}
            <div className="npc-bubble-triangle" />
          </div>
        )}

        {/* Capa 8: Fernando NPC */}
        <img
          src={`${import.meta.env.BASE_URL}Tiles/tile_${FERNANDO_SPRITES[fernando.dir][fernando.moving ? fernando.step : 0].toString().padStart(4, "0")}.png`}
          width={TILE_SIZE}
          height={TILE_SIZE}
          className="tilemap-npc"
          style={{ left: fernando.x * TILE_SIZE, top: fernando.y * TILE_SIZE }}
          alt="fernando"
          loading="lazy"
        />
        {fernando.showPhrase && (
          <div
            className="npc-bubble fernando-bubble"
            style={{
              left: `calc(${fernando.x * TILE_SIZE}px + ${TILE_SIZE / 2}px)`,
              top: `${fernando.y * TILE_SIZE - 10}px`
            }}
          >
            {fernando.phrase}
            <div className="npc-bubble-triangle" />
          </div>
        )}

        {/* Coches NPC */}
        <CarsManager
          carsConfigs={CARS_CONFIG}
          avatar={avatar}
          tileSize={TILE_SIZE}
          isNightMode={isDarkMode}
          carsPositionsRef={carsPositionsRef}
        />

      </div>
  )}
  {/* Fin del bloque condicional del mapa */}

      {/* Modales Unificados con Lazy Loading y Suspense */}
      <Suspense fallback={<div style={{display: 'none'}} />}>
        <EducacionModal 
          isOpen={showEducacion} 
          onClose={() => handleCloseModal('EDUCACION', setShowEducacion)} 
        />
        
        <ExperienciaModal 
          isOpen={showExperiencia} 
          onClose={() => handleCloseModal('EXPERIENCIA', setShowExperiencia)} 
        />
        
        {/* Sobre Mí (desde edificio central con 2 puertas) */}
        <SobreMiModal 
          isOpen={showSkills}
          onClose={() => handleCloseModal('SOBRE_MI', setShowSkills)} 
        />
        
        {/* Skills Building (edificio de habilidades técnicas) */}
        <SkillsBuildingModal 
          isOpen={showSkillsBuilding}
          onClose={() => handleCloseModal('SKILLS', setShowSkillsBuilding)} 
        />
        
        <OtrosModal 
          isOpen={showOtros} 
          onClose={() => handleCloseModal('OTROS', setShowOtros)} 
        />
        
        <ProyectosModal 
          isOpen={showProyectos} 
          onClose={() => handleCloseModal('PROYECTOS', setShowProyectos)} 
        />
        
        <ContactoModal 
          isOpen={showContacto} 
          onClose={() => handleCloseModal('CONTACTO', setShowContacto)} 
        />
        
        <HobbiesModal 
          isOpen={showHobbies} 
          onClose={() => handleCloseModal('HOBBIES', setShowHobbies)} 
        />
        
        <RRSSModal 
          isOpen={showRRSS} 
          onClose={() => handleCloseModal('RRSS', setShowRRSS)} 
        />
        
        <HelpModal
          isOpen={showHelp}
          onClose={() => setShowHelp(false)}
        />
        
        {/* Pantalla de bienvenida (aparece siempre al cargar) */}
        <WelcomeScreen
          isOpen={showWelcome}
          onEnter={() => setShowWelcome(false)}
        />
        
        {/* Modal del minimap para móviles */}
        <BuildingModal
          isOpen={showMinimapModal}
          onClose={() => setShowMinimapModal(false)}
          title="Mapa del Mundo"
          icon="🗺️"
          maxWidth="95vw"
          maxHeight="90vh"
        >
          <div style={{ 
            width: '100%', 
            height: '70vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            overflow: 'auto'
          }}>
            <FixedMinimap 
              avatar={avatar}
              buildings={PUERTAS}
              visitedBuildings={visitedBuildings}
              npcs={[npc, obrero, fernando, pedro]}
              onTeleport={(x, y) => {
                handleTeleport(x, y);
                setShowMinimapModal(false); // Cerrar modal al teletransportar
              }}
              canWalkFunction={canWalk}
              isMobile={true}
            />
          </div>
        </BuildingModal>
      </Suspense>
      
  {/* Barra superior unificada */}
  {/* Oculta la TopBar cuando la pantalla de bienvenida está activa */}
      {!enEdificio && !showWelcome && (
        <TopBar
          visitedBuildings={visitedBuildings}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          onShowHelp={() => setShowHelp(true)}
          onNavigate={handleNavigateToBuilding}
          recruiterMode={recruiterMode}
          onToggleRecruiterMode={handleRecruiterModeToggle}
          onResetProgress={handleResetRequest}
        />
      )}

  {/* Minimap fijo mejorado */}
  {/* Oculta el minimapa cuando hay modales activos */}
      {!enEdificio && !showWelcome && !showHelp && !showEducacion && !showExperiencia && !showSkills && !showSkillsBuilding && !showOtros && !showProyectos && !showContacto && !showHobbies && !showRRSS && !showRecruiterPanel && !showMinimapModal && (
        <FixedMinimap
          avatar={avatar}
          buildings={PUERTAS}
          visitedBuildings={visitedBuildings}
          npcs={[npc, obrero, fernando, pedro]}
          onTeleport={handleTeleport}
          canWalkFunction={canWalk}
          isMobile={isMobile}
        />
      )}

      {/* Panel de Recruiter */}
      <RecruiterPanel 
        isOpen={showRecruiterPanel} 
        onClose={() => {
          console.log('RecruiterPanel onClose triggered');
          setShowRecruiterPanel(false);
          setRecruiterMode(false);
        }}
        onOpenProjects={() => setShowProyectos(true)}
      />

      {/* Sistema de Notificaciones */}
      <Notification 
        notifications={notifications} 
        onDismiss={removeNotification} 
      />


  {/* Mobile Joystick - Controles táctiles para móvil */}
  {/* Oculta el joystick cuando la pantalla de bienvenida está activa */}
      {!showWelcome && (
        <MobileJoystick
          onDirectionPress={handleMobileDirectionPress}
          onDirectionRelease={handleMobileDirectionRelease}
          onMenuButton={handleMobileMenuButton}
          visitedBuildings={visitedBuildings}
          animatedProgress={progressPercent}
          totalBuildings={totalBuildingsCount}
          movementLocked={enEdificio}
        />
      )}

      {showResetConfirm && (
        <ResetConfirmModal
          onConfirm={handleResetProgress}
          onCancel={handleCancelReset}
        />
      )}
    </div>
  );
}

// Fin del componente TileMapPNG

export default TileMapPNG;
