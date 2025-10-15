/**
 * WelcomeScreen.jsx
 * Pantalla de bienvenida animada con presentación e instrucciones
 */

import React, { useEffect, useState } from 'react';
import './WelcomeScreen.css';
import HelpGuideContent from './HelpGuideContent';

function WelcomeScreen({ isOpen, onEnter }) {
  const [isExiting, setIsExiting] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsExiting(false);
      setShowGuide(false);
    }
  }, [isOpen]);

  // No renderizar si no está abierto
  if (!isOpen) return null;

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 800); // Tiempo de animación de salida
  };

  const handleShowHelp = () => {
    setShowGuide(true);
  };

  return (
    <div className={`welcome-overlay ${isExiting ? 'exit' : ''}`}>
      <div className={`welcome-container ${showGuide ? 'guide-view' : ''}`}>
        {showGuide ? (
          <>
            <div className="welcome-guide-header">
              <h1>Guía rápida</h1>
              <p>Todo lo necesario para moverte por el portfolio interactivo.</p>
            </div>
            <div className="welcome-guide-content">
              <HelpGuideContent />
            </div>
            <div className="welcome-guide-actions">
              <button
                className="welcome-btn welcome-btn-primary"
                onClick={handleEnter}
              >
                <span className="btn-icon">🚀</span>
                Entrar
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="welcome-logo-container">
              <div className="welcome-logo">
                <span className="logo-bracket">&lt;</span>
                <span className="logo-name">Andrea</span>
                <span className="logo-bracket">/&gt;</span>
              </div>
              <div className="welcome-subtitle">
                Portfolio Interactivo
              </div>
            </div>

            <div className="welcome-description">
              <p>Bienvenida a mi portfolio interactivo.</p>
              <p>Explora, descubre y conoce mi trabajo de una forma diferente.</p>
            </div>

            <div className="welcome-buttons">
              <button
                className="welcome-btn welcome-btn-primary"
                onClick={handleEnter}
              >
                <span className="btn-icon">🚀</span>
                Entrar
              </button>
              <button
                className="welcome-btn welcome-btn-secondary"
                onClick={handleShowHelp}
              >
                <span className="btn-icon">📖</span>
                Guía rápida
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WelcomeScreen;
