import { useState } from 'react';
import './RecruiterMenu.css';
import BuildingModal from './BuildingModal';
import ProyectosModal from './ProyectosModal';
import ExperienciaModal from './ExperienciaModal';
import EducacionModal from './EducacionModal';
import HobbiesModal from './HobbiesModal';
import RRSSModal from './RRSSModal';
import SobreMiModal from './SobreMiModal';
import SkillsModal from './SkillsModal';
import ContactoModal from './ContactoModal';
import './BuildingModal.css';

/**
 * Menú de navegación para el Modo Recruiter
 * Permite acceder a todos los modales informativos
 */
function RecruiterMenu({ 
  isOpen, 
  onClose,
  // Props adicionales para controles móviles
  onShowMinimap,
  isDarkMode,
  onToggleDarkMode,
  onShowHelp
}) {
  const [activeModal, setActiveModal] = useState(null);

  const menuItems = [
    { id: 'sobre-mi', icon: '👩‍💻', title: 'Sobre Mí', component: SobreMiModal },
    { id: 'experiencia', icon: '💼', title: 'Experiencia', component: ExperienciaModal },
    { id: 'skills', icon: '⚡', title: 'Habilidades', component: SkillsModal },
    { id: 'proyectos', icon: '🚀', title: 'Proyectos', component: ProyectosModal },
    { id: 'educacion', icon: '🎓', title: 'Educación', component: EducacionModal },
    { id: 'hobbies', icon: '🎮', title: 'Hobbies', component: HobbiesModal },
    { id: 'rrss', icon: '🔗', title: 'Redes Sociales', component: RRSSModal },
    { id: 'contacto', icon: '📬', title: 'Contacto', component: ContactoModal },
  ];

  const handleMenuClick = (modalId) => {
    setActiveModal(modalId);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleCloseAll = () => {
    setActiveModal(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Menú Principal usando BuildingModal */}
      <BuildingModal
        isOpen={isOpen}
        onClose={handleCloseAll}
        title="Modo Reclutador"
        icon="👔"
        maxWidth="90%"
        maxHeight="90%"
        noAnimation={false}
      >
        <p className="menu-description">
          Selecciona una sección para explorar mi perfil profesional:
        </p>
        <div className="menu-grid">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="menu-card"
              onClick={() => handleMenuClick(item.id)}
              aria-label={`Ver ${item.title}`}
            >
              <span className="menu-card-icon">{item.icon}</span>
              <span className="menu-card-title">{item.title}</span>
              <span className="menu-card-arrow">→</span>
            </button>
          ))}
        </div>
      </BuildingModal>

      {/* Modales */}
      {menuItems.map((item) => {
        const ModalComponent = item.component;
        const isModalOpen = activeModal === item.id;
        return (
          <div 
            key={item.id}
            style={{ 
              '--z-modal-backdrop': isModalOpen ? '10000' : '100',
              '--z-modal-content': isModalOpen ? '10001' : '101'
            }}
          >
            <ModalComponent
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              showBackButton={true}
            />
          </div>
        );
      })}
    </>
  );
}

export default RecruiterMenu;
