// ============================================================
// 1. IMPORTACIONES Y ESTILOS
// ============================================================
import PropTypes from 'prop-types';
import './ResetConfirmModal.css';

// ============================================================
// 2. COMPONENTE PRINCIPAL: ResetConfirmModal
// ============================================================
// Modal de confirmación para reiniciar el progreso del usuario.
function ResetConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="reset-confirm-overlay" role="dialog" aria-modal="true">
      <div className="reset-confirm-card">
        {/* ------------------------------------------------------------ */}
        {/* 2.1 ÍCONO DE ADVERTENCIA */}
        {/* ------------------------------------------------------------ */}
        <div className="reset-confirm-icon" aria-hidden="true">⚠️</div>
        {/* ------------------------------------------------------------ */}
        {/* 2.2 TÍTULO DEL MODAL */}
        {/* ------------------------------------------------------------ */}
        <h2 className="reset-confirm-title">¿Reiniciar progreso?</h2>
        {/* ------------------------------------------------------------ */}
        {/* 2.3 MENSAJE EXPLICATIVO */}
        {/* ------------------------------------------------------------ */}
        <p className="reset-confirm-text">
          Esto borrará los edificios visitados y volverás a empezar desde cero. ¿Quieres continuar?
        </p>
        {/* ------------------------------------------------------------ */}
        {/* 2.4 ACCIONES DEL USUARIO */}
        {/* ------------------------------------------------------------ */}
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

// ============================================================
// 3. DEFINICIÓN DE TIPOS DE PROPIEDADES
// ============================================================
ResetConfirmModal.propTypes = {
  onConfirm: PropTypes.func.isRequired, // Función que se ejecuta al confirmar el reinicio
  onCancel: PropTypes.func.isRequired   // Función que se ejecuta al cancelar la acción
};

// ============================================================
// 4. EXPORTACIÓN DEL COMPONENTE
// ============================================================
export default ResetConfirmModal;
