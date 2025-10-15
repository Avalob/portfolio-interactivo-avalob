/**
 * TopBar.jsx
 * 
 * Barra superior unificada con todos los controles del juego
 * 
 * CARACTERÍSTICAS:
 * - Diseño compacto y semi-transparente
 * - Botón de ayuda
 * - Toggle día/noche
 * - Indicador de progreso
 * - HUD Menu con iconos de edificios
 * - Botón modo reclutador
 * - Responsive: se adapta a móvil, tablet y desktop
 * - Ocupa mínimo espacio en pantalla
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';
import './TopBar.css';

function TopBar({
  // Props eliminadas: avatar, buildings, visitedBuildings, onTeleport, minimapTrigger
  visitedBuildings,
  // Día/Noche props
  isDarkMode,
  onToggleDarkMode,
  // Ayuda props
  onShowHelp,
  // HUD Menu props
  onNavigate,
  // Modo Recruiter props
  recruiterMode,
  onToggleRecruiterMode,
  // Reset props
  onResetProgress
}) {
  // Calcular progreso
  const totalBuildings = Object.keys(visitedBuildings).length;
  const visitedCount = Object.values(visitedBuildings).filter(Boolean).length;
  const progressPercent = totalBuildings > 0
    ? (visitedCount / totalBuildings) * 100
    : 0;

  // Estado para animación gradual del progreso
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Función para obtener el color según el progreso
  const getProgressColor = (progress) => {
    if (progress === 0) return '#64748b'; // Gris para 0%
    if (progress < 12.5) return '#dc2626'; // Rojo oscuro para 0-12.5%
    if (progress < 25) return '#ef4444'; // Rojo para 12.5-25%
    if (progress < 37.5) return '#f97316'; // Naranja rojizo para 25-37.5%
    if (progress < 50) return '#fb923c'; // Naranja para 37.5-50%
    if (progress < 62.5) return '#eab308'; // Amarillo para 50-62.5%
    if (progress < 75) return '#84cc16'; // Verde lima para 62.5-75%
    if (progress < 87.5) return '#22c55e'; // Verde para 75-87.5%
    if (progress < 100) return '#16a34a'; // Verde oscuro para 87.5-100%
    return '#059669'; // Verde esmeralda para 100%
  };

  // Efecto para animar el progreso gradualmente
  useEffect(() => {
    const targetProgress = progressPercent;
    const duration = 500; // 0.5 segundos de animación (más rápido)
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

  // Datos de edificios para HUD
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

  return (
    <div className="topbar">
      {/* Sección Centro: HUD Menu con iconos de edificios */}
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

      {/* Sección Derecha: Controles */}
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

// PropTypes para validación de props
TopBar.propTypes = {
  visitedBuildings: PropTypes.object.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  onToggleDarkMode: PropTypes.func.isRequired,
  onShowHelp: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  recruiterMode: PropTypes.bool.isRequired,
  onToggleRecruiterMode: PropTypes.func.isRequired,
  onResetProgress: PropTypes.func.isRequired
};

export default TopBar;
