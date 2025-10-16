
// ============================================================
// 1. IMPORTACIONES Y DEPENDENCIAS
// ============================================================
import { useEffect, useRef, useState } from 'react';
import { PiLinkedinLogoDuotone, PiGithubLogoDuotone, PiBehanceLogoFill } from 'react-icons/pi';
import './RecruiterPanel.css';

// ============================================================
// 2. COMPONENTE PRINCIPAL: RecruiterPanel
// ============================================================
// Panel informativo y de contacto para reclutadores, con acceso rápido a CV, skills, experiencia y formulario de contacto.
function RecruiterPanel({ isOpen, onClose, onOpenProjects }) {
  // ------------------------------------------------------------
  // Referencia para evitar cierre inmediato al abrir el panel
  // ------------------------------------------------------------
  const justOpenedRef = useRef(false);

  // ------------------------------------------------------------
  // Efecto: Controla el estado de apertura para evitar cierre accidental
  // ------------------------------------------------------------
  useEffect(() => {
    if (isOpen) {
      justOpenedRef.current = true;
      const timer = setTimeout(() => {
        justOpenedRef.current = false;
      }, 250);
      return () => clearTimeout(timer);
    }
    justOpenedRef.current = false;
    return undefined;
  }, [isOpen]);

  // ------------------------------------------------------------
  // Estado: Formulario de contacto y control de envío
  // ------------------------------------------------------------
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  // ------------------------------------------------------------
  // Maneja cambios en los campos del formulario de contacto
  // ------------------------------------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ------------------------------------------------------------
  // Envía el formulario de contacto usando EmailJS
  // ------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    import('emailjs-com').then(emailjs => {
      emailjs.default
        .send(
          'service_4ggfl6r', // ID de servicio EmailJS
          'template_uvsjcl5',  // ID de plantilla EmailJS
          {
            name: contactForm.name,
            email: contactForm.email,
            message: contactForm.message,
          },
          'FxUWVTdKBWSYfkWEz' // Clave pública EmailJS
        )
        .then(
          () => {
            setFormSubmitted(true);
            setSending(false);
            setContactForm({ name: '', email: '', message: '' });
            setTimeout(() => setFormSubmitted(false), 3000);
          },
          () => {
            setError('Hubo un error al enviar el mensaje.');
            setSending(false);
          }
        );
    });
  };

  // ------------------------------------------------------------
  // Descarga el CV desde la ruta pública
  // ------------------------------------------------------------
  const handleDownloadCV = () => {
    // Si la ruta del CV cambia, actualízala aquí
    const cvUrl = '/frontend/public/Curriculum Andrea Valbuena.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'CV-Andres-Developer.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ------------------------------------------------------------
  // Cierra el panel al pulsar el botón de cierre
  // ------------------------------------------------------------
  const handleToggle = (e) => {
    e.stopPropagation();
    onClose();
  };

  // ------------------------------------------------------------
  // Cierra el panel al hacer click fuera, salvo justo al abrir
  // ------------------------------------------------------------
  const handleBackdropClick = () => {
    if (justOpenedRef.current) return;
    onClose();
  };

  // ============================================================
  // 3. RENDERIZADO DEL PANEL Y SECCIONES
  // ============================================================
  return (
    <>
      {/* Panel lateral principal con toda la información relevante */}
      <div 
        className={`recruiter-panel ${isOpen ? 'open' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del panel con título y botón de cierre */}
        <div className="recruiter-panel-header">
          <h2 className="recruiter-panel-title">
            <span className="recruiter-icon">P</span>
            Modo Reclutador
          </h2>
          <button className="recruiter-close-btn" onClick={handleToggle}>✕</button>
        </div>

        <div className="recruiter-panel-content">
          {/* ============================================================ */}
          {/* 3.1 SOBRE MÍ */}
          {/* ============================================================ */}
          <section className="building-section about-section">
            <h3 className="recruiter-section-title">Sobre mí</h3>
            <p className="about-description">
              Desarrolladora de aplicaciones multiplataforma con formación en DAM y conocimientos en Java, SQL, JavaScript, Git y React. Me apasiona crear soluciones tecnológicas, aprender de manera continua y aportar en proyectos colaborativos, combinando organización y capacidad de resolución de problemas.
            </p>
          </section>

          {/* ============================================================ */}
          {/* 3.2 INFORMACIÓN PROFESIONAL */}
          {/* ============================================================ */}
          <section className="building-section info-section">
            <h3 className="recruiter-section-title">Información Profesional</h3>
            <div className="recruiter-quick-info">
              <div className="quick-info-item">
                <span className="info-label">Nombre:</span>
                <span className="info-value">Andrea Valbuena</span>
              </div>
              <div className="quick-info-item">
                <span className="info-label">Alias:</span>
                <span className="info-value">@avalob</span>
              </div>
              <div className="quick-info-item">
                <span className="info-label">Rol:</span>
                <span className="info-value">Full Stack Developer/ Frontend Developer</span>
              </div>
              <a 
                href="tel:666926010"
                className="quick-info-item phone-link"
              >
                <span className="info-label">Teléfono:</span>
                <span className="info-value">666926010</span>
              </a>
              <a 
                href="mailto:andreavallob22@gmail.com"
                className="quick-info-item email-link"
              >
                <span className="info-label">Email:</span>
                <span className="info-value">andreavallob22@gmail.com</span>
              </a>
              <div className="quick-info-item">
                <span className="info-label">Ubicación:</span>
                <span className="info-value">Madrid España</span>
              </div>
              <div className="quick-info-item">
                <span className="info-label">Disponibilidad:</span>
                <span className="availability-badge">Disponible</span>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 3.3 DESCARGA DE CV */}
          {/* ============================================================ */}
          <section className="building-section cv-section">
            <h3 className="recruiter-section-title">Currículum</h3>
            <button className="download-cv-btn" onClick={handleDownloadCV}>
              <span className="download-icon">⬇️</span>
              Descargar CV
            </button>
          </section>

          {/* ============================================================ */}
          {/* 3.4 ENLACES PROFESIONALES */}
          {/* ============================================================ */}
          <section className="building-section links-section">
            <h3 className="recruiter-section-title">Enlaces Profesionales</h3>
            <div className="social-links">
              <a 
                href="https://www.linkedin.com/in/andreavalbuenalobaton/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link linkedin"
              >
                <span className="social-icon linkedin-icon"><PiLinkedinLogoDuotone /></span>
                <span className="social-text">LinkedIn</span>
                <span className="social-arrow">→</span>
              </a>
              <a 
                href="https://github.com/avalob" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link github"
              >
                <span className="social-icon github-icon"><PiGithubLogoDuotone /></span>
                <span className="social-text">GitHub</span>
                <span className="social-arrow">→</span>
              </a>
              <a 
                href="https://www.behance.net/andreavalbuena" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link behance"
              >
                <span className="social-icon behance-icon"><PiBehanceLogoFill /></span>
                <span className="social-text">Behance</span>
                <span className="social-arrow">→</span>
              </a>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 3.5 EXPERIENCIA PROFESIONAL */}
          {/* ============================================================ */}
          <section className="building-section experience-section">
            <h3 className="recruiter-section-title">Experiencia Profesional</h3>
            <div className="experience-timeline">
              <div className="experience-item">
                <div className="experience-dot"></div>
                <div className="experience-content">
                  <h4>Desarrolladora Web</h4>
                  <p className="experience-company">EMCO AGENCY</p>
                  <p className="experience-period">Ene 2025 - May 2025</p>
                </div>
              </div>
              <div className="experience-item">
                <div className="experience-dot"></div>
                <div className="experience-content">
                  <h4>Desarrollo Web</h4>
                  <p className="experience-company">FREELANCE</p>
                  <p className="experience-period">2022 - 2024</p>
                </div>
              </div>
              <div className="experience-item">
                <div className="experience-dot"></div>
                <div className="experience-content">
                  <h4>Sastra de Televisión</h4>
                  <p className="experience-company">MEDIASET</p>
                  <p className="experience-period">2021 - 2024</p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 3.6 FORMACIÓN ACADÉMICA */}
          {/* ============================================================ */}
          <section className="building-section education-section">
            <h3 className="recruiter-section-title">Formación Académica</h3>
            <div className="experience-timeline">
              <div className="experience-item">
                <div className="experience-dot"></div>
                <div className="experience-content">
                  <h4>Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)</h4>
                  <p className="experience-company">Digitech FP</p>
                  <p className="experience-period">2023 – 2025</p>
                </div>
              </div>
              <div className="experience-item">
                <div className="experience-dot"></div>
                <div className="experience-content">
                  <h4>Grado en Matemáticas (incompleto, segundo año)</h4>
                  <p className="experience-company">UNED</p>
                  <p className="experience-period">2021 – 2023</p>
                </div>
              </div>
              <div className="experience-item">
                <div className="experience-dot"></div>
                <div className="experience-content">
                  <h4>Certificado de Profesionalidad en Desarrollo de Productos Editoriales Multimedia</h4>
                  <p className="experience-company">CIC Formación</p>
                  <p className="experience-period">2017 – 2018</p>
                </div>
              </div>
              <div className="experience-item">
                <div className="experience-dot"></div>
                <div className="experience-content">
                  <h4>Grado Superior en Asesoría de Imagen Personal (AIP)</h4>
                  <p className="experience-company">IES Santa Engracia</p>
                  <p className="experience-period">2011 – 2013</p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 3.7 OTROS CURSOS */}
          {/* ============================================================ */}
          <section className="building-section courses-section">
            <h3 className="recruiter-section-title">Otros Cursos</h3>
            <div className="experience-timeline">
              <div className="experience-item">
                <div className="experience-dot"></div>
                <div className="experience-content">
                  <h4>Desarrollador Front-End Capstone</h4>
                  <p className="experience-company">Meta</p>
                  <p className="experience-period">2025</p>
                </div>
              </div>
              <div className="experience-item">
                <div className="experience-dot"></div>
                <div className="experience-content">
                  <h4>Programación en Python</h4>
                  <p className="experience-company">Universidad de los Andes</p>
                  <p className="experience-period">2025</p>
                </div>
              </div>
              <div className="experience-item">
                <div className="experience-dot"></div>
                <div className="experience-content">
                  <h4>Marketing Online</h4>
                  <p className="experience-company">Grupo Conforsa</p>
                  <p className="experience-period">2020</p>
                </div>
              </div>
              <div className="experience-item">
                <div className="experience-dot"></div>
                <div className="experience-content">
                  <h4>Gráfico WordPress</h4>
                  <p className="experience-company">Grupo Conforsa</p>
                  <p className="experience-period">2020</p>
                </div>
              </div>
              <div className="experience-item">
                <div className="experience-dot"></div>
                <div className="experience-content">
                  <h4>Máster en Visual Merchandising y Escaparatismo</h4>
                  <p className="experience-company">Salesas Instituto</p>
                  <p className="experience-period">2017</p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 3.8 SKILLS DESTACADAS */}
          {/* ============================================================ */}
          <section className="building-section skills-section">
            <h3 className="recruiter-section-title">Skills</h3>
            {/* Categorías de skills para una visión clara y profesional */}
            {/* FRONTEND */}
            <div className="skills-category">
              <h4 className="skills-category-title">FRONTEND</h4>
              <div className="skills-grid">
                <div className="skill-chip">JAVASCRIPT</div>
                <div className="skill-chip">HTML5</div>
                <div className="skill-chip">CSS3</div>
                <div className="skill-chip">REACT</div>
                <div className="skill-chip">TAILWIND</div>
              </div>
            </div>
            {/* BACKEND */}
            <div className="skills-category">
              <h4 className="skills-category-title">BACKEND</h4>
              <div className="skills-grid">
                <div className="skill-chip">JAVA</div>
                <div className="skill-chip">NODE.JS</div>
                <div className="skill-chip">SPRING BOOT</div>
                <div className="skill-chip">MYSQL</div>
                <div className="skill-chip">MONGODB</div>
                <div className="skill-chip">SQLITE</div>
                <div className="skill-chip">PYTHON</div>
              </div>
            </div>
            {/* DEVOPS */}
            <div className="skills-category">
              <h4 className="skills-category-title">DEVOPS</h4>
              <div className="skills-grid">
                <div className="skill-chip">GIT</div>
                <div className="skill-chip">GITHUB</div>
                <div className="skill-chip">BASH</div>
                <div className="skill-chip">VS CODE</div>
                <div className="skill-chip">ANDROID STUDIO</div>
                <div className="skill-chip">ECLIPSE</div>
                <div className="skill-chip">GOOGLE CLOUD</div>
                <div className="skill-chip">WORDPRESS</div>
              </div>
            </div>
            {/* DESIGN */}
            <div className="skills-category">
              <h4 className="skills-category-title">DESIGN</h4>
              <div className="skills-grid">
                <div className="skill-chip">FIGMA</div>
                <div className="skill-chip">ADOBE PHOTOSHOP</div>
                <div className="skill-chip">ILLUSTRATOR</div>
                <div className="skill-chip">INDESIGN</div>
                <div className="skill-chip">CORELDRAW</div>
                <div className="skill-chip">CANVA</div>
                <div className="skill-chip">ADOBE PREMIERE PRO</div>
                <div className="skill-chip">SKETCHUP</div>
                <div className="skill-chip">CLO3D</div>
              </div>
            </div>
            {/* MARKUP */}
            <div className="skills-category">
              <h4 className="skills-category-title">MARKUP</h4>
              <div className="skills-grid">
                <div className="skill-chip">MARKDOWN</div>
                <div className="skill-chip">JSON</div>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 3.9 BOTÓN: VER PROYECTOS */}
          {/* ============================================================ */}
          <button
            className="download-cv-btn"
            onClick={() => {
              // Al pulsar, cierra el panel y abre el modal de proyectos
              onClose();
              onOpenProjects();
            }}
          >
            <span className="download-icon">🚀</span>
            Ver Mis Proyectos
          </button>

          {/* ============================================================ */}
          {/* 3.10 CONTACTO RÁPIDO */}
          {/* ============================================================ */}
          <section className="building-section contact-section">
            <h3 className="recruiter-section-title">📬 Contacto Rápido</h3>
            {formSubmitted ? (
              <div className="form-success">
                <span className="success-icon">✅</span>
                <p>¡Mensaje enviado con éxito!</p>
                <p className="success-subtext">Te responderé pronto</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nombre *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    required
                    disabled={sending}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    required
                    disabled={sending}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mensaje *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    placeholder="Cuéntame sobre la oportunidad..."
                    rows="4"
                    required
                    disabled={sending}
                  ></textarea>
                </div>
                {error && (
                  <div style={{ color: '#f87171', textAlign: 'center', marginBottom: 8 }}>
                    {error}
                  </div>
                )}
                <button type="submit" className="submit-btn" disabled={sending}>
                  <span>{sending ? 'Enviando...' : 'Enviar Mensaje'}</span>
                  <span className="submit-icon">📤</span>
                </button>
              </form>
            )}
          </section>

        </div>
      </div>

      {/* Backdrop para cerrar el panel al hacer click fuera */}
      {isOpen && <div className="recruiter-backdrop" onClick={handleBackdropClick}></div>}
    </>
  );
}

// ============================================================
// 4. EXPORTACIÓN DEL COMPONENTE
// ============================================================
export default RecruiterPanel;
