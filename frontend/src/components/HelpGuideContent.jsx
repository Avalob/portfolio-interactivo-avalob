// ============================================================
// 1. IMPORTACIONES Y DEPENDENCIAS
// ============================================================
import React, { useState } from 'react';
import './BuildingModal.css';

// ============================================================
// 2. COMPONENTE: HelpGuideContent
// Contenido interactivo y desplegable para la guía de ayuda
// ============================================================
const HelpGuideContent = () => {
  // Estado local para controlar qué secciones están expandidas
  const [expandedSections, setExpandedSections] = useState({});

  // Esta función alterna la visibilidad de cada sección desplegable
  const toggleSection = (key) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Render principal: estructura de la guía de ayuda con secciones y dropdowns
  return (
    <div className="experiencia-columns">
      {/* =============================
          2.1 CONTROLES DEL JUEGO
          ============================= */}
      <div className="building-section">
        <h2>⌨️ Controles del Juego</h2>
        {/* Dropdown: Movimiento */}
        <div className="exp-dropdown-item">
          <button
            className="exp-dropdown-btn"
            onClick={() => toggleSection('movimiento')}
          >
            <span>🏃 Movimiento</span>
            <span className={`arrow ${expandedSections['movimiento'] ? 'open' : ''}`}>
              ›
            </span>
          </button>
          {expandedSections['movimiento'] && (
            <div className="exp-dropdown-content">
              <ul>
                <li><strong>W / ↑</strong> - Mover hacia arriba</li>
                <li><strong>A / ←</strong> - Mover hacia la izquierda</li>
                <li><strong>S / ↓</strong> - Mover hacia abajo</li>
                <li><strong>D / →</strong> - Mover hacia la derecha</li>
              </ul>
            </div>
          )}
        </div>
        {/* Dropdown: Acciones */}
        <div className="exp-dropdown-item">
          <button
            className="exp-dropdown-btn"
            onClick={() => toggleSection('acciones')}
          >
            <span>⚡ Acciones</span>
            <span className={`arrow ${expandedSections['acciones'] ? 'open' : ''}`}>
              ›
            </span>
          </button>
          {expandedSections['acciones'] && (
            <div className="exp-dropdown-content">
              <ul>
                <li><strong>E / Enter</strong> - Interactuar con edificios y NPCs</li>
                <li><strong>H</strong> - Abrir/cerrar este menú de ayuda</li>
                <li><strong>M</strong> - Abrir/cerrar el minimapa completo</li>
                <li><strong>N</strong> - Alternar entre modo día/noche</li>
                <li><strong>Esc</strong> - Cerrar modales y menús abiertos</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* =============================
          2.2 OBJETIVO DEL JUEGO
          ============================= */}
      <div className="building-section">
        <h2>🎯 Objetivo del Juego</h2>
        <p><strong>Explora la ciudad interactiva y descubre mi portfolio</strong></p>
        {/* Dropdown: ¿Qué debo hacer? */}
        <div className="exp-dropdown-item">
          <button
            className="exp-dropdown-btn"
            onClick={() => toggleSection('objetivo')}
          >
            <span>¿Qué debo hacer?</span>
            <span className={`arrow ${expandedSections['objetivo'] ? 'open' : ''}`}>
              ›
            </span>
          </button>
          {expandedSections['objetivo'] && (
            <div className="exp-dropdown-content">
              {/* Explicación de los edificios y secciones */}
              Recorre el mapa interactivo y visita los diferentes edificios para conocer mi trayectoria profesional. Cada edificio representa una sección de mi portfolio:
              <ul>
                <li><strong>🎓 Educación</strong> - Formación académica y certificaciones</li>
                <li><strong>💼 Experiencia</strong> - Trayectoria laboral y proyectos profesionales</li>
                <li><strong>⚡ Skills</strong> - Habilidades técnicas y herramientas que domino</li>
                <li><strong>🎨 Otros</strong> - Cursos adicionales y formación complementaria</li>
                <li><strong>🚀 Proyectos</strong> - Portfolio de proyectos personales y destacados</li>
                <li><strong>🎮 Hobbies</strong> - Intereses personales y pasatiempos</li>
                <li><strong>📱 RRSS</strong> - Redes sociales y perfiles profesionales</li>
                <li><strong>📧 Contacto</strong> - Información para contactarme</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* =============================
          2.3 NAVEGACIÓN Y MINIMAPA
          ============================= */}
      <div className="building-section">
        <h2>🗺️ Navegación</h2>
        {/* Dropdown: Usar el minimapa */}
        <div className="exp-dropdown-item">
          <button
            className="exp-dropdown-btn"
            onClick={() => toggleSection('minimapa')}
          >
            <span>Usar el minimapa</span>
            <span className={`arrow ${expandedSections['minimapa'] ? 'open' : ''}`}>
              ›
            </span>
          </button>
          {expandedSections['minimapa'] && (
            <div className="exp-dropdown-content">
              <ul>
                <li>El <strong>minimapa</strong> aparece en la esquina inferior izquierda (escritorio) o como botón flotante (móvil)</li>
                <li>Haz <strong>clic en cualquier punto del mapa</strong> para teletransportarte allí</li>
                <li>Haz <strong>clic en un edificio</strong> para ir directamente a su ubicación</li>
                <li>Los edificios visitados se marcan con un <strong>✓ verde</strong></li>
                <li>Tu posición aparece como un <strong>punto verde pulsante</strong></li>
              </ul>
            </div>
          )}
        </div>
        {/* Dropdown: HUD */}
        <div className="exp-dropdown-item">
          <button
            className="exp-dropdown-btn"
            onClick={() => toggleSection('hud')}
          >
            <span>Panel de navegación (HUD)</span>
            <span className={`arrow ${expandedSections['hud'] ? 'open' : ''}`}>
              ›
            </span>
          </button>
          {expandedSections['hud'] && (
            <div className="exp-dropdown-content">
              <ul>
                <li>Usa el <strong>menú superior</strong> para navegar rápidamente a cualquier edificio</li>
                <li>El botón <strong>🔄</strong> resetea tu progreso (edificios visitados)</li>
                <li>El botón <strong>👔</strong> abre el panel especial para reclutadores</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* =============================
          2.4 FUNCIONALIDADES ESPECIALES
          ============================= */}
      <div className="building-section">
        <h2>✨ Funcionalidades Especiales</h2>
        {/* Dropdown: Modo Día/Noche */}
        <div className="exp-dropdown-item">
          <button
            className="exp-dropdown-btn"
            onClick={() => toggleSection('dianoche')}
          >
            <span>🌙 Modo Día/Noche</span>
            <span className={`arrow ${expandedSections['dianoche'] ? 'open' : ''}`}>
              ›
            </span>
          </button>
          {expandedSections['dianoche'] && (
            <div className="exp-dropdown-content">
              Presiona <strong>N</strong> para alternar entre el modo claro y oscuro. Esto cambia la paleta de colores del entorno para mayor comodidad visual según tus preferencias.
            </div>
          )}
        </div>
        {/* Dropdown: Panel de Reclutador */}
        <div className="exp-dropdown-item">
          <button
            className="exp-dropdown-btn"
            onClick={() => toggleSection('reclutador')}
          >
            <span>👔 Panel de Reclutador</span>
            <span className={`arrow ${expandedSections['reclutador'] ? 'open' : ''}`}>
              ›
            </span>
          </button>
          {expandedSections['reclutador'] && (
            <div className="exp-dropdown-content">
              Un panel especial diseñado para reclutadores y empresas que incluye:
              <ul>
                <li>Resumen ejecutivo de mi perfil profesional</li>
                <li>Skills y tecnologías clave</li>
                <li>Proyectos destacados con enlaces directos</li>
                <li>Información de contacto rápida</li>
              </ul>
            </div>
          )}
        </div>
        {/* Dropdown: Sistema de progreso */}
        <div className="exp-dropdown-item">
          <button
            className="exp-dropdown-btn"
            onClick={() => toggleSection('progreso')}
          >
            <span>🏅 Sistema de progreso</span>
            <span className={`arrow ${expandedSections['progreso'] ? 'open' : ''}`}>
              ›
            </span>
          </button>
          {expandedSections['progreso'] && (
            <div className="exp-dropdown-content">
              Mientras exploras, los edificios visitados se marcan automáticamente. Puedes reiniciar tu progreso desde el botón de la parte superior para volver a vivir la experiencia desde cero.
            </div>
          )}
        </div>
      </div>

      {/* =============================
          2.5 NPCs Y DIÁLOGOS
          ============================= */}
      <div className="building-section">
        <h2>🤝 NPCs y diálogos</h2>
        {/* Dropdown: Interacción con NPCs */}
        <div className="exp-dropdown-item">
          <button
            className="exp-dropdown-btn"
            onClick={() => toggleSection('npc')}
          >
            <span>Interactúa con los personajes</span>
            <span className={`arrow ${expandedSections['npc'] ? 'open' : ''}`}>
              ›
            </span>
          </button>
          {expandedSections['npc'] && (
            <div className="exp-dropdown-content">
              Encontrarás personajes (NPCs) caminando por la ciudad. Acércate a ellos y presiona <strong>E</strong> para interactuar. Te darán consejos, información adicional o curiosidades sobre el portfolio.
            </div>
          )}
        </div>
      </div>

      {/* =============================
          2.6 CONSEJOS ÚTILES
          ============================= */}
      <div className="building-section">
        <h2>💡 Consejos Útiles</h2>
        {/* Dropdown: Tips para la experiencia */}
        <div className="exp-dropdown-item">
          <button
            className="exp-dropdown-btn"
            onClick={() => toggleSection('consejos')}
          >
            <span>Tips para una mejor experiencia</span>
            <span className={`arrow ${expandedSections['consejos'] ? 'open' : ''}`}>
              ›
            </span>
          </button>
          {expandedSections['consejos'] && (
            <div className="exp-dropdown-content">
              <ul>
                <li>🗺️ Usa el <strong>minimapa</strong> para orientarte y moverte rápidamente por el mapa</li>
                <li>🏢 Cada edificio tiene contenido único - ¡explóralos todos!</li>
                <li>👔 Si eres reclutador, el <strong>Panel de Reclutador</strong> te dará un resumen completo</li>
                <li>🌙 Cambia entre modo día/noche según tu preferencia visual</li>
                <li>📱 En móvil, usa el botón flotante para abrir el minimapa</li>
                <li>⚡ Los dropdowns en los modales contienen información detallada - ¡ábrelos!</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// 3. EXPORTACIÓN DEL COMPONENTE
// ============================================================
export default HelpGuideContent;
