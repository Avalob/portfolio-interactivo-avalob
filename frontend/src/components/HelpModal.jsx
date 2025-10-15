import React from 'react';
import BuildingModal from './BuildingModal';
import HelpGuideContent from './HelpGuideContent';

// =============================
// UI: Modal de Guía de Ayuda del Portfolio Interactivo
// =============================
function HelpModal({ isOpen, onClose }) {
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

export default HelpModal;
