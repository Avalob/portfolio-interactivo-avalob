import React from 'react';
import PropTypes from 'prop-types';
import './ResetConfirmModal.css';

function ResetConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="reset-confirm-overlay" role="dialog" aria-modal="true">
      <div className="reset-confirm-card">
        <div className="reset-confirm-icon" aria-hidden="true">⚠️</div>
        <h2 className="reset-confirm-title">¿Reiniciar progreso?</h2>
        <p className="reset-confirm-text">
          Esto borrará los edificios visitados y volverás a empezar desde cero. ¿Quieres continuar?
        </p>
        <div className="reset-confirm-actions">
          <button className="reset-confirm-btn cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className="reset-confirm-btn confirm" onClick={onConfirm}>
            Sí, reiniciar
          </button>
        </div>
      </div>
    </div>
  );
}

ResetConfirmModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ResetConfirmModal;
