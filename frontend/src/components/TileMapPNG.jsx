// ============================================================
// 1. IMPORTACIONES Y CARGA DIFERIDA
// ============================================================
import React, { useState, useEffect, useMemo, useCallback, useRef, lazy, Suspense } from "react";
import Tile from './Tile';

// ------------------------------------------------------------
// 1.1 Hooks personalizados
// ------------------------------------------------------------
import { useGameState } from '../hooks/useGameState';
import { useMapObjects } from '../hooks/useMapObjects';
import { useDecorativeObjects } from '../hooks/useDecorativeObjects';
import { useViewport } from '../hooks/useViewport';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { usePathfinding } from '../hooks/usePathfinding';
import { useNPCInteraction } from '../hooks/useNPCInteraction';
import { useInactivityDetection } from '../hooks/useInactivityDetection';
import { useModalHandlers } from '../hooks/useModalHandlers';
import { useMapClick } from '../hooks/useMapClick';
import { useBuildingEntrance } from '../hooks/useBuildingEntrance';
import { useAutoPathMovement } from '../hooks/useAutoPathMovement';
import { useCollisionDetection } from '../hooks/useCollisionDetection';
import { useCameraPosition } from '../hooks/useCameraPosition';
import { useBuildingProgress } from '../hooks/useBuildingProgress';
import { useMobileControls } from '../hooks/useMobileControls';

// ------------------------------------------------------------
// 1.2 Modales con carga diferida
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
// 1.3 Componentes de interfaz
// ------------------------------------------------------------
import RecruiterPanel from './RecruiterPanel';
import Notification, { useNotifications } from './Notification';
import TopBar from './TopBar';
import MobileJoystick from './MobileJoystick';
import FixedMinimap from './FixedMinimap';
import ResetConfirmModal from './ResetConfirmModal';

// ------------------------------------------------------------
// 1.4 Utilidades de mapa
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
  CARS_CONFIG,
  isNearby
} from "../utils/mapConfig";
import { VENTANAS_ILUMINADAS } from "../utils/mapConstants";

// ------------------------------------------------------------
// 1.5 Sistema de frases y rutas de NPCs
// ------------------------------------------------------------
import { getContextualNPCPhrase, getObreroPhrase, getFernandoPhrase, getPedroPhrase } from "../utils/npcPhrases";
import { NPC_ROUTES, NPC_ROUTE_CONFIG } from "../utils/npcRoutes";
import { useNPCRouteMovement } from "../hooks/useNPCRouteMovement";

// ------------------------------------------------------------
// 1.6 Sistema de vehículos y estilos
// ------------------------------------------------------------
import CarsManager from './CarsManager';
import './TileMapPNG.css';

// ============================================================
// 2. CONSTANTES Y CONFIGURACIÓN
// ============================================================

// ------------------------------------------------------------
// 2.1 Texto de bienvenida del NPC
// ------------------------------------------------------------
const WELCOME_NPC_PHRASE = "¡Bienvenido a mi ciudad! 🌟 Explora los edificios y descubre mi mundo.";

// ------------------------------------------------------------
// 2.2 Estado inicial de edificios visitados
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
// 2.3 Dimensiones del mapa
// ------------------------------------------------------------
const MAP_PIXEL_WIDTH = WIDTH * TILE_SIZE;
const MAP_PIXEL_HEIGHT = HEIGHT * TILE_SIZE;

// ============================================================
// 3. COMPONENTE PRINCIPAL TILEMAPPNG
// ============================================================
function TileMapPNG() {
  // ------------------------------------------------------------
  // 3.1 Hook de estado del juego (centralizado)
  // ------------------------------------------------------------
  const gameState = useGameState();
  const {
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
  } = gameState;

  // Estados de modales individuales (para compatibilidad con código existente)
  const showEducacion = modals.educacion;
  const setShowEducacion = (value) => setModals(prev => ({ ...prev, educacion: value }));
  const showExperiencia = modals.experiencia;
  const setShowExperiencia = (value) => setModals(prev => ({ ...prev, experiencia: value }));
  const showSkills = modals.skills;
  const setShowSkills = (value) => setModals(prev => ({ ...prev, skills: value }));
  const showSkillsBuilding = modals.skillsBuilding;
  const setShowSkillsBuilding = (value) => setModals(prev => ({ ...prev, skillsBuilding: value }));
  const showOtros = modals.otros;
  const setShowOtros = (value) => setModals(prev => ({ ...prev, otros: value }));
  const showProyectos = modals.proyectos;
  const setShowProyectos = (value) => setModals(prev => ({ ...prev, proyectos: value }));
  const showContacto = modals.contacto;
  const setShowContacto = (value) => setModals(prev => ({ ...prev, contacto: value }));
  const showHobbies = modals.hobbies;
  const setShowHobbies = (value) => setModals(prev => ({ ...prev, hobbies: value }));
  const showRRSS = modals.rrss;
  const setShowRRSS = (value) => setModals(prev => ({ ...prev, rrss: value }));
  const showRecruiterPanel = modals.recruiterPanel;
  const setShowRecruiterPanel = (value) => setModals(prev => ({ ...prev, recruiterPanel: value }));
  const showResetConfirm = modals.resetConfirm;
  const setShowResetConfirm = (value) => setModals(prev => ({ ...prev, resetConfirm: value }));
  const showHelp = modals.help;
  const setShowHelp = (value) => setModals(prev => ({ ...prev, help: value }));
  const showMinimapModal = modals.minimapModal;
  const setShowMinimapModal = (value) => setModals(prev => ({ ...prev, minimapModal: value }));
  const showWelcome = modals.welcome;
  const setShowWelcome = (value) => {
    console.log('🎮 [TileMapPNG] Modal de bienvenida cambiado a:', value);
    setModals(prev => ({ ...prev, welcome: value }));
  };

  // Alterna el modo día/noche
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // ------------------------------------------------------------
  // 3.1b Hook de viewport (viewport, mobile detection, etc.)
  // ------------------------------------------------------------
  const { viewportSize, isMobile, isMobileDevice, autoPathIntervalMs } = useViewport();

  // ------------------------------------------------------------
  // 3.2 Estados locales adicionales (no en el hook global)
  // ------------------------------------------------------------
  // Estado para pausar movimiento durante interacción con UI
  const [movementPaused, setMovementPaused] = useState(false);

  // ------------------------------------------------------------
  // 3.3 Sistema de notificaciones y recordatorios
  // ------------------------------------------------------------
  const { notifications, addNotification, removeNotification } = useNotifications();
  
  // ------------------------------------------------------------
  // 3.4 Gestión del cierre de modales y retorno al mapa (hook)
  // ------------------------------------------------------------
  const { handleCloseModal, handleTeleport } = useModalHandlers(
    setModals,
    setAvatar,
    setEnEdificio,
    setNpc,
    setLastDoorUsed,
    visitedBuildings,
    lastDoorUsed,
    addNotification
  );

  // ------------------------------------------------------------
  // 3.5 Movimiento automático y soporte de minimapa
  // ------------------------------------------------------------
  const [targetPosition, setTargetPosition] = useState(null);
  const [pathToTarget, setPathToTarget] = useState([]);
  const [autoEnterBuilding, setAutoEnterBuilding] = useState(null);
  const [recruiterMode, setRecruiterMode] = useState(false);

  // ------------------------------------------------------------
  // 3.5b Detección de inactividad (hook)
  // ------------------------------------------------------------
  const { lastMoveTime, warningShown: inactivityWarningShown } = useInactivityDetection(
    avatar,
    enEdificio,
    addNotification
  );

  // ------------------------------------------------------------
  // 3.6 Métricas de progreso del jugador
  // ------------------------------------------------------------

  const totalBuildingsCount = Object.keys(visitedBuildings).length;
  const visitedBuildingsCount = Object.values(visitedBuildings).filter(Boolean).length;
  const progressPercent = totalBuildingsCount > 0
    ? (visitedBuildingsCount / totalBuildingsCount) * 100
    : 0;

  // ------------------------------------------------------------
  // 3.9 Efectos para adaptación por dispositivo e inactividad
  // ------------------------------------------------------------
  // (código de isMobileDevice eliminado - ahora viene del hook useViewport)

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
    if (!avatar.moving && avatar.step !== 0) {
      const timer = setTimeout(() => {
        setAvatar(prev => ({ ...prev, step: 0 }));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [avatar.moving, avatar.step]);
  // Interacciones con NPC principal (Andrea)
  useNPCInteraction(
    avatar,
    npc,
    setNpc,
    () => getContextualNPCPhrase(visitedBuildings, isDarkMode, lastBuildingVisited),
    1,
    4000,
    !showingWelcomeMessage
  );

  // Interacciones con Obrero
  useNPCInteraction(
    avatar,
    obrero,
    setObrero,
    getObreroPhrase,
    1,
    4000,
    true
  );

  // Interacciones con Pedro
  useNPCInteraction(
    avatar,
    pedro,
    setPedro,
    getPedroPhrase,
    1,
    4000,
    true
  );

  // Interacciones con Fernando
  useNPCInteraction(
    avatar,
    fernando,
    setFernando,
    getFernandoPhrase,
    1,
    4000,
    true
  );

  // Limpiar lastBuildingVisited después de mostrarlo
  useEffect(() => {
    if (lastBuildingVisited && npc.showPhrase) {
      const timer = setTimeout(() => setLastBuildingVisited(null), 500);
      return () => clearTimeout(timer);
    }
  }, [lastBuildingVisited, npc.showPhrase]);

  // ------------------------------------------------------------
  // 3.11 Hooks de objetos del mapa (edificios y decoraciones)
  // ------------------------------------------------------------
  const { EDIFICIOS_RENDER } = useMapObjects();
  const { OBJECTS } = useDecorativeObjects();
  
  // ------------------------------------------------------------
  // 3.12 Puertas transitables y malla de colisiones
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
  // 3.14 Validación de tiles caminables (usando hook)
  // ------------------------------------------------------------
  const { canWalk } = useCollisionDetection({
    COLLISION_OBJECTS,
    carsPositionsRef,
    npc,
    obrero,
    fernando,
    pedro
  });
  
  // ------------------------------------------------------------
  // 3.16 Cálculo de cámara y centrado del mapa (usando hook)
  // ------------------------------------------------------------
  const {
    cameraOffsetX,
    cameraOffsetY,
    VIEWPORT_PIXEL_WIDTH,
    VIEWPORT_PIXEL_HEIGHT,
    containerWidth,
    containerHeight
  } = useCameraPosition({
    avatar,
    viewportSize,
    MAP_PIXEL_WIDTH,
    MAP_PIXEL_HEIGHT
  });

  // ------------------------------------------------------------
  // 3.17 Pathfinding y efectos de desplazamiento
  // ------------------------------------------------------------

  // Hook de pathfinding A* (ahora desde hook personalizado)
  const findPathInternal = usePathfinding(WIDTH, HEIGHT, canWalk);
  
  // Wrapper para mantener compatibilidad con la firma anterior
  const findPath = useCallback((start, end) => {
    return findPathInternal(start.x, start.y, end.x, end.y);
  }, [findPathInternal]);

  // ------------------------------------------------------------
  // 3.18 Seguimiento de progreso por edificio (usando hook)
  // ------------------------------------------------------------
  const { markBuildingAsVisited } = useBuildingProgress({
    visitedBuildings,
    setVisitedBuildings,
    notificationShownRef,
    addNotification
  });
  
  // ------------------------------------------------------------
  // 3.19 Movimiento automático con mouse (pathfinding visual)
  // ------------------------------------------------------------
  // 3.19 Movimiento automático con pathfinding (click en el mapa)
  // ------------------------------------------------------------
  useAutoPathMovement({
    targetPosition,
    pathToTarget,
    setPathToTarget,
    setTargetPosition,
    enEdificio,
    autoPathIntervalMs,
    setAvatar
  });

  // ------------------------------------------------------------
  // 3.20 Rutas predefinidas para NPC principales
  // ------------------------------------------------------------

  // Aplicar movimiento basado en rutas para cada NPC
  useNPCRouteMovement(npc, setNpc, NPC_ROUTES.ANDREA, avatar, NPC_ROUTE_CONFIG);
  useNPCRouteMovement(obrero, setObrero, NPC_ROUTES.OBRERO, avatar, NPC_ROUTE_CONFIG);
  useNPCRouteMovement(fernando, setFernando, NPC_ROUTES.FERNANDO, avatar, NPC_ROUTE_CONFIG);
  useNPCRouteMovement(pedro, setPedro, NPC_ROUTES.PEDRO, avatar, NPC_ROUTE_CONFIG);
  
  // ------------------------------------------------------------
  // 3.21 Entrada a edificios (detecta en qué puerta está el avatar)
  // ------------------------------------------------------------
  useBuildingEntrance({
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
  });

  // ------------------------------------------------------------
  // 3.21b Controles de teclado (movimiento, hotkeys, cerrar modales)
  // ------------------------------------------------------------
  useKeyboardControls({
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
  // 3.23 Controles móviles y joystick digital (usando hook)
  // ------------------------------------------------------------
  const {
    handleMobileDirectionPress,
    handleMobileDirectionRelease,
    handleMobileMenuButton
  } = useMobileControls({
    enEdificio,
    canWalk,
    setAvatar,
    setShowHelp,
    setIsDarkMode,
    handleRecruiterModeToggle
  });

  // ------------------------------------------------------------
  // 3.24 Manejo de clics en el mapa (pathfinding + entrada a edificios)
  // ------------------------------------------------------------
  const handleMapClick = useMapClick({
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
  });

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
        overflow: 'visible', // Permitir que el avatar sobresalga
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
        {/* Tiles que deben renderizarse desde el spritesheet secundario */}
        {/** Puedes modificar este set según los índices secundarios que necesites */}
        {(() => {
          const TILES_SECUNDARIOS = new Set([511, 743, 744, 745, 706, 707, 708, 748, 746, 821, 747, 710, 711,709 , 820, 822]);
          return MAP.map((row, y) => (
            <div key={y} className="tilemap-row">
              {row.map((tile, x) => {
                // Usar 'secondary' para los tiles secundarios, 'main' para el resto
                const spritesheet = TILES_SECUNDARIOS.has(tile) ? 'secondary' : 'main';
                return (
                  <Tile 
                    key={x}
                    index={tile} 
                    size={TILE_SIZE}
                    className={`tilemap-tile`}
                    spritesheet={spritesheet}
                  />
                );
              })}
            </div>
          ));
        })()}

        {/* Capa 2: Edificios */}
        {EDIFICIOS_RENDER.map((obj, i) => (
          typeof obj.tile !== "undefined" && (
            <div
              key={`edificio-${obj.x}-${obj.y}-${i}`}
              className={`tilemap-edificio${obj.flip ? ' flip-x' : ''}`}
              style={{ left: obj.x * TILE_SIZE, top: obj.y * TILE_SIZE, position: 'absolute' }}
            >
              <Tile 
                index={obj.tile} 
                size={TILE_SIZE} 
                flip={obj.flip}
                spritesheet={obj.spritesheet || 'main'}
              />
            </div>
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
                <div
                  className={`${cssClass}${obj.rotate ? ' rotate' + obj.rotate : ''}`}
                  style={{ left: obj.x * TILE_SIZE, top: obj.y * TILE_SIZE, position: 'absolute' }}
                >
                  {obj.image ? (
                    <img
                      src={`${import.meta.env.BASE_URL}Tiles/${obj.image}`}
                      width={TILE_SIZE}
                      height={TILE_SIZE}
                      style={{ display: 'block', imageRendering: 'pixelated' }}
                      alt=""
                    />
                  ) : (
                    <Tile 
                      index={obj.tile} 
                      size={TILE_SIZE} 
                      flip={obj.flip}
                      spritesheet={obj.spritesheet || 'main'}
                    />
                  )}
                </div>
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
              top: `${sem.y * TILE_SIZE + 8}px`
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
          <Tile
            index={AVATAR_SPRITES[avatar.dir][avatar.step]}
            size={TILE_SIZE}
            spritesheet="avatar"
            className={`tilemap-avatar ${avatar.teleporting ? 'teleporting' : ''} ${isOverlappingNPC ? 'overlapping-npc' : ''}`}
            style={{
              left: avatar.x * TILE_SIZE + TILE_SIZE / 2,
              top: avatar.y * TILE_SIZE,
            }}
          />
        )}

        {/* Capa 6: NPC */}
        <Tile
          index={NPC_SPRITES[npc.dir][npc.moving ? npc.step : 0]}
          size={TILE_SIZE}
          spritesheet="npc"
          className="tilemap-npc"
          style={{
            left: npc.x * TILE_SIZE + TILE_SIZE / 2,
            top: npc.y * TILE_SIZE,
          }}
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
        <div
          className="tilemap-npc pedro"
          style={{
            position: 'absolute',
            left: pedro.x * TILE_SIZE + TILE_SIZE / 2,
            top: pedro.y * TILE_SIZE,
          }}
        >
          <Tile
            index={PEDRO_SPRITES[pedro.dir][pedro.moving ? pedro.step : 0]}
            size={TILE_SIZE}
            spritesheet="pedro"
          />
        </div>
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
        <div
          className="tilemap-npc obrero"
          style={{
            position: 'absolute',
            left: obrero.x * TILE_SIZE + TILE_SIZE / 2,
            top: obrero.y * TILE_SIZE,
          }}
        >
          <Tile
            index={OBRERO_SPRITES[obrero.dir][obrero.moving ? obrero.step : 0]}
            size={TILE_SIZE}
            spritesheet="obrero"
          />
        </div>
        {obrero.showPhrase && (
          <div
            className="npc-bubble"
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
        <div
          className="tilemap-npc fernando"
          style={{
            position: 'absolute',
            left: fernando.x * TILE_SIZE + TILE_SIZE / 2,
            top: fernando.y * TILE_SIZE,
          }}
        >
          <Tile
            index={FERNANDO_SPRITES[fernando.dir][fernando.moving ? fernando.step : 0]}
            size={TILE_SIZE}
            spritesheet="fernando"
          />
        </div>
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
          onClose={() => handleCloseModal('EDUCACION', 'educacion')} 
        />
        
        <ExperienciaModal 
          isOpen={showExperiencia} 
          onClose={() => handleCloseModal('EXPERIENCIA', 'experiencia')} 
        />
        
        {/* Sobre Mí (desde edificio central con 2 puertas) */}
        <SobreMiModal 
          isOpen={showSkills}
          onClose={() => handleCloseModal('SOBRE_MI', 'skills')} 
        />
        
        {/* Skills Building (edificio de habilidades técnicas) */}
        <SkillsBuildingModal 
          isOpen={showSkillsBuilding}
          onClose={() => handleCloseModal('SKILLS', 'skillsBuilding')} 
        />
        
        <OtrosModal 
          isOpen={showOtros} 
          onClose={() => handleCloseModal('OTROS', 'otros')} 
        />
        
        <ProyectosModal 
          isOpen={showProyectos} 
          onClose={() => handleCloseModal('PROYECTOS', 'proyectos')} 
        />
        
        <ContactoModal 
          isOpen={showContacto} 
          onClose={() => handleCloseModal('CONTACTO', 'contacto')} 
        />
        
        <HobbiesModal 
          isOpen={showHobbies} 
          onClose={() => handleCloseModal('HOBBIES', 'hobbies')} 
        />
        
        <RRSSModal 
          isOpen={showRRSS} 
          onClose={() => handleCloseModal('RRSS', 'rrss')} 
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
