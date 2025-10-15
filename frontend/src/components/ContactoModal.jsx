import React, { useState } from 'react';
import BuildingModal from './BuildingModal';
import './BuildingModal.css';
import emailjs from 'emailjs-com';
import { PiLinkedinLogoDuotone, PiGithubLogoDuotone, PiMailboxDuotone } from 'react-icons/pi';
import { AiTwotonePhone } from 'react-icons/ai';

// =============================
// UI: Modal de Contacto
// =============================
function ContactoModal({ isOpen, onClose }) {
  // Estado del formulario de contacto
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  // Estado para mostrar mensaje de éxito
  const [submitted, setSubmitted] = useState(false);
  // Estado para mostrar si se está enviando
  const [sending, setSending] = useState(false);
  // Estado para mostrar errores
  const [error, setError] = useState(null);

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ============================================================
  // FUNCIÓN: ENVÍO DEL FORMULARIO DE CONTACTO
  // Esta función gestiona el envío del formulario usando EmailJS.
  // Controla el estado de envío, éxito y error, y limpia el formulario tras enviar.
  // ============================================================
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    emailjs
      .send(
        'service_4ggfl6r', // ID del servicio (EmailJS)
        'template_uvsjcl5',  // ID de la plantilla (EmailJS)
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        'FxUWVTdKBWSYfkWEz' // Clave pública (EmailJS)
      )
      .then(
        () => {
          setSubmitted(true);
          setSending(false);
          setFormData({ name: '', email: '', message: '' });
          // Oculta el mensaje de éxito tras 3 segundos
          setTimeout(() => setSubmitted(false), 3000);
        },
        () => {
          setError('Hubo un error al enviar el mensaje.');
          setSending(false);
        }
      );
  };

  return (
    <BuildingModal
      isOpen={isOpen}
      onClose={onClose}
      title="Contacto"
      icon="📧"
      maxWidth="90%"
      maxHeight="90%"
    >
      <div className="contacto-modal-flex">
        {/* === Columna izquierda: Información de contacto === */}
        <div className="contacto-info-col">
          <h2>Información de Contacto</h2>
          <div className="contact-info-grid">
            {/* Email */}
            <div className="contact-info-item" onClick={() => window.open('mailto:andreavallob22@gmail.com', '_self')} style={{cursor: 'pointer'}}>
              <span className="contact-icon"><PiMailboxDuotone size={30} /></span>
              <div>
                <strong>Email</strong>
                <span>andreavallob22@gmail.com</span>
              </div>
            </div>
            {/* LinkedIn */}
            <div className="contact-info-item" onClick={() => window.open('https://www.linkedin.com/in/andreavalbuenalobaton/', '_blank')} style={{cursor: 'pointer'}}>
              <span className="contact-icon"><PiLinkedinLogoDuotone size={30} /></span>
              <div>
                <strong>LinkedIn</strong>
                <span>/in/andreavalbuenalobaton</span>
              </div>
            </div>
            {/* GitHub */}
            <div className="contact-info-item" onClick={() => window.open('https://github.com/Avalob', '_blank')} style={{cursor: 'pointer'}}>
              <span className="contact-icon"><PiGithubLogoDuotone size={30} /></span>
              <div>
                <strong>GitHub</strong>
                <span>@Avalob</span>
              </div>
            </div>
            {/* Teléfono */}
            <div className="contact-info-item" onClick={() => window.open('tel:666926010', '_self')} style={{cursor: 'pointer'}}>
              <span className="contact-icon"><AiTwotonePhone size={30} /></span>
              <div>
                <strong>Teléfono</strong>
                <span>666 92 60 10</span>
              </div>
            </div>
          </div>
        </div>
        {/* === Columna derecha: Formulario de contacto === */}
        <div className="contacto-form-col">
          <h2>✉️ Envíame un Mensaje</h2>
          {submitted ? (
            // Mensaje de éxito tras enviar
            <div className="contact-success">
              <span className="success-icon">✅</span>
              <h3>¡Mensaje enviado con éxito!</h3>
              <p>Te responderé lo antes posible.</p>
            </div>
          ) : (
            // Formulario de contacto
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre"
                  disabled={sending}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                  disabled={sending}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Escribe tu mensaje aquí..."
                  disabled={sending}
                />
              </div>
              {error && (
                <div style={{ color: '#f87171', textAlign: 'center', marginBottom: 8 }}>
                  {error}
                </div>
              )}
              <button type="submit" className="contact-submit-btn" disabled={sending}>
                <span>{sending ? 'Enviando...' : 'Enviar Mensaje'}</span>
                <span className="btn-icon">📤</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </BuildingModal>
  );
}

export default ContactoModal;
