import React, { useState } from 'react';
import BuildingModal from './BuildingModal';
import './BuildingModal.css';

// =============================
// UI: Modal de Experiencia Profesional
// =============================
function ExperienciaModal({ isOpen, onClose }) {
  // Estado para controlar qué secciones están expandidas
  const [expandedSections, setExpandedSections] = useState({});

  // Alterna la expansión de una sección
  const toggleSection = (key) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <BuildingModal
      isOpen={isOpen}
      onClose={onClose}
      title="Experiencia Profesional"
      icon="💼"
      maxWidth="90%"
      maxHeight="90%"
    >
      <div className="experiencia-columns">
        {/* === EMCO AGENCY === */}
        <div className="building-section">
          <h2>🌐 EMCO AGENCY | Desarrolladora Web</h2>
          <p><strong>Enero 2025 - Mayo 2025</strong></p>
          {/* Sección: Descripción general */}
          <div className="exp-dropdown-item">
            <button 
              className="exp-dropdown-btn"
              onClick={() => toggleSection('emco-desc')}
            >
              <span>Descripción general</span>
              <span className={`arrow ${expandedSections['emco-desc'] ? 'open' : ''}`}>›</span>
            </button>
            {expandedSections['emco-desc'] && (
              <div className="exp-dropdown-content">
                Desarrollé sitios web para clientes utilizando <strong>WordPress, CSS y JavaScript</strong>, combinando funcionalidad, diseño y optimización SEO para mejorar la presencia online de los clientes.
              </div>
            )}
          </div>
          {/* Sección: Logros y responsabilidades */}
          <div className="exp-dropdown-item">
            <button 
              className="exp-dropdown-btn"
              onClick={() => toggleSection('emco-logros')}
            >
              <span>Logros y responsabilidades clave</span>
              <span className={`arrow ${expandedSections['emco-logros'] ? 'open' : ''}`}>›</span>
            </button>
            {expandedSections['emco-logros'] && (
              <div className="exp-dropdown-content">
                <ul>
                  <li>Desarrollo de sitios web en WordPress, adaptando temas y creando funcionalidades personalizadas con CSS y JavaScript.</li>
                  <li>Optimización SEO on-page para mejorar visibilidad y posicionamiento en buscadores.</li>
                  <li>Colaboración con diseñadores y clientes para transformar ideas y prototipos en sitios web completos y funcionales.</li>
                  <li>Implementación de buenas prácticas de accesibilidad y rendimiento web.</li>
                </ul>
              </div>
            )}
          </div>
          {/* Sección: Resultados destacados */}
          <div className="exp-dropdown-item">
            <button 
              className="exp-dropdown-btn"
              onClick={() => toggleSection('emco-resultados')}
            >
              <span>Resultados destacados</span>
              <span className={`arrow ${expandedSections['emco-resultados'] ? 'open' : ''}`}>›</span>
            </button>
            {expandedSections['emco-resultados'] && (
              <div className="exp-dropdown-content">
                <ul>
                  <li>Entrega de 7 proyectos completos a clientes, todos con feedback positivo por usabilidad y diseño.</li>
                  <li>Mejoras en velocidad y rendimiento de sitios web, aumentando la satisfacción de los usuarios.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* === FREELANCE === */}
        <div className="building-section">
          <h2>💻 FREELANCE | Desarrollo Web</h2>
          <p><strong>2022 - 2024</strong></p>
          {/* Sección: Descripción general */}
          <div className="exp-dropdown-item">
            <button 
              className="exp-dropdown-btn"
              onClick={() => toggleSection('free-desc')}
            >
              <span>Descripción general</span>
              <span className={`arrow ${expandedSections['free-desc'] ? 'open' : ''}`}>›</span>
            </button>
            {expandedSections['free-desc'] && (
              <div className="exp-dropdown-content">
                Gestión de proyectos web completos para clientes y propios, desarrollando soluciones personalizadas en <strong>front-end y back-end</strong>.
              </div>
            )}
          </div>
          {/* Sección: Logros y responsabilidades */}
          <div className="exp-dropdown-item">
            <button 
              className="exp-dropdown-btn"
              onClick={() => toggleSection('free-logros')}
            >
              <span>Logros y responsabilidades clave</span>
              <span className={`arrow ${expandedSections['free-logros'] ? 'open' : ''}`}>›</span>
            </button>
            {expandedSections['free-logros'] && (
              <div className="exp-dropdown-content">
                <ul>
                  <li>Creación de sitios web y aplicaciones dinámicas con <strong>HTML, CSS, JavaScript, PHP y SQL (MariaDB)</strong>.</li>
                  <li>Desarrollo y despliegue en dominios propios.</li>
                </ul>
              </div>
            )}
          </div>
          {/* Sección: Proyectos destacados */}
          <div className="exp-dropdown-item">
            <button 
              className="exp-dropdown-btn"
              onClick={() => toggleSection('free-proyectos')}
            >
              <span>Proyectos destacados</span>
              <span className={`arrow ${expandedSections['free-proyectos'] ? 'open' : ''}`}>›</span>
            </button>
            {expandedSections['free-proyectos'] && (
              <div className="exp-dropdown-content">
                <ul>
                  <li>2 sitios web completos en WordPress con diseño responsivo y optimización SEO.</li>
                  <li>Aplicación web completa para gestión empresarial en PHP con AJAX, incluyendo chat interno, gráficos de datos, gestión de asistencias y compras de clases para alumnos.</li>
                  <li>Adaptación de sitios web a dispositivos móviles mediante responsive design.</li>
                  <li>Consultoría técnica y mantenimiento de proyectos web para clientes.</li>
                </ul>
              </div>
            )}
          </div>
          {/* Sección: Resultados destacados */}
          <div className="exp-dropdown-item">
            <button 
              className="exp-dropdown-btn"
              onClick={() => toggleSection('free-resultados')}
            >
              <span>Resultados destacados</span>
              <span className={`arrow ${expandedSections['free-resultados'] ? 'open' : ''}`}>›</span>
            </button>
            {expandedSections['free-resultados'] && (
              <div className="exp-dropdown-content">
                <ul>
                  <li>Lanzamiento exitoso de múltiples proyectos web con interfaces modernas y experiencia de usuario optimizada.</li>
                  <li>Implementación de funcionalidades complejas en aplicaciones web, aumentando la eficiencia de procesos internos de clientes.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* === MEDIASET === */}
        <div className="building-section">
          <h2>📺 MEDIASET | Sastra de Televisión</h2>
          <p><strong>2021 - 2024</strong></p>
          {/* Sección: Descripción general */}
          <div className="exp-dropdown-item">
            <button 
              className="exp-dropdown-btn"
              onClick={() => toggleSection('mediaset-desc')}
            >
              <span>Descripción general</span>
              <span className={`arrow ${expandedSections['mediaset-desc'] ? 'open' : ''}`}>›</span>
            </button>
            {expandedSections['mediaset-desc'] && (
              <div className="exp-dropdown-content">
                Gestión y coordinación de vestuario para producciones televisivas, trabajando bajo presión y asegurando resultados de alta calidad.
              </div>
            )}
          </div>
          {/* Sección: Logros y responsabilidades */}
          <div className="exp-dropdown-item">
            <button 
              className="exp-dropdown-btn"
              onClick={() => toggleSection('mediaset-logros')}
            >
              <span>Logros y responsabilidades clave</span>
              <span className={`arrow ${expandedSections['mediaset-logros'] ? 'open' : ''}`}>›</span>
            </button>
            {expandedSections['mediaset-logros'] && (
              <div className="exp-dropdown-content">
                <ul>
                  <li>Organización y planificación de recursos de vestuario para producciones en directo.</li>
                  <li>Comunicación y colaboración con equipos multidisciplinares (producción, dirección, cámara).</li>
                  <li>Atención al detalle y cumplimiento de plazos ajustados en entornos dinámicos.</li>
                </ul>
              </div>
            )}
          </div>
          {/* Sección: Resultados destacados */}
          <div className="exp-dropdown-item">
            <button 
              className="exp-dropdown-btn"
              onClick={() => toggleSection('mediaset-resultados')}
            >
              <span>Resultados destacados</span>
              <span className={`arrow ${expandedSections['mediaset-resultados'] ? 'open' : ''}`}>›</span>
            </button>
            {expandedSections['mediaset-resultados'] && (
              <div className="exp-dropdown-content">
                <ul>
                  <li>Contribución a producciones sin retrasos ni incidencias de vestuario durante tres años consecutivos.</li>
                  <li>Desarrollo de habilidades transferibles a entornos tech: gestión de proyectos, resolución de problemas y coordinación efectiva de equipos.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* === HABILIDADES PROFESIONALES CLAVE === */}
        <div className="building-section">
          <h2>🎯 Habilidades Profesionales Clave</h2>
          <ul>
            <li><strong>Gestión de proyectos:</strong> Coordinación de equipos, planificación y entrega bajo presión</li>
            <li><strong>Resolución de problemas:</strong> Análisis técnico y toma de decisiones efectivas</li>
            <li><strong>Comunicación:</strong> Colaboración con stakeholders técnicos y no técnicos</li>
            <li><strong>Adaptabilidad:</strong> Transición exitosa entre diferentes industrias y roles</li>
            <li><strong>Atención al detalle:</strong> Garantía de calidad en entregas y documentación</li>
          </ul>
        </div>
      </div>
    </BuildingModal>
  );
}

export default ExperienciaModal;
