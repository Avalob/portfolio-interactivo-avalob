import React, { useEffect, useState } from 'react';
import './Notification.css';

/**
 * Sistema de notificaciones estilo Game Boy Advance / Pokémon
 * Muestra notificaciones deslizantes desde arriba con animación
 */
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

/**
 * Hook personalizado para gestionar notificaciones
 */
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

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

    // Auto-remover después de la duración
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    // Reproducir sonido (opcional)
    playNotificationSound(type);

    return id;
  };

  const removeNotification = (id) => {
    // Marcar como "removing" para animación de salida
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, removing: true } : n))
    );

    // Eliminar del DOM después de la animación
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 300);
  };

  const playNotificationSound = (type) => {
    // Placeholder para sonidos (implementar con Web Audio API o audio files)
    // const audio = new Audio(`/sounds/notification-${type}.mp3`);
    // audio.volume = 0.3;
    // audio.play().catch(() => {});
  };

  return {
    notifications,
    addNotification,
    removeNotification,
  };
};

export default Notification;
