// ============================================================
// 1. IMPORTACIONES Y ESTILOS
// ============================================================
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './Tooltip.css';

// ============================================================
// 2. COMPONENTE PRINCIPAL: Tooltip
// ============================================================
// Componente Tooltip personalizado con estilo retro/pixel-art.
// Muestra un mensaje flotante al pasar el mouse sobre el elemento hijo.
function Tooltip({ children, text, className = '' }) {
  // ------------------------------------------------------------
  // 2.1 ESTADO LOCAL PARA VISIBILIDAD DEL TOOLTIP
  // ------------------------------------------------------------
  const [isVisible, setIsVisible] = useState(false);

  // Si no hay texto, renderiza solo los hijos sin tooltip
  if (!text) {
    return <>{children}</>;
  }

  // ------------------------------------------------------------
  // 2.2 RENDERIZADO DEL TOOLTIP
  // ------------------------------------------------------------
  // El tooltip aparece al hacer hover sobre el wrapper
  return (
    <div 
      className={`tooltip-wrapper ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="tooltip-content">
          <div className="tooltip-arrow"></div>
          <div className="tooltip-text">{text}</div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 3. DEFINICIÓN DE TIPOS DE PROPIEDADES
// ============================================================
Tooltip.propTypes = {
  children: PropTypes.node.isRequired, // Elemento(s) sobre el que se mostrará el tooltip
  text: PropTypes.string,              // Texto a mostrar en el tooltip
  className: PropTypes.string          // Clases CSS adicionales
};

// ============================================================
// 4. EXPORTACIÓN DEL COMPONENTE
// ============================================================
export default Tooltip;