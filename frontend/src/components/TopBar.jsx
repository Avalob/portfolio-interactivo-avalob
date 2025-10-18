// ============================================================
// 1. IMPORTACIONES Y ESTILOS
// ============================================================
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';
import './TopBar.css';

// ============================================================
// 2. COMPONENTE PRINCIPAL: TopBar
// ============================================================
// Barra superior con controles de navegación, progreso y modos del portfolio interactivo.
function TopBar({
  visitedBuildings,
  isDarkMode,
  onToggleDarkMode,
  onShowHelp,
  onNavigate,
  recruiterMode,
  onToggleRecruiterMode,
  onResetProgress
}) {
  // ------------------------------------------------------------
  // 2.1 CÁLCULO DE PROGRESO
  // ------------------------------------------------------------
  // Calcula el porcentaje de edificios visitados
  const totalBuildings = Object.keys(visitedBuildings).length;
  const visitedCount = Object.values(visitedBuildings).filter(Boolean).length;
  const progressPercent = totalBuildings > 0
    ? (visitedCount / totalBuildings) * 100
    : 0;

  // ------------------------------------------------------------
  // 2.2 ANIMACIÓN DEL PROGRESO
  // ------------------------------------------------------------
  // Estado para animar el progreso de forma gradual
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Efecto para animar el progreso suavemente
  useEffect(() => {
    const targetProgress = progressPercent;
    const duration = 500; // Duración de la animación en ms
    const steps = 60; // 60 fps
    const increment = (targetProgress - animatedProgress) / steps;
    const stepDuration = duration / steps;

    if (Math.abs(targetProgress - animatedProgress) < 0.5) {
      setAnimatedProgress(targetProgress);
      return;
    }

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newProgress = animatedProgress + (increment * currentStep);
      if (currentStep >= steps) {
        setAnimatedProgress(targetProgress);
        clearInterval(timer);
      } else {
        setAnimatedProgress(Math.max(0, Math.min(100, newProgress)));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [progressPercent, animatedProgress]);

  // ------------------------------------------------------------
  // 2.3 COLORES DEL PROGRESO
  // ------------------------------------------------------------
  // Devuelve el color del círculo de progreso según el porcentaje
  const getProgressColor = (progress) => {
    if (progress === 0) return '#64748b';
    if (progress < 12.5) return '#dc2626';
    if (progress < 25) return '#ef4444';
    if (progress < 37.5) return '#f97316';
    if (progress < 50) return '#fb923c';
    if (progress < 62.5) return '#eab308';
    if (progress < 75) return '#84cc16';
    if (progress < 87.5) return '#22c55e';
    if (progress < 100) return '#16a34a';
    return '#059669';
  };

  // ------------------------------------------------------------
  // 2.4 DATOS DE EDIFICIOS PARA EL HUD
  // ------------------------------------------------------------
  // Define los edificios y sus iconos para el menú HUD
  const buildingData = [
    { id: 'EDUCACION', icon: '🎓', name: 'Formación', color: '#4CAF50' },
    { id: 'EXPERIENCIA', icon: '💼', name: 'Experiencia', color: '#2196F3' },
    { id: 'SKILLS', icon: '⚡', name: 'Skills', color: '#FF9800' },
    { id: 'OTROS', icon: '📜', name: 'Cursos', color: '#9C27B0' },
    { id: 'PROYECTOS', icon: '🚀', name: 'Proyectos', color: '#F44336' },
    { id: 'HOBBIES', icon: '🎮', name: 'Hobbies', color: '#E91E63' },
    { id: 'RRSS', icon: '🌐', name: 'RRSS', color: '#00BCD4' },
    { id: 'CONTACTO', icon: '📧', name: 'Contacto', color: '#607D8B' }
  ];

  // ------------------------------------------------------------
  // 2.5 RENDERIZADO DEL COMPONENTE
  // ------------------------------------------------------------
  // Estructura la barra superior con HUD, progreso y controles
  return (
    <div className="topbar">
      {/* HUD central con iconos de edificios */}
      <div className="topbar-section topbar-center">
        {buildingData.map((building) => {
          const isVisited = visitedBuildings[building.id];
          return (
            <Tooltip 
              key={building.id}
              text={building.name}
              className={`tooltip-small ${isVisited ? 'active' : ''}`}
            >
              <button
                className={`hud-building-btn ${isVisited ? 'visited' : ''}`}
                onClick={() => onNavigate(building.id)}
                style={{ '--building-color': building.color }}
              >
                <span className="hud-building-icon">{building.icon}</span>
              </button>
            </Tooltip>
          );
        })}
      </div>

      {/* Controles a la derecha: progreso, modos y acciones */}
      <div className="topbar-section topbar-right">
        {/* Indicador de Progreso */}
        <Tooltip text={`Progreso: ${visitedCount}/${totalBuildings}`}>
          <div className="topbar-progress">
            <div className="progress-circle">
              <svg viewBox="0 0 36 36" className="progress-ring">
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={getProgressColor(animatedProgress)} />
                    <stop offset="50%" stopColor={getProgressColor(Math.max(0, animatedProgress - 10))} />
                    <stop offset="100%" stopColor={getProgressColor(Math.max(0, animatedProgress - 20))} />
                  </linearGradient>
                </defs>
                <path
                  className="progress-ring-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="progress-ring-fill"
                  strokeDasharray={`${animatedProgress}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="progress-text">{visitedCount}/{totalBuildings}</span>
            </div>
          </div>
        </Tooltip>

        {/* Botón Modo Reclutador */}
        <Tooltip 
          text={recruiterMode ? 'Modo Exploración' : 'Modo Reclutador'}
          className={recruiterMode ? 'active' : ''}
        >
          <button
            className={`topbar-btn recruiter-btn ${recruiterMode ? 'active' : ''}`}
            onClick={() => onToggleRecruiterMode(!recruiterMode)}
          >
            {recruiterMode ? '🎯' : '👔'}
          </button>
        </Tooltip>

        {/* Botón Día/Noche */}
        <Tooltip text={isDarkMode ? 'Modo Día' : 'Modo Noche'}>
          <button
            className="topbar-btn daynight-btn"
            onClick={onToggleDarkMode}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </Tooltip>

        {/* Botón Ayuda */}
        <Tooltip text="Ayuda (H)">
          <button
            className="topbar-btn help-btn"
            onClick={onShowHelp}
          >
            ❓
          </button>
        </Tooltip>

        {/* Botón Reset */}
        <Tooltip text="Resetear Progreso">
          <button
            className="topbar-btn reset-btn"
            onClick={onResetProgress}
          >
            🔄
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

// ============================================================
// 3. DEFINICIÓN DE TIPOS DE PROPIEDADES
// ============================================================
TopBar.propTypes = {
  visitedBuildings: PropTypes.object.isRequired, // Edificios visitados por el usuario
  isDarkMode: PropTypes.bool.isRequired,        // Estado de modo oscuro
  onToggleDarkMode: PropTypes.func.isRequired,  // Cambia entre día y noche
  onShowHelp: PropTypes.func.isRequired,        // Muestra la ayuda
  onNavigate: PropTypes.func.isRequired,        // Navega a un edificio
  recruiterMode: PropTypes.bool.isRequired,     // Estado del modo reclutador
  onToggleRecruiterMode: PropTypes.func.isRequired, // Cambia el modo reclutador
  onResetProgress: PropTypes.func.isRequired    // Resetea el progreso
};

// ============================================================
// 4. EXPORTACIÓN DEL COMPONENTE
// ============================================================
export default TopBar;
