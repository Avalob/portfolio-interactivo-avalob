import { PiBehanceLogoFill, PiLinkedinLogoDuotone, PiGithubLogoDuotone, PiMailboxDuotone, PiWhatsappLogo } from 'react-icons/pi';
import React from 'react';
import { AiTwotonePhone } from 'react-icons/ai';
import BuildingModal from './BuildingModal';
import './BuildingModal.css';

function RRSSModal({ isOpen, onClose }) {
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

  const handleLinkClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <BuildingModal
      isOpen={isOpen}
      onClose={onClose}
      title="Redes Sociales"
      icon="🌟"
      maxWidth="90%"
      maxHeight="90%"
    >
      {/* Social Links Grid */}
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

      {/* Info Box */}
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

export default RRSSModal;
