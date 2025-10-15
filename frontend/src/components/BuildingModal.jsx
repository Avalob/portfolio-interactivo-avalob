// === BuildingModal.jsx ===
// Contenedor modal reutilizable para los edificios, pensado para mantener coherencia visual y navegación cómoda.

import React, { useEffect } from 'react';
import './BuildingModal.css';

function BuildingModal({
  isOpen,
  onClose,
  title,
  icon,
  children,
  maxWidth = '900px',
  maxHeight = '80vh',
  showBackButton = false,
  noAnimation = false
}) {
  // --- Hooks ---
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // --- Render principal ---
  return (
    <div 
      className={`building-modal-overlay ${noAnimation ? 'no-animation' : ''}`} 
      onClick={onClose}
    >
      <div 
        className={`building-modal-content ${noAnimation ? 'no-animation' : ''}`}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth, maxHeight }}
      >
        <div className="building-modal-header">
          {showBackButton && (
            <button 
              className="building-modal-back" 
              onClick={onClose}
              aria-label="Volver"
              title="Volver al menú"
            >
              ← Volver
            </button>
          )}
          <h2 className="building-modal-title">
            {icon && <span className="building-modal-icon">{icon}</span>}
            {title}
          </h2>
          <button 
            className="building-modal-close" 
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <div className="building-modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default BuildingModal;
