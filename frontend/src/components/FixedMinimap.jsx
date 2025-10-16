
// ============================================================
// FIXEDMINIMAP - MINIMAPA INTERACTIVO CON TELETRANSPORTE
// Muestra un minimapa fijo (desktop) o modal (móvil) con feedback visual y validación de colisiones
// ============================================================

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './FixedMinimap.css';
import BuildingModal from './BuildingModal';

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
function FixedMinimap({ 
  avatar, 
  buildings, 
  visitedBuildings, 
  onTeleport,
  canWalkFunction,
  isMobile = false
}) {
  // ============================================================
  // 1. ESTADO LOCAL (UI Y EFECTOS)
  // ============================================================
  // Controla hover, efecto de click y apertura de modal móvil
  const [isHovered, setIsHovered] = useState(false);
  const [clickEffect, setClickEffect] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // ============================================================
  // 2. CONSTANTES DE MAPA Y ESCALADO
  // ============================================================
  // Dimensiones del mapa lógico y del canvas del minimapa
  const MAP_WIDTH = 45;
  const MAP_HEIGHT = 30;
  const MINIMAP_WIDTH = 220;
  const MINIMAP_HEIGHT = (MINIMAP_WIDTH * MAP_HEIGHT) / MAP_WIDTH;
  const scaleX = MINIMAP_WIDTH / MAP_WIDTH;
  const scaleY = MINIMAP_HEIGHT / MAP_HEIGHT;

  // ============================================================
  // 3. DATOS DE EDIFICIOS (ICONO Y COLOR)
  // ============================================================
  // Diccionario con icono y color para cada tipo de edificio
  const buildingData = {
    EDUCACION: { icon: '🎓', color: '#4CAF50' },
    EXPERIENCIA: { icon: '💼', color: '#2196F3' },
    SOBRE_MI: { icon: '👩‍💻', color: '#8B5CF6' },
    SKILLS: { icon: '⚡', color: '#FF9800' },
    OTROS: { icon: '📜', color: '#9C27B0' },
    PROYECTOS: { icon: '🚀', color: '#F44336' },
    HOBBIES: { icon: '🎮', color: '#E91E63' },
    RRSS: { icon: '🌐', color: '#00BCD4' },
    CONTACTO: { icon: '📧', color: '#607D8B' }
  };

  // ============================================================
  // 4. LÓGICA: BÚSQUEDA DE PUNTO CAMINABLE (BFS)
  // ============================================================
  // Busca el punto más cercano al click donde el avatar puede caminar
  const findNearestValidPoint = (targetX, targetY, maxRadius = 10) => {
    const snapX = Math.round(targetX);
    const snapY = Math.round(targetY);
    if (canWalkFunction(snapX, snapY, false)) {
      return { x: snapX, y: snapY };
    }
    const queue = [{ x: snapX, y: snapY, dist: 0 }];
    const visited = new Set([`${snapX},${snapY}`]);
    while (queue.length > 0) {
      const { x, y, dist } = queue.shift();
      if (dist > maxRadius) break;
      const directions = [
        [0, -1], [0, 1], [-1, 0], [1, 0],
        [-1, -1], [-1, 1], [1, -1], [1, 1]
      ];
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        const key = `${nx},${ny}`;
        if (visited.has(key)) continue;
        if (nx < 0 || nx >= MAP_WIDTH || ny < 0 || ny >= MAP_HEIGHT) continue;
        visited.add(key);
        if (canWalkFunction(nx, ny, false)) {
          return { x: nx, y: ny };
        }
        queue.push({ x: nx, y: ny, dist: dist + 1 });
      }
    }
    // Si no se encuentra punto válido, devuelve null
    console.warn(`⚠️ No se encontró punto válido cerca de (${snapX}, ${snapY}) en radio ${maxRadius}`);
    return null;
  };

  // ============================================================
  // 5. HANDLER: CLICK EN EL MINIMAPA (TELETRANSPORTE Y FEEDBACK)
  // ============================================================
  // Gestiona el click en el minimapa: busca punto válido, muestra efecto y teletransporta
  const handleMapClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const mapX = (clickX / rect.width) * MAP_WIDTH;
    const mapY = (clickY / rect.height) * MAP_HEIGHT;
    const validPoint = findNearestValidPoint(mapX, mapY, 10);
    if (validPoint) {
      setClickEffect({ x: clickX, y: clickY });
      setTimeout(() => setClickEffect(null), 1000);
      onTeleport(validPoint.x, validPoint.y);
      if (isMobile) {
        setTimeout(() => setIsOpen(false), 300);
      }
    } else {
      // Si el área está bloqueada, muestra shake
      const minimapEl = e.currentTarget.closest('.fixed-minimap, .minimap-mobile-canvas');
      if (minimapEl) {
        minimapEl.classList.add('minimap-shake');
        setTimeout(() => minimapEl.classList.remove('minimap-shake'), 500);
      }
      console.warn('❌ No se puede teletransportar: área bloqueada');
    }
  };

  // ============================================================
  // 6. HANDLER: ABRIR/CERRAR MODAL EN MÓVIL
  // ============================================================
  // Alterna la apertura del modal del minimapa en móvil
  const toggleMinimap = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // ============================================================
  // 7. UI: RENDERIZADO MÓVIL (MODAL + CANVAS RESPONSIVE)
  // ============================================================
  if (isMobile) {
    return (
      <>
        {/* Botón flotante para abrir el minimapa en móvil */}
        <button
          className="minimap-mobile-button"
          onClick={toggleMinimap}
          aria-label="Abrir mapa"
        >
          🗺️
        </button>
        <BuildingModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Mapa Interactivo"
          icon="🗺️"
          maxWidth="90%"
          maxHeight="90%"
        >
          <div
            className="minimap-mobile-canvas"
            onClick={handleMapClick}
          >
            {/* Grid de fondo */}
            <div className="fixed-minimap-grid" />
            {/* Avatar del jugador */}
            {avatar && (
              <div
                className="fixed-minimap-avatar"
                style={{
                  left: `${(avatar.x / MAP_WIDTH) * 100}%`,
                  top: `${(avatar.y / MAP_HEIGHT) * 100}%`,
                }}
                title="Tu posición"
              >
                <div className="fixed-minimap-avatar-dot" />
                <div className="fixed-minimap-avatar-pulse" />
              </div>
            )}
            {/* Edificios (iconos) */}
            {buildings && Object.entries(buildings).map(([name, coords]) => {
              const data = buildingData[name];
              const isVisited = visitedBuildings?.[name];
              if (!data || !coords) return null;
              const buildingCoords = Array.isArray(coords) ? coords[0] : coords;
              return (
                <div
                  key={name}
                  className={`fixed-minimap-building ${isVisited ? 'visited' : ''}`}
                  style={{
                    left: `${(buildingCoords.x / MAP_WIDTH) * 100}%`,
                    top: `${(buildingCoords.y / MAP_HEIGHT) * 100}%`,
                    '--building-color': data.color
                  }}
                  title={`${data.icon} ${name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    const validPoint = findNearestValidPoint(buildingCoords.x, buildingCoords.y, 10);
                    if (validPoint) {
                      onTeleport(validPoint.x, validPoint.y);
                      setTimeout(() => setIsOpen(false), 300);
                    }
                  }}
                >
                  {data.icon}
                </div>
              );
            })}
            {/* Efecto de click (ping visual) */}
            {clickEffect && (
              <div
                className="minimap-click-effect"
                style={{
                  left: `${clickEffect.x}px`,
                  top: `${clickEffect.y}px`
                }}
              />
            )}
          </div>
          {/* Hint inferior para el usuario */}
          <div className="minimap-mobile-hint">
            Toca cualquier punto para teletransportarte
          </div>
        </BuildingModal>
      </>
    );
  }

  // ============================================================
  // 8. UI: RENDERIZADO DESKTOP (MINIMAPA FIJO)
  // ============================================================
  return (
    <div 
      className={`fixed-minimap ${isHovered ? 'fixed-minimap-hover' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Título del minimapa */}
      <div className="fixed-minimap-title">
        🗺️ Mapa
      </div>
      {/* Canvas del minimapa */}
      <div 
        className="fixed-minimap-canvas"
        style={{ 
          width: `${MINIMAP_WIDTH}px`, 
          height: `${MINIMAP_HEIGHT}px` 
        }}
        onClick={handleMapClick}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        title="Click para teletransportarte"
      >
        {/* Grid de fondo */}
        <div className="fixed-minimap-grid" />
        {/* Avatar del jugador */}
        {avatar && (
          <div
            className="fixed-minimap-avatar"
            style={{
              left: `${avatar.x * scaleX}px`,
              top: `${avatar.y * scaleY}px`,
            }}
            title="Tu posición"
          >
            <div className="fixed-minimap-avatar-dot" />
            <div className="fixed-minimap-avatar-pulse" />
          </div>
        )}
        {/* Edificios (iconos) */}
        {buildings && Object.entries(buildings).map(([name, coords]) => {
          const data = buildingData[name];
          const isVisited = visitedBuildings?.[name];
          if (!data || !coords) return null;
          const buildingCoords = Array.isArray(coords) ? coords[0] : coords;
          return (
            <div
              key={name}
              className={`fixed-minimap-building ${isVisited ? 'visited' : ''}`}
              style={{
                left: `${buildingCoords.x * scaleX}px`,
                top: `${buildingCoords.y * scaleY}px`,
                '--building-color': data.color
              }}
              title={`${data.icon} ${name}`}
              onClick={(e) => {
                e.stopPropagation();
                const validPoint = findNearestValidPoint(buildingCoords.x, buildingCoords.y, 10);
                if (validPoint) {
                  setClickEffect({ 
                    x: buildingCoords.x * scaleX, 
                    y: buildingCoords.y * scaleY 
                  });
                  setTimeout(() => setClickEffect(null), 1000);
                  onTeleport(validPoint.x, validPoint.y);
                }
              }}
            >
              {data.icon}
            </div>
          );
        })}
        {/* Efecto de click (ping visual) */}
        {clickEffect && (
          <div
            className="minimap-click-effect"
            style={{
              left: `${clickEffect.x}px`,
              top: `${clickEffect.y}px`
            }}
          />
        )}
      </div>
      {/* Hint inferior para el usuario */}
      <div className="fixed-minimap-hint">
        Click para viajar
      </div>
    </div>
  );
}

// ============================================================
// PROPTYPES DEL COMPONENTE
// ============================================================
FixedMinimap.propTypes = {
  avatar: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  buildings: PropTypes.object.isRequired,
  visitedBuildings: PropTypes.object,
  onTeleport: PropTypes.func.isRequired,
  canWalkFunction: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};

export default FixedMinimap;

