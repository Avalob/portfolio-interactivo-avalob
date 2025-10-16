// ============================================================
// 1. IMPORTACIONES Y DEPENDENCIAS
// ============================================================
import React, { useState } from 'react';
import BuildingModal from './BuildingModal';
import './BuildingModal.css';

// ============================================================
// 2. COMPONENTE: OtrosModal
// Modal para mostrar cursos y certificaciones adicionales
// ============================================================
function OtrosModal({ isOpen, onClose }) {
  // Estado local para controlar qué secciones están expandidas
  const [expandedSections, setExpandedSections] = useState({});

  // Esta función alterna la visibilidad de cada sección desplegable
  const toggleSection = (key) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // ============================================================
  // 3. RENDER DEL MODAL Y CURSOS
  // ============================================================
  return (
    <BuildingModal
      isOpen={isOpen}
      onClose={onClose}
      title="Otros Cursos y Certificaciones"
      icon="🎨"
      maxWidth="90%"
      maxHeight="90%"
    >
      <div className="otros-grid">
        {/* =============================
            3.1 META FRONT-END CAPSTONE
            ============================= */}
        <div className="building-section">
          <h2>⚛️ Desarrollador Front-End Capstone</h2>
          <p><strong> Meta | 2025</strong></p>
          <div className="exp-dropdown-item">
            <button 
              className="exp-dropdown-btn"
              onClick={() => toggleSection('meta-desc')}
            >
              <span>Ver descripción</span>
              <span className={`arrow ${expandedSections['meta-desc'] ? 'open' : ''}`}>›</span>
            </button>
            {expandedSections['meta-desc'] && (
              <div className="exp-dropdown-content">
                Curso intensivo completamente enfocado en React y UI/UX. Aprendizaje de desarrollo Front-End profesional: creación de interfaces dinámicas, diseño de componentes reutilizables, buenas prácticas en HTML, CSS y JavaScript, y construcción de aplicaciones modernas centradas en la experiencia del usuario.
              </div>
            )}
          </div>
          <a 
            href="https://coursera.org/share/a5ca3d250670d7b36d55f7418bcf0a80" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-prim"
          >
            Ver Credencial →
          </a>
        </div>
        {/* =============================
            3.2 PROGRAMACIÓN EN PYTHON
            ============================= */}
        <div className="building-section">
          <h2>🐍 Programación en Python</h2>
          <p><strong>Universidad de los Andes | 2025</strong></p>
          <div className="exp-dropdown-item">
            <button 
              className="exp-dropdown-btn"
              onClick={() => toggleSection('python-desc')}
            >
              <span>Ver descripción</span>
              <span className={`arrow ${expandedSections['python-desc'] ? 'open' : ''}`}>›</span>
            </button>
            {expandedSections['python-desc'] && (
              <div className="exp-dropdown-content">
                Formación en programación con Python, resolución de problemas, estructuras de datos, desarrollo de algoritmos eficientes y fundamentos de creación de aplicaciones.
              </div>
            )}
          </div>
          <a 
            href="https://coursera.org/share/36b387fb539a9190a4caa7f18f2af92a" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-prim"
          >
            Ver Credencial →
          </a>
        </div>
        {/* =============================
            3.3 MARKETING ONLINE
            ============================= */}
        <div className="building-section">
          <h2>📈 Marketing Online</h2>
          <p><strong>Grupo Conforsa | 2020</strong></p>
          <div className="exp-dropdown-item">
            <button 
              className="exp-dropdown-btn"
              onClick={() => toggleSection('marketing-desc')}
            >
              <span>Ver descripción</span>
              <span className={`arrow ${expandedSections['marketing-desc'] ? 'open' : ''}`}>›</span>
            </button>
            {expandedSections['marketing-desc'] && (
              <div className="exp-dropdown-content">
                Formación en estrategias de marketing digital, posicionamiento online y técnicas de promoción para aumentar visibilidad y engagement en distintos canales digitales.
              </div>
            )}
          </div>
        </div>
        {/* =============================
            3.4 WORDPRESS
            ============================= */}
        <div className="building-section">
          <h2>🌐 Gráfico WordPress</h2>
          <p><strong>Grupo Conforsa | 2020</strong></p>
          <div className="exp-dropdown-item">
            <button 
              className="exp-dropdown-btn"
              onClick={() => toggleSection('wordpress-desc')}
            >
              <span>Ver descripción</span>
              <span className={`arrow ${expandedSections['wordpress-desc'] ? 'open' : ''}`}>›</span>
            </button>
            {expandedSections['wordpress-desc'] && (
              <div className="exp-dropdown-content">
                Aprendizaje práctico en diseño web con WordPress: creación de sitios personalizados, adaptación de plantillas, desarrollo de funcionalidades básicas y optimización de contenidos para una experiencia de usuario atractiva.
              </div>
            )}
          </div>
        </div>
        {/* =============================
            3.5 VISUAL MERCHANDISING
            ============================= */}
        <div className="building-section">
          <h2>🎨 Máster en Visual Merchandising y Escaparatismo</h2>
          <p><strong>Salesas Instituto | 2017</strong></p>
          <div className="exp-dropdown-item">
            <button 
              className="exp-dropdown-btn"
              onClick={() => toggleSection('visual-desc')}
            >
              <span>Ver descripción</span>
              <span className={`arrow ${expandedSections['visual-desc'] ? 'open' : ''}`}>›</span>
            </button>
            {expandedSections['visual-desc'] && (
              <div className="exp-dropdown-content">
                Desarrollo de la creatividad aplicada al diseño, atención al detalle y experiencia del usuario. Aprendizaje de técnicas para transformar ideas conceptuales en soluciones visuales y funcionales, con aplicaciones directas en UI/UX y diseño Front-End.
              </div>
            )}
          </div>
        </div>
      </div>
    </BuildingModal>
  );
}

// ============================================================
// 4. EXPORTACIÓN DEL COMPONENTE
// ============================================================
export default OtrosModal;
