/**
 * Hook personalizado para gestionar interacciones con NPCs
 * @module useNPCInteraction
 */

import { useEffect, useRef } from 'react';

/**
 * Hook que maneja la visualización de frases de NPC cuando el jugador está cerca
 * @param {Object} avatar - Posición del avatar
 * @param {Object} npc - Estado del NPC
 * @param {Function} setNpc - Función para actualizar el NPC
 * @param {Function} getPhraseCallback - Callback para obtener la frase contextual
 * @param {number} proximityRange - Rango de proximidad (por defecto 1)
 * @param {number} phraseDisplayTime - Tiempo de visualización en ms (por defecto 4000)
 * @param {boolean} enabled - Si el hook está activo (por defecto true)
 */
export const useNPCInteraction = (
  avatar,
  npc,
  setNpc,
  getPhraseCallback,
  proximityRange = 1,
  phraseDisplayTime = 4000,
  enabled = true
) => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    
    // Limpiar timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const isNear = 
      Math.abs(avatar.x - npc.x) <= proximityRange && 
      Math.abs(avatar.y - npc.y) <= proximityRange;

    if (isNear && !npc.showPhrase) {
      const phrase = getPhraseCallback();
      
      setNpc(prev => ({
        ...prev,
        phrase,
        showPhrase: true
      }));

      timeoutRef.current = setTimeout(() => {
        setNpc(prev => ({ ...prev, showPhrase: false }));
      }, phraseDisplayTime);
    } else if (!isNear && npc.showPhrase) {
      setNpc(prev => ({ ...prev, showPhrase: false }));
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [avatar.x, avatar.y, npc.x, npc.y, npc.showPhrase, getPhraseCallback, setNpc, proximityRange, phraseDisplayTime, enabled]);

  return null;
};

/**
 * Hook para el mensaje de bienvenida inicial del NPC
 * @param {Function} setNpc - Función para actualizar el NPC
 * @param {string} welcomeMessage - Mensaje de bienvenida
 * @param {number} displayTime - Tiempo de visualización en ms
 */
export const useWelcomeMessage = (setNpc, welcomeMessage, displayTime = 5000) => {
  useEffect(() => {
    setNpc(prev => ({ 
      ...prev, 
      phrase: welcomeMessage, 
      showPhrase: true 
    }));
    
    const timer = setTimeout(() => {
      setNpc(prev => ({ ...prev, showPhrase: false }));
    }, displayTime);
    
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
