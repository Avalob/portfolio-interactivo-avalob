// ============================================================
// 1. IMPORTACIONES Y DEPENDENCIAS
// ============================================================
import React from 'react';
import './MinimapModal.css';

// ============================================================
// 2. COMPONENTE: MinimapModal
// Modal expandido del minimapa con teletransporte interactivo
// ============================================================
function MinimapModal({ 
  isOpen, 
  onClose, 
  avatar, 
  buildings, 
  visitedBuildings, 
  onTeleport 
}) {
  // Si el modal no está abierto, no renderiza nada
  if (!isOpen) return null;

  // ============================================================
  // 2.1 CONFIGURACIÓN Y DIMENSIONES DEL MAPA
  // ============================================================
  const MAP_WIDTH = 45;
  const MAP_HEIGHT = 30;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const maxWidth = Math.min(vw * 0.5, 500); // Máximo 50% del ancho o 500px
  const maxHeight = vh * 0.8; // Máximo 80% del alto
  const aspectRatio = MAP_WIDTH / MAP_HEIGHT;
  let MINIMAP_WIDTH = maxWidth;
  let MINIMAP_HEIGHT = MINIMAP_WIDTH / aspectRatio;
  if (MINIMAP_HEIGHT > maxHeight) {
    MINIMAP_HEIGHT = maxHeight;
    MINIMAP_WIDTH = MINIMAP_HEIGHT * aspectRatio;
  }
  const scaleX = MINIMAP_WIDTH / MAP_WIDTH;
  const scaleY = MINIMAP_HEIGHT / MAP_HEIGHT;

  // ============================================================
  // 2.2 DATOS DE EDIFICIOS Y LEYENDA
  // ============================================================
  const buildingData = {
    EDUCACION: { icon: '🎓', name: 'Formación', color: '#4CAF50' },
    EXPERIENCIA: { icon: '💼', name: 'Experiencia', color: '#2196F3' },
    SOBRE_MI: { icon: '👩‍💻', name: 'Sobre Mí', color: '#8B5CF6' },
    SKILLS: { icon: '⚡', name: 'Skills', color: '#FF9800' },
    OTROS: { icon: '📜', name: 'Cursos', color: '#9C27B0' },
    PROYECTOS: { icon: '🚀', name: 'Proyectos', color: '#F44336' },
    HOBBIES: { icon: '🎮', name: 'Hobbies', color: '#E91E63' },
    RRSS: { icon: '🌐', name: 'RRSS', color: '#00BCD4' },
    CONTACTO: { icon: '📧', name: 'Contacto', color: '#607D8B' }
  };

  // ============================================================
  // 2.3 HANDLERS DE INTERACCIÓN
  // ============================================================
  // Esta función gestiona el click en cualquier punto del mapa para teletransportar
  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const mapX = Math.floor(clickX / scaleX);
    const mapY = Math.floor(clickY / scaleY);
    onTeleport(mapX, mapY);
    onClose();
  };

  // Esta función gestiona el click en un edificio específico
  const handleBuildingClick = (e, buildingName, coords) => {
    e.stopPropagation(); // Evita que se active el click general del mapa
    onTeleport(coords.x, coords.y);
    onClose();
  };

  // ============================================================
  // 2.4 RENDER DEL MODAL Y SU CONTENIDO
  // ============================================================
  return (
    <div className="minimap-modal-overlay" onClick={onClose}>
      <div className="minimap-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header compacto con botón de cierre */}
        <button className="minimap-modal-close" onClick={onClose}>✕</button>
        {/* Layout principal: Mapa a la izquierda, leyenda a la derecha */}
        <div className="minimap-modal-grid">
          {/* =============================
              2.4.1 MAPA INTERACTIVO
              ============================= */}
          <div className="minimap-section-map">
            <h2 className="minimap-title">🗺️ Mapa del Portfolio</h2>
            <div 
              className="minimap-large" 
              style={{ 
                width: `${MINIMAP_WIDTH}px`, 
                height: `${MINIMAP_HEIGHT}px` 
              }}
              onClick={handleMapClick}
            >
              {/* Grid de fondo visual */}
              <div className="minimap-grid" />
              {/* Avatar del usuario en el mapa */}
              <div
                className="minimap-avatar-large"
                style={{
                  left: `${avatar.x * scaleX}px`,
                  top: `${avatar.y * scaleY}px`
                }}
                title="Tu posición"
              >
                👤
              </div>
              {/* Edificios clickeables */}
              {Object.entries(buildings).map(([buildingName, coords]) => {
                const isVisited = visitedBuildings[buildingName];
                const data = buildingData[buildingName];
                // Si no hay datos para este edificio, no renderiza nada
                if (!data) return null;
                // Si coords es un array (como SOBRE_MI), usar la primera puerta
                const buildingCoords = Array.isArray(coords) ? coords[0] : coords;
                return (
                  <button
                    key={buildingName}
                    className={`minimap-building-large ${isVisited ? 'visited' : ''}`}
                    style={{
                      left: `${buildingCoords.x * scaleX}px`,
                      top: `${buildingCoords.y * scaleY}px`,
                      '--building-color': data.color
                    }}
                    onClick={(e) => handleBuildingClick(e, buildingName, buildingCoords)}
                    title={`${data.name} - Teletransporte`}
                  >
                    <span className="building-icon-small">{data.icon}</span>
                    {isVisited && <span className="building-check-small">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
          {/* =============================
              2.4.2 LEYENDA E INSTRUCCIONES
              ============================= */}
          <div className="minimap-section-legend">
            <h3 className="legend-header">📍 Navegación</h3>
            <div className="legend-instructions">
              <p className="instruction-main">
                <strong>Click en cualquier punto del mapa</strong> para teletransportarte allí instantáneamente.
              </p>
              <p className="instruction-sub">
                Puedes hacer click en los iconos de edificios o en cualquier zona del mapa.
              </p>
            </div>
            <h3 className="legend-header">🗝️ Leyenda</h3>
            <div className="minimap-legend">
              <div className="legend-item">
                <span className="legend-icon avatar">👤</span>
                <span className="legend-text">Tu posición actual</span>
              </div>
              <div className="legend-item">
                <span className="legend-icon building">🏢</span>
                <span className="legend-text">Edificio no visitado</span>
              </div>
              <div className="legend-item">
                <span className="legend-icon building visited">✓</span>
                <span className="legend-text">Edificio completado</span>
              </div>
            </div>
            <h3 className="legend-header">🎯 Edificios</h3>
            <div className="building-list">
              {Object.entries(buildingData).map(([key, data]) => {
                const isVisited = visitedBuildings[key];
                return (
                  <div key={key} className={`building-list-item ${isVisited ? 'visited' : ''}`}>
                    <span className="building-list-icon">{data.icon}</span>
                    <span className="building-list-name">{data.name}</span>
                    {isVisited && <span className="building-list-check">✓</span>}
                  </div>
                );
              })}
            </div>
            <div className="legend-hint">
              💡 <strong>Tip:</strong> Usa el minimapa para explorar rápidamente todo el portfolio
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 3. EXPORTACIÓN DEL COMPONENTE
// ============================================================
export default MinimapModal;
