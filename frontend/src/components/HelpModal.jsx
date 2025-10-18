// ============================================================
// 1. IMPORTACIONES Y DEPENDENCIAS
// ============================================================
import BuildingModal from './BuildingModal';
import HelpGuideContent from './HelpGuideContent';

// ============================================================
// 2. COMPONENTE: HelpModal
// Modal de ayuda general para el portfolio interactivo
// ============================================================
function HelpModal({ isOpen, onClose }) {
  // Renderiza el modal reutilizable con el contenido de la guía de ayuda
  return (
    <BuildingModal
      isOpen={isOpen}
      onClose={onClose}
      title="Guía de Ayuda"
      icon="🎮"
      maxWidth="90%"
      maxHeight="90%"
    >
      <HelpGuideContent />
    </BuildingModal>
  );
}

// ============================================================
// 3. EXPORTACIÓN DEL COMPONENTE
// ============================================================
export default HelpModal;
