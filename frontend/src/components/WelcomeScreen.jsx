// ============================================================
// 1. IMPORTACIONES Y ESTILOS
// ============================================================
import React, { useEffect, useState } from 'react';
import './WelcomeScreen.css';
import HelpGuideContent from './HelpGuideContent';

// ============================================================
// 2. COMPONENTE PRINCIPAL: WelcomeScreen
// ============================================================
// Pantalla de bienvenida animada con presentación e instrucciones.
function WelcomeScreen({ isOpen, onEnter }) {
  // ------------------------------------------------------------
  // 2.1 ESTADOS LOCALES
  // ------------------------------------------------------------
  // Controla la animación de salida y la visualización de la guía
  const [isExiting, setIsExiting] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // ------------------------------------------------------------
  // 2.2 EFECTO DE REINICIO AL ABRIR
  // ------------------------------------------------------------
  useEffect(() => {
    if (isOpen) {
      setIsExiting(false);
      setShowGuide(false);
    }
  }, [isOpen]);

  // ------------------------------------------------------------
  // 2.3 CONTROL DE RENDERIZADO
  // ------------------------------------------------------------
  // Si el modal no está abierto, no se renderiza nada
  if (!isOpen) return null;

  // ------------------------------------------------------------
  // 2.4 MANEJADORES DE ACCIONES
  // ------------------------------------------------------------
  // Inicia la animación de salida y ejecuta la función de entrada
  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 800); // Duración de la animación de salida
  };

  // Muestra la guía rápida
  const handleShowHelp = () => {
    setShowGuide(true);
  };

  // ------------------------------------------------------------
  // 2.5 RENDERIZADO DEL COMPONENTE
  // ------------------------------------------------------------
  // Muestra la pantalla de bienvenida o la guía según el estado
  return (
    <div className={`welcome-overlay ${isExiting ? 'exit' : ''}`}>
      <div className={`welcome-container ${showGuide ? 'guide-view' : ''}`}>
        {showGuide ? (
          // Vista de la guía rápida
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
          // Vista de bienvenida principal
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

// ============================================================
// 3. EXPORTACIÓN DEL COMPONENTE
// ============================================================
export default WelcomeScreen;
