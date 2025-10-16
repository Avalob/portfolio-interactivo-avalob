// ============================================================
// 1. IMPORTACIONES Y DEPENDENCIAS
// ============================================================
import React, { useEffect, useState } from 'react';
import './Notification.css';

// ============================================================
// 2. COMPONENTE: Notification
// Muestra notificaciones deslizantes con animación y cierre manual
// ============================================================
const Notification = ({ notifications, onDismiss }) => {
  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type} ${
            notification.removing ? 'notification-exit' : 'notification-enter'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="notification-icon">{notification.icon}</div>
          <div className="notification-content">
            <div className="notification-title">{notification.title}</div>
            <div className="notification-message">{notification.message}</div>
          </div>
          <button
            className="notification-close"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss(notification.id);
            }}
            aria-label="Cerrar notificación"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

// ============================================================
// 3. HOOK PERSONALIZADO: useNotifications
// Gestiona la cola y animación de notificaciones
// ============================================================
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  // Añade una nueva notificación a la cola
  const addNotification = (type, title, message, icon = '✨', duration = 4000) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type, // 'success', 'info', 'achievement', 'warning'
      title,
      message,
      icon,
      removing: false,
    };
    setNotifications((prev) => [...prev, newNotification]);
    // Auto-remover después de la duración indicada
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
    // Reproducir sonido asociado (próximamente)
    playNotificationSound(type);
    return id;
  };

  // Marca una notificación como saliente y la elimina tras la animación
  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, removing: true } : n))
    );
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 300);
  };

  // Placeholder para reproducir sonidos de notificación
  const playNotificationSound = (type) => {
  };

  return {
    notifications,
    addNotification,
    removeNotification,
  };
};

// ============================================================
// 4. EXPORTACIÓN DEL COMPONENTE
// ============================================================
export default Notification;
