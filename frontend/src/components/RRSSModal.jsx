
// ============================================================
// 1. IMPORTACIONES Y ESTILOS
// ============================================================
import { PiBehanceLogoFill, PiLinkedinLogoDuotone, PiGithubLogoDuotone, PiMailboxDuotone, PiWhatsappLogo } from 'react-icons/pi';
import { AiTwotonePhone } from 'react-icons/ai';
import BuildingModal from './BuildingModal';
import './BuildingModal.css';

// ============================================================
// 2. COMPONENTE PRINCIPAL: RRSSModal
// ============================================================
// Modal para mostrar y acceder a las redes sociales y formas de contacto.
function RRSSModal({ isOpen, onClose }) {
  // ------------------------------------------------------------
  // 2.1 LISTA DE REDES SOCIALES Y CONTACTOS
  // ------------------------------------------------------------
  // Cada objeto representa una red social o método de contacto.
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <PiGithubLogoDuotone />,
      url: 'https://github.com/avalob',
      description: 'Todo mi código abierto',
      className: 'github'
    },
    {
      name: 'LinkedIn',
      icon: <PiLinkedinLogoDuotone />,
      url: 'https://www.linkedin.com/in/andreavalbuenalobaton/',
      description: 'Conecta conmigo',
      className: 'linkedin'
    },
    {
      name: 'Behance',
      icon: <PiBehanceLogoFill />,
      url: 'https://www.behance.net/andreavalbuena',
      description: 'Mis diseños en proceso',
      className: 'behance'
    },
    {
      name: 'WhatsApp',
      icon: <PiWhatsappLogo />,
      url: 'https://wa.me/34666926010',
      description: 'Envíame un WhatsApp',
      className: 'whatsapp'
    },
    {
      name: 'Teléfono',
      icon: <AiTwotonePhone />,
      url: 'tel:+34666926010',
      description: 'Llama directamente',
      className: 'telefono'
    },
    {
      name: 'Email',
      icon: <PiMailboxDuotone />,
      url: 'mailto:andreavallob22@gmail.com',
      description: 'Envíame un correo',
      className: 'email'
    },
  ];

  // ------------------------------------------------------------
  // 2.2 FUNCIÓN: Abrir enlace en nueva pestaña/ventana
  // ------------------------------------------------------------
  // Esta función gestiona la apertura de los enlaces de redes sociales.
  const handleLinkClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // ============================================================
  // 3. RENDERIZADO DEL MODAL Y GRID DE REDES SOCIALES
  // ============================================================
  return (
    <BuildingModal
      isOpen={isOpen}
      onClose={onClose}
      title="Redes Sociales"
      icon="🌟"
      maxWidth="90%"
      maxHeight="90%"
    >
      {/* ============================================================ */}
      {/* 3.1 GRID DE REDES SOCIALES Y CONTACTOS */}
      {/* ============================================================ */}
      <div className="building-section">
        <div className="rrss-grid">
          {socialLinks.map((social, index) => (
            <div
              key={index}
              className={`rrss-card ${social.className}`}
              onClick={() => handleLinkClick(social.url)}
            >
              <div className="rrss-card-icon">
                {social.icon}
              </div>
              <div className="rrss-card-name">
                {social.name}
              </div>
              <div className="rrss-card-description">
                {social.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3.2 MENSAJE INFORMATIVO */}
      {/* ============================================================ */}
      <div className="building-section rrss-info-box">
        <div className="rrss-info-icon">💬</div>
        <p className="rrss-info-text">
          ¡Haz clic en cualquier red social para visitarla!
          <br />
          Me encantaría conectar contigo 🚀
        </p>
      </div>
    </BuildingModal>
  );
}

// ============================================================
// 4. EXPORTACIÓN DEL COMPONENTE
// ============================================================
export default RRSSModal;
