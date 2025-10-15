/**
 * Hook personalizado para detectar inactividad del jugador
 * @module useInactivityDetection
 */

import { useState, useEffect } from 'react';

/**
 * Hook para detectar inactividad del jugador
 * @param {Object} avatar - Estado del avatar
 * @param {boolean} enEdificio - Si está en un edificio
 * @param {Function} addNotification - Función para mostrar notificaciones
 * @param {number} inactivityThreshold - Tiempo en ms para considerar inactivo (por defecto 30000)
 * @param {number} checkInterval - Intervalo de chequeo en ms (por defecto 5000)
 */
export const useInactivityDetection = (
  avatar,
  enEdificio,
  addNotification,
  inactivityThreshold = 30000,
  checkInterval = 5000
) => {
  const [lastMoveTime, setLastMoveTime] = useState(Date.now());
  const [warningShown, setWarningShown] = useState(false);

  // Actualizar tiempo de última actividad cuando el avatar se mueve
  useEffect(() => {
    setLastMoveTime(Date.now());
    setWarningShown(false);
  }, [avatar.x, avatar.y]);

  // Detectar inactividad
  useEffect(() => {
    if (enEdificio) return;

    const checkInactivity = setInterval(() => {
      const timeSinceLastMove = Date.now() - lastMoveTime;

      if (timeSinceLastMove >= inactivityThreshold && !warningShown) {
        addNotification(
          'info',
          '¿Sigues ahí?',
          'No te duermas... ¡Hay mucho por explorar!',
          '😴'
        );
        setWarningShown(true);
      }
    }, checkInterval);

    return () => clearInterval(checkInactivity);
  }, [lastMoveTime, warningShown, enEdificio, addNotification, inactivityThreshold, checkInterval]);

  return { lastMoveTime, warningShown };
};
