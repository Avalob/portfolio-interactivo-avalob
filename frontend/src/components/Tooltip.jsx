/**
 * Tooltip.jsx
 * 
 * Componente de tooltip personalizado con estilo pixel-art/retro gaming
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './Tooltip.css';

function Tooltip({ children, text, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);

  if (!text) {
    return <>{children}</>;
  }

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

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string,
  className: PropTypes.string
};

export default Tooltip;