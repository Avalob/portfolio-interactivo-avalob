/**
 * MobileJoystick.jsx
 * 
 * Controles táctiles tipo Game Boy D-Pad para dispositivos móviles
 * 
 * CARACTERÍSTICAS:
 * - Cruceta direccional (D-Pad) estilo Game Boy
 * - Botón de menú desplegable con opciones
 * - Solo visible en dispositivos móviles
 * - Semi-transparente para no tapar el juego
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './MobileJoystick.css';

function MobileJoystick({
  onDirectionPress = () => {},
  onDirectionRelease = () => {},
  onMenuButton = () => {},
  visitedBuildings = {},
  animatedProgress = 0,
  totalBuildings = 9,
  movementLocked = false
}) {
  const currentDirectionRef = useRef(null);
  const movementLockedRef = useRef(false);
  const activePointerRef = useRef(null);
  const pressStartRef = useRef(null);
  const releaseTimeoutRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const buildingsTotal = totalBuildings || Object.keys(visitedBuildings).length || 9;
  const visitedCount = Object.values(visitedBuildings).filter(Boolean).length;
  const rawProgress = buildingsTotal > 0
    ? (typeof animatedProgress === 'number'
        ? animatedProgress
        : (visitedCount / buildingsTotal) * 100)
    : 0;
  const progressPercent = Math.max(0, Math.min(100, rawProgress));
  const strokeDashArray = progressPercent >= 100 ? '100, 0' : `${progressPercent}, 100`;

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
    if (releaseTimeoutRef.current) {
      clearTimeout(releaseTimeoutRef.current);
      releaseTimeoutRef.current = null;
    }
    if (currentDirectionRef.current) {
      onDirectionRelease(currentDirectionRef.current);
      currentDirectionRef.current = null;
      setActiveButton(null);
    }
    pressStartRef.current = null;
    activePointerRef.current = null;
  }, [onDirectionRelease]);

  useEffect(() => {
    movementLockedRef.current = movementLocked;
    if (movementLocked) {
      releaseDirection();
    }
  }, [movementLocked, releaseDirection]);

  // Manejar presión de botón direccional
  const handleDirectionStart = useCallback((direction) => (event) => {
    if (event?.stopPropagation) {
      event.stopPropagation();
    }
    if (event?.cancelable) {
      event.preventDefault();
    }

    if (event?.pointerId != null && event.currentTarget?.setPointerCapture) {
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
        activePointerRef.current = event.pointerId;
      } catch (err) {
        // Ignorar capturas fallidas
      }
    }

    pressStartRef.current = Date.now();
    
    if (movementLockedRef.current) return;
    
    if (currentDirectionRef.current !== direction) {
      if (currentDirectionRef.current) {
        onDirectionRelease(currentDirectionRef.current);
      }
      currentDirectionRef.current = direction;
      setActiveButton(direction);
      onDirectionPress(direction);
    }
  }, [onDirectionPress, onDirectionRelease]);

  // Manejar liberación de botón direccional
  const handleDirectionEnd = useCallback((event) => {
    if (event?.pointerId != null && event.currentTarget?.releasePointerCapture) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch (err) {
        // Ignorar liberaciones fallidas
      }
    }

    if (
      activePointerRef.current != null &&
      event?.pointerId != null &&
      event.pointerId !== activePointerRef.current
    ) {
      return;
    }

    const now = Date.now();
    const startedAt = pressStartRef.current;
    const elapsed = startedAt ? now - startedAt : 0;
    const MIN_PRESS_DURATION = 140;

    if (elapsed < MIN_PRESS_DURATION) {
      const remaining = MIN_PRESS_DURATION - elapsed;
      if (releaseTimeoutRef.current) {
        clearTimeout(releaseTimeoutRef.current);
      }
      releaseTimeoutRef.current = setTimeout(() => {
        releaseTimeoutRef.current = null;
        releaseDirection();
      }, remaining);
    } else {
      releaseDirection();
    }
  }, [releaseDirection]);

  // Cleanup global listeners
  useEffect(() => {
    const globalRelease = () => {
      releaseDirection();
    };

    window.addEventListener('pointerup', globalRelease);
    window.addEventListener('pointercancel', globalRelease);
    window.addEventListener('mouseup', globalRelease);

    return () => {
      window.removeEventListener('pointerup', globalRelease);
      window.removeEventListener('pointercancel', globalRelease);
      window.removeEventListener('mouseup', globalRelease);
    };
  }, [releaseDirection]);

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
      {/* D-Pad (Cruceta Direccional) */}
      <div className="dpad-container">
        <button
          className={`dpad-button dpad-up ${activeButton === 'up' ? 'active' : ''}`}
          onPointerDown={handleDirectionStart('up')}
          onPointerUp={handleDirectionEnd}
          aria-label="Arriba"
        >
          ▲
        </button>
        <button
          className={`dpad-button dpad-left ${activeButton === 'left' ? 'active' : ''}`}
          onPointerDown={handleDirectionStart('left')}
          onPointerUp={handleDirectionEnd}
          aria-label="Izquierda"
        >
          ◀
        </button>
        <div className="dpad-center"></div>
        <button
          className={`dpad-button dpad-right ${activeButton === 'right' ? 'active' : ''}`}
          onPointerDown={handleDirectionStart('right')}
          onPointerUp={handleDirectionEnd}
          aria-label="Derecha"
        >
          ▶
        </button>
        <button
          className={`dpad-button dpad-down ${activeButton === 'down' ? 'active' : ''}`}
          onPointerDown={handleDirectionStart('down')}
          onPointerUp={handleDirectionEnd}
          aria-label="Abajo"
        >
          ▼
        </button>
      </div>

      {/* Botón de Menú Desplegable */}
      <div className="joystick-menu-container">
        {/* Indicador de Progreso Móvil */}
        <div className="mobile-progress-indicator">
          <svg viewBox="0 0 54 54" className="progress-ring">
            <defs>
              <linearGradient id="mobileProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={getProgressColor(progressPercent)} />
                <stop offset="50%" stopColor={getProgressColor(Math.max(0, progressPercent - 10))} />
                <stop offset="100%" stopColor={getProgressColor(Math.max(0, progressPercent - 20))} />
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
              strokeDasharray={strokeDashArray}
              d="M27 5.0845
                a 21.9155 21.9155 0 0 1 0 43.831
                a 21.9155 21.9155 0 0 1 0 -43.831"
            />
          </svg>
          <span className="progress-text">{visitedCount}/{buildingsTotal}</span>
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
