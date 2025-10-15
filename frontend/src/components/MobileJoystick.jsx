/**
 * MobileJoystick.jsx
 * 
 * Controles táctiles con nipplejs para dispositivos móviles
 * 
 * CARACTERÍSTICAS:
 * - Joystick circular con nipplejs
 * - Botón de menú desplegable con opciones
 * - Solo visible en dispositivos móviles
 * - Semi-transparente para no tapar el juego
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import nipplejs from 'nipplejs';
import './MobileJoystick.css';

function MobileJoystick({
  onDirectionPress = () => {},
  onDirectionRelease = () => {},
  onMenuButton = () => {},
  visitedBuildings = {},
  animatedProgress = 0,
  totalBuildings = 8,
  movementLocked = false
}) {
  const joystickZoneRef = useRef(null);
  const managerRef = useRef(null);
  const currentDirectionRef = useRef(null);
  const movementLockedRef = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para obtener el color según el progreso
  const getProgressColor = (progress) => {
    if (progress === 0) return '#64748b'; // Gris para 0%
    if (progress < 25) return '#ef4444'; // Rojo para 0-25%
    if (progress < 50) return '#f97316'; // Naranja para 25-50%
    if (progress < 75) return '#eab308'; // Amarillo para 50-75%
    if (progress < 100) return '#22c55e'; // Verde para 75-100%
    return '#10b981'; // Verde oscuro para 100%
  };

  const releaseDirection = useCallback(() => {
    if (currentDirectionRef.current) {
      onDirectionRelease(currentDirectionRef.current);
      currentDirectionRef.current = null;
    }
  }, [onDirectionRelease]);

  useEffect(() => {
    movementLockedRef.current = movementLocked;
    if (movementLocked) {
      releaseDirection();
    }
  }, [movementLocked, releaseDirection]);

  useEffect(() => {
    if (!joystickZoneRef.current || managerRef.current) return;

    // Crear el joystick
    const manager = nipplejs.create({
      zone: joystickZoneRef.current,
      mode: 'static',
      position: { left: '50%', top: '50%' },
      color: 'rgba(255, 255, 255, 0.5)',
      size: 120,
      threshold: 0.1,
      fadeTime: 250,
      restOpacity: 0.5
    });

    managerRef.current = manager;

    const updateDirection = (angle) => {
      let dir = null;
      if (angle === 'up') dir = 'up';
      else if (angle === 'down') dir = 'down';
      else if (angle === 'left') dir = 'left';
      else if (angle === 'right') dir = 'right';

      if (dir && dir !== currentDirectionRef.current) {
        if (currentDirectionRef.current) {
          onDirectionRelease(currentDirectionRef.current);
        }
        currentDirectionRef.current = dir;
        onDirectionPress(dir);
      }
    };

    // Evento cuando el joystick se mueve
    manager.on('move', (evt, data) => {
      if (!data) return;

      if (movementLockedRef.current) {
        releaseDirection();
        return;
      }

      // Si la fuerza es muy baja, consideramos que se soltó
      if (!data.direction || data.distance < 10) {
        releaseDirection();
        return;
      }

      updateDirection(data.direction.angle);
    });

    // Evento cuando se suelta el joystick
    manager.on('end', releaseDirection);

    // Fallback global listeners: algunos navegadores o gestos fuera del
    // área del joystick no siempre disparan 'end'. Añadimos listeners
    // globales para asegurarnos de liberar la dirección cuando el usuario
    // suelte el dedo fuera de la zona.
    const globalRelease = () => {
      releaseDirection();
    };

    window.addEventListener('touchend', globalRelease, { passive: true });
    window.addEventListener('pointerup', globalRelease);
    window.addEventListener('mouseup', globalRelease);
    window.addEventListener('touchcancel', globalRelease);

    return () => {
      if (managerRef.current) {
        managerRef.current.destroy();
        managerRef.current = null;
      }
      window.removeEventListener('touchend', globalRelease);
      window.removeEventListener('pointerup', globalRelease);
      window.removeEventListener('mouseup', globalRelease);
      window.removeEventListener('touchcancel', globalRelease);
    };
  }, [onDirectionPress, releaseDirection]);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuOptionClick = (option) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    onMenuButton(option);
    // Cerrar menú tras ejecutar la acción
    requestAnimationFrame(() => setIsMenuOpen(false));
  };

  return (
    <div className="mobile-joystick">
      {/* Joystick Zone */}
      <div className="joystick-zone" ref={joystickZoneRef}></div>

      {/* Botón de Menú Desplegable */}
      <div className="joystick-menu-container">
        {/* Indicador de Progreso Móvil */}
        <div className="mobile-progress-indicator">
          <svg viewBox="0 0 54 54" className="progress-ring">
            <defs>
              <linearGradient id="mobileProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={getProgressColor(animatedProgress)} />
                <stop offset="50%" stopColor={getProgressColor(Math.max(0, animatedProgress - 10))} />
                <stop offset="100%" stopColor={getProgressColor(Math.max(0, animatedProgress - 20))} />
              </linearGradient>
            </defs>
            <path
              className="progress-ring-bg"
              d="M27 5.0845
                a 21.9155 21.9155 0 0 1 0 43.831
                a 21.9155 21.9155 0 0 1 0 -43.831"
            />
            <path
              className="progress-ring-fill"
              stroke="url(#mobileProgressGradient)"
              strokeDasharray={`${animatedProgress}, 100`}
              d="M27 5.0845
                a 21.9155 21.9155 0 0 1 0 43.831
                a 21.9155 21.9155 0 0 1 0 -43.831"
            />
          </svg>
          <span className="progress-text">{Object.values(visitedBuildings).filter(Boolean).length}/{totalBuildings}</span>
        </div>

        <button
          className="menu-toggle-btn"
          onTouchStart={handleMenuClick}
          aria-label="Menú"
        >
          <span className="menu-icon">☰</span>
        </button>

        {/* Botón de Minimap */}
        <button
          className="minimap-toggle-btn"
          onTouchStart={() => onMenuButton('map')}
          aria-label="Minimap"
        >
          <span className="minimap-icon">🗺️</span>
        </button>

        {isMenuOpen && (
          <div className="menu-dropdown">
            <button 
              onPointerUp={handleMenuOptionClick('help')}
            >
              ❓ Ayuda
            </button>
            <button 
              onPointerUp={handleMenuOptionClick('darkmode')}
            >
              🌙 Modo Noche
            </button>
            <button 
              onPointerUp={handleMenuOptionClick('recruiter')}
            >
              👔 Modo Recruiter
            </button>
            <button 
              onPointerUp={handleMenuOptionClick('reset')}
            >
              🔄 Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// PropTypes para validación
MobileJoystick.propTypes = {
  onDirectionPress: PropTypes.func,
  onDirectionRelease: PropTypes.func,
  onMenuButton: PropTypes.func,
  visitedBuildings: PropTypes.object,
  animatedProgress: PropTypes.number,
  totalBuildings: PropTypes.number,
  movementLocked: PropTypes.bool
};

export default React.memo(MobileJoystick);
