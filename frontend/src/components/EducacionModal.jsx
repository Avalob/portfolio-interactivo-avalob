// ============================================================
// EDUCACION MODAL - FORMACIÓN ACADÉMICA INTERACTIVA
// Componente que muestra la trayectoria educativa con dropdowns para detalles
// ============================================================

import React, { useState } from 'react';
import BuildingModal from './BuildingModal';
import './BuildingModal.css';

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
function EducacionModal({ isOpen, onClose }) {
  // ============================================================
  // 1. ESTADO - CONTROL DE DROPDOWNS
  // ============================================================
  // Array de booleanos que indica qué dropdowns están abiertos
  const [open, setOpen] = useState([false, false, false, false, false]);

  // ============================================================
  // 2. FUNCIÓN - TOGGLE DE DROPDOWNS
  // ============================================================
  // Alterna el estado abierto/cerrado de un dropdown por índice
  const toggle = idx => setOpen(arr => arr.map((v, i) => i === idx ? !v : v));

  // ============================================================
  // 3. RENDER - ESTRUCTURA DEL MODAL
  // ============================================================
  return (
    <BuildingModal
      isOpen={isOpen}
      onClose={onClose}
      title="Formación Académica"
      icon="🎓"
      maxWidth="90%"
      maxHeight="90%"
    >
      <div className="timeline-edu-container">
        <div className="timeline-edu-line"></div>
        <div className="timeline-edu-items">
          {/* ============================================================
              1. FORMACIÓN ACTUAL - DAM
              ============================================================ */}
          <div className="timeline-edu-item">
            <div className="timeline-edu-dot"></div>
            <div className="building-section building-section-edu">
              <h2>📚 Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)</h2>
              <p><strong>Digitech FP</strong> | 2023 – 2025</p>
              <button className="dropdown-btn" onClick={() => toggle(0)}>
                <span>Ver detalles</span>
                <span className={`dropdown-arrow ${open[0] ? 'open' : ''}`}>›</span>
              </button>
              {open[0] && (
                <div className="dropdown-content">
                  {/* Detalles de la formación DAM */}
                  Formación técnica especializada en el <strong>desarrollo de aplicaciones full stack</strong> para escritorio, web y dispositivos móviles. Durante este ciclo he adquirido una sólida base en <strong>programación, diseño de bases de datos, arquitectura de software</strong> y <strong>metodologías ágiles</strong>, con una visión integral del proceso de desarrollo.<br /><br />
                  He trabajado con lenguajes y tecnologías como <strong>Java, PHP, JavaScript, HTML, CSS y SQL/MariaDB</strong>, además de frameworks y librerías modernas para construir aplicaciones dinámicas, escalables y centradas en el usuario.<br /><br />
                  El programa incluye también la <strong>creación de videojuegos y apps móviles</strong> mediante Android Studio, implementando lógica, gráficos y gestión de eventos. Además, he desarrollado habilidades en <strong>gestión de redes, sistemas y entornos conectados</strong>, aplicando conocimientos sobre protocolos y seguridad informática.<br /><br />
                  Este grado me ha permitido consolidar una mentalidad <strong>estructurada, analítica y orientada a la resolución de problemas</strong>, además de una gran capacidad para trabajar en <strong>equipos ágiles (Scrum/Kanban)</strong> y usar herramientas como <strong>Git</strong> para control de versiones y despliegue en la nube.
                </div>
              )}
            </div>
          </div>

          {/* ============================================================
              2. GRADO EN MATEMÁTICAS (INCOMPLETO)
              ============================================================ */}
          <div className="timeline-edu-item">
            <div className="timeline-edu-dot"></div>
            <div className="building-section building-section-edu">
              <h2>📐 Grado en Matemáticas (incompleto, segundo año)</h2>
              <p><strong>UNED</strong> | 2021 – 2023</p>
              <button className="dropdown-btn" onClick={() => toggle(1)}>
                <span>Ver detalles</span>
                <span className={`dropdown-arrow ${open[1] ? 'open' : ''}`}>›</span>
              </button>
              {open[1] && (
                <div className="dropdown-content">
                  {/* Detalles de la formación en matemáticas */}
                  Esta formación me permitió desarrollar una <strong>mentalidad lógica, analítica y resolutiva</strong>, aplicable directamente al mundo del desarrollo y la programación. A través del estudio de asignaturas como álgebra, cálculo, probabilidad y estadística, adquirí una comprensión profunda de la <strong>estructura matemática y el razonamiento abstracto</strong>.<br /><br />
                  Además, el enfoque autodidacta de la UNED fortaleció mi <strong>disciplina, organización y capacidad de aprendizaje independiente</strong>, cualidades que aplico cada día en mi trabajo como desarrolladora.<br /><br />
                  Este grado reforzó mi capacidad para diseñar <strong>algoritmos eficientes</strong>, analizar patrones, optimizar procesos y abordar los problemas con un enfoque sistemático y orientado a resultados.
                </div>
              )}
            </div>
          </div>

          {/* ============================================================
              3. CERTIFICADO DE PROFESIONALIDAD EN MULTIMEDIA
              ============================================================ */}
          <div className="timeline-edu-item">
            <div className="timeline-edu-dot"></div>
            <div className="building-section building-section-edu">
              <h2>🖌️ Certificado de Profesionalidad en Desarrollo de Productos Editoriales Multimedia</h2>
              <p><strong>CIC Formación</strong> | 2017 – 2018</p>
              <button className="dropdown-btn" onClick={() => toggle(2)}>
                <span>Ver detalles</span>
                <span className={`dropdown-arrow ${open[2] ? 'open' : ''}`}>›</span>
              </button>
              {open[2] && (
                <div className="dropdown-content">
                  {/* Detalles del certificado de profesionalidad */}
                  Esta formación me permitió adquirir competencias avanzadas en <strong>creación de contenidos digitales interactivos y multimedia</strong>, incluyendo <strong>diseño, maquetación y publicación online</strong>. Aprendí a manejar herramientas profesionales como <strong>Adobe Illustrator, InDesign, Photoshop y Premiere Pro</strong>, aplicándolas en proyectos prácticos y reales.<br /><br />
                  El programa reforzó mi capacidad para <strong>integrar diseño, funcionalidad y experiencia de usuario</strong> en productos digitales, desarrollando soluciones atractivas, efectivas y adaptadas a distintos soportes.<br /><br />
                  Además, fortaleció mi <strong>versatilidad técnica, creatividad y atención al detalle</strong>, habilidades directamente aplicables al diseño UI/UX y al desarrollo front-end.
                </div>
              )}
            </div>
          </div>

          {/* ============================================================
              4. GRADO SUPERIOR EN ASESORÍA DE IMAGEN PERSONAL
              ============================================================ */}
          <div className="timeline-edu-item">
            <div className="timeline-edu-dot"></div>
            <div className="building-section building-section-edu">
              <h2>🎨 Grado Superior en Asesoría de Imagen Personal (AIP)</h2>
              <p><strong>IES Santa Engracia</strong> | 2011 – 2013</p>
              <button className="dropdown-btn" onClick={() => toggle(3)}>
                <span>Ver detalles</span>
                <span className={`dropdown-arrow ${open[3] ? 'open' : ''}`}>›</span>
              </button>
              {open[3] && (
                <div className="dropdown-content">
                  {/* Detalles de la formación en AIP */}
                  Durante este grado adquirí competencias en <strong>gestión de proyectos, planificación de recursos y optimización de procesos</strong>, desarrollando la capacidad de organizar tareas de manera eficiente y coordinada.<br /><br />
                  La formación también incluyó <strong>coordinación de equipos, atención al detalle y mejora continua</strong>, habilidades que fortalecen mi capacidad de trabajo colaborativo y planificación estratégica.<br /><br />
                  Además, desarrollé un marcado <strong>sentido estético y artístico</strong>, aplicable al <strong>diseño visual y la creatividad</strong>, competencias que luego he integrado en proyectos digitales y de desarrollo frontend.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </BuildingModal>
  );
}

export default EducacionModal;
