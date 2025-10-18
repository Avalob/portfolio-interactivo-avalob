// ============================================================
// 1. IMPORTACIONES Y VARIABLES GLOBALES
// ============================================================
import { useState, useEffect } from 'react';
import BuildingModal from './BuildingModal';
import './BuildingModal.css';

const ASSET_BASE_URL = import.meta.env.BASE_URL;

// ============================================================
// 2. COMPONENTE: ProyectosModal
// Modal para mostrar y filtrar proyectos del portfolio
// ============================================================
function ProyectosModal({ isOpen, onClose }) {
  // Estado para el filtro de categoría y reproducción de videos
  const [filterType, setFilterType] = useState('Todos');
  const [playing, setPlaying] = useState({});

  // =============================
  // 2.1 LISTADO DE PROYECTOS
  // =============================
  const proyectos = [
    {
      id: 1,
      nombre: "Tresele",
      categoria: "WordPress",
      periodo: "2024",
      descripcion: "Página web para una escuela de corte y confección y atelier de moda. Estilo elegante y amigable, con diseño responsivo y optimizado, transmitiendo cercanía y profesionalidad en el mundo de la moda.",
      tecnologias: ["WordPress", "Elementor"],
  imagen: `${ASSET_BASE_URL}Tresele-home.jpg`,
      vimeo: "https://vimeo.com/1119062509?share=copy#t=0",
      enlaces: {
        web: "https://www.tresele.com"
      },
      color: "#a78bfa"
    },
    {
      id: 2,
      nombre: "Treseleapp",
      categoria: "HTML/PHP",
      periodo: "2023-2024",
      descripcion: "ERP web en uso real que centraliza la gestión de clientes, alumnos, matrículas, citas, prendas y pagos, digitalizando los procesos del atelier y la escuela de patronaje para una gestión eficiente y segura.",
      tecnologias: ["HTML", "PHP", "MySQL"],
  imagen: `${ASSET_BASE_URL}Tresele-app-home.png`,
      vimeo: "https://vimeo.com/1119061339?share=copy#t=0",
      enlaces: {
        web: "https://treseleapp.es/",
        codigo: "https://github.com/Avalob/Tresele-app"
      },
      color: "#ef4444"
    },
    {
      id: 3,
      nombre: "Santissimo",
      categoria: "WordPress",
      periodo: "2024",
      descripcion: "Página web para un restaurante de alta gama en el centro histórico de Alcalá de Henares. Estilo sofisticado y elegante, con un diseño visual que resalta la exclusividad del lugar. Incluye menús, reservas online y optimización para dispositivos móviles.",
      tecnologias: ["WordPress", "Divi"],
  imagen: `${ASSET_BASE_URL}Santissimo-home.png`,
      vimeo: "https://vimeo.com/1120758496?share=copy",
      enlaces: {
        web: "https://santissimo.es/"
      },
      color: "#a78bfa"
    },
    {
      id: 4,
      nombre: "Prevan",
      categoria: "WordPress",
      periodo: "2023",
      descripcion: "Página web para una empresa de equipamientos para vehículos. Estilo moderno y actual, con una identidad visual de inspiración racing. Además del desarrollo web, realicé el diseño del logotipo, reforzando la marca y su imagen dinámica.",
      tecnologias: ["WordPress", "Elementor"],
  imagen: `${ASSET_BASE_URL}Prevan-home.png`,
      vimeo: "https://vimeo.com/1119053327?share=copy#t=0",
      enlaces: {
        web: "https://prevanequipamientos.es/"
      },
      color: "#a78bfa"
    },
    {
      id: 5,
      nombre: "Demovi",
      categoria: "WordPress",
      periodo: "2023",
      descripcion: "Página web para una empresa de campamentos juveniles. Estilo infantil y divertido, con un diseño colorido y accesible. Incluye sistema de inscripción online a los campamentos, facilitando el registro de participantes y mejorando la comunicación con las familias.",
      tecnologias: ["WordPress", "Divi"],
  imagen: `${ASSET_BASE_URL}Demovi-home.jpg`,
      vimeo: "https://vimeo.com/1119057808?share=copy#t=0",
      enlaces: {
        web: "https://demovi.es/"
      },
      color: "#a78bfa"
    },
    {
      id: 6,
      nombre: "Planetario Móvil",
      categoria: "WordPress",
      periodo: "2023",
      descripcion: "Página web para una empresa que vende y alquila planetarios móviles, con un estilo inspirado en el espacio y la astronomía. Diseño visual y responsivo, que transmite emoción y profesionalidad. Incluye secciones de catálogo de planetarios, reservas y contacto.",
      tecnologias: ["WordPress", "Divi"],
  imagen: `${ASSET_BASE_URL}Planetario-home.png`,
      vimeo: "https://vimeo.com/1119053800?share=copy#t=0",
      enlaces: {
        web: "https://planetariomovil.es/"
      },
      color: "#a78bfa"
    },
    {
      id: 7,
      nombre: "Telecom-ERP",
      categoria: "HTML/PHP",
      periodo: "2023",
      descripcion: "Aplicación web ERP para la gestión integral de Telecom, centralizando clientes, pedidos, incidencias, facturación y procesos internos en un entorno seguro y eficiente.",
      tecnologias: ["HTML", "CSS", "PHP"],
  imagen: `${ASSET_BASE_URL}telecom.png`,
      vimeo: "https://vimeo.com/1119058567?share=copy#t=0",
      enlaces: {
        codigo: "https://github.com/Avalob/Telecom-ERP"
      },
      color: "#ef4444"
    },
    {
      id: 8,
      nombre: "Portfolio Personal",
      categoria: "React",
      periodo: "2024",
      descripcion: "Portfolio personal creado con React, con un diseño moderno y profesional que presenta mis proyectos y habilidades de forma visual y atractiva.",
      tecnologias: ["React"],
  imagen: `${ASSET_BASE_URL}Portfolio.png`,
      vimeo: "https://vimeo.com/1119059685?share=copy#t=20",
      enlaces: {
        web: "https://avalob.github.io/portfolio-andrea-valbuena/",
        codigo: "https://github.com/Avalob/portfolio-andrea-valbuena"
      },
      color: "#60a5fa"
    },
    {
      id: 9,
      nombre: "React Calculadora Meta",
      categoria: "React",
      periodo: "2024",
      descripcion: "Primer proyecto desarrollado durante el curso Meta Front-End Developer, una calculadora funcional que aplica los conceptos fundamentales de React.",
      tecnologias: ["React"],
  imagen: `${ASSET_BASE_URL}calculadora.png`,
      vimeo: "https://vimeo.com/1119046183?share=copy#t=0",
      enlaces: {
        demo: "https://avalob.github.io/react-calculadora-meta/",
        codigo: "https://github.com/Avalob/react-calculadora-meta"
      },
      color: "#60a5fa"
    },
    {
      id: 10,
      nombre: "React Mouse Tracker",
      categoria: "React",
      periodo: "2024",
      descripcion: "Proyecto desarrollado durante el curso avanzado de React ofrecido por Meta, una aplicación interactiva que rastrea la posición del mouse y la muestra en tiempo real en diferentes formatos. El diseño es visual y dinámico.",
      tecnologias: ["React"],
  imagen: `${ASSET_BASE_URL}mouse.png`,
      vimeo: "https://vimeo.com/1119060764?share=copy#t=0",
      enlaces: {
        demo: "https://avalob.github.io/react-mouse-tracker/",
        codigo: "https://github.com/Avalob/react-mouse-tracker"
      },
      color: "#60a5fa"
    },
    {
      id: 11,
      nombre: "Lucky Shrub Website",
      categoria: "HTML/CSS",
      periodo: "2024",
      descripcion: 'Proyecto final del curso "HTML and CSS in depth" de Meta/Coursera, desarrollado para una empresa ficticia de jardinería y paisajismo. La web es completamente responsive y moderna, con un diseño profesional, visual y accesible.',
      tecnologias: ["HTML", "CSS"],
  imagen: `${ASSET_BASE_URL}Lucky-Shrub.png`,
      vimeo: "https://vimeo.com/1119059151?share=copy#t=0",
      enlaces: {
        demo: "https://avalob.github.io/lucky-shrub-website/",
        codigo: "https://github.com/Avalob/lucky-shrub-website"
      },
      color: "#10b981"
    }
  ];

  // =============================
  // 2.2 FILTROS DE CATEGORÍA
  // =============================
  const FILTERS = ['Todos', 'React', 'WordPress', 'HTML/PHP', 'HTML/CSS'];
  const proyectosFiltrados = filterType === 'Todos' 
    ? proyectos 
    : proyectos.filter(p => p.categoria === filterType);

  // =============================
  // 2.3 HANDLER DE REPRODUCCIÓN DE VIDEO
  // =============================
  // Esta función alterna la reproducción de video en la tarjeta de proyecto
  const handleMediaClick = (id) => {
    setPlaying((p) => ({ ...p, [id]: !p[id] }));
  };

  // ============================================================
  // 3. RENDER DEL MODAL Y GRID DE PROYECTOS
  // ============================================================
  return (
    <BuildingModal
      isOpen={isOpen}
      onClose={onClose}
      title="Mis Proyectos"
      icon="🚀"
      maxWidth="90%"
      maxHeight="90%"
    >
      <div className="building-section">
        <p style={{ textAlign: 'center', marginBottom: '20px', color: 'rgba(148,163,184,0.9)' }}>
          💡 Filtra por categoría y explora mis proyectos
        </p>
        {/* =============================
            3.1 FILTROS DE CATEGORÍA
            ============================= */}
        <div style={{ 
          display: 'flex', 
          gap: '0.75rem', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          marginBottom: '2rem'
        }}>
          {FILTERS.map((filtro) => (
            <button
              key={filtro}
              onClick={() => setFilterType(filtro)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '4px',
                border: filterType === filtro 
                  ? '1px solid var(--color-primary)' 
                  : '2px solid rgba(148,163,184,0.3)',
                background: filterType === filtro 
                  ? 'rgba(96, 165, 250, 0.1)' 
                  : 'rgba(30,41,59,0.5)',
                color: filterType === filtro 
                  ? 'var(--color-primary)' 
                  : 'rgba(148,163,184,0.9)',
                cursor: 'pointer',
                fontWeight: filterType === filtro ? '600' : '500',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                if (filterType !== filtro) {
                  e.target.style.borderColor = 'rgba(148,163,184,0.5)';
                  e.target.style.background = 'rgba(30,41,59,0.7)';
                }
              }}
              onMouseLeave={(e) => {
                if (filterType !== filtro) {
                  e.target.style.borderColor = 'rgba(148,163,184,0.3)';
                  e.target.style.background = 'rgba(30,41,59,0.5)';
                }
              }}
            >
              {filtro}
            </button>
          ))}
        </div>
      </div>
      {/* =============================
          3.2 GRID DE PROYECTOS
          ============================= */}
      <div className="projects-grid">
        {proyectosFiltrados.map((proyecto) => (
          <div key={proyecto.id} className="project-card">
            {/* Header con título y tecnologías */}
            <div className="project-card-header">
              <h3 className="project-card-title">{proyecto.nombre}</h3>
              <div className="project-card-tags">
                {proyecto.tecnologias.map((tech, i) => (
                  <span key={i} className="project-tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            {/* Descripción del proyecto */}
            <p className="project-card-description">{proyecto.descripcion}</p>
            {/* Multimedia: imagen o video */}
            <div 
              className="project-card-media"
              onClick={() => proyecto.vimeo && handleMediaClick(proyecto.id)}
              style={{ cursor: proyecto.vimeo ? 'pointer' : 'default' }}
            >
              {!playing[proyecto.id] && (
                <img 
                  src={proyecto.imagen} 
                  alt={proyecto.nombre}
                  className="project-card-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              {proyecto.vimeo && playing[proyecto.id] && (
                <iframe
                  src={`https://player.vimeo.com/video/${
                    proyecto.vimeo.match(/(\d+)/)?.[1]
                  }?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0`}
                  title={proyecto.nombre}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  className="project-card-iframe"
                />
              )}
            </div>
            {/* Botones de acción: web, demo, código */}
            <div className="project-card-actions">
              {proyecto.enlaces.web && (
                <a 
                  href={proyecto.enlaces.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card-btn project-card-btn-web"
                >
                  🌐 Web
                </a>
              )}
              {proyecto.enlaces.demo && (
                <a 
                  href={proyecto.enlaces.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card-btn project-card-btn-demo"
                >
                  🎮 Demo
                </a>
              )}
              {proyecto.enlaces.codigo && (
                <a 
                  href={proyecto.enlaces.codigo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card-btn project-card-btn-code"
                >
                  💻 Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </BuildingModal>
  );
}

// ============================================================
// 4. EXPORTACIÓN DEL COMPONENTE
// ============================================================
export default ProyectosModal;