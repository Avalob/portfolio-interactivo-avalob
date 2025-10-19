/**
 * Rutas predefinidas para NPCs
 * Cada acci�n puede ser: walk, wait, look
 */

/**
 * Tipos de acciones:
 * - { type: 'walk', direction: 'up'|'down'|'left'|'right', steps: number }
 * - { type: 'wait', duration: number (en ms) }
 * - { type: 'look', direction: 'up'|'down'|'left'|'right' }
 */

export const NPC_ROUTES = {
  // Andrea (NPC principal) - Ruta en el �rea de bienvenida
  ANDREA: [
    { type: 'walk', direction: 'right', steps: 2 },
    { type: 'wait', duration: 1500 },
    { type: 'look', direction: 'down' },
    { type: 'wait', duration: 1000 },
    { type: 'wait', duration: 1500 },
    { type: 'look', direction: 'left' },
    { type: 'wait', duration: 1000 },
    { type: 'walk', direction: 'left', steps: 2 },
    { type: 'wait', duration: 1500 },
    { type: 'look', direction: 'up' },
    { type: 'wait', duration: 1000 },
  ],

  // Obrero - Patrullando la zona de construcci�n
  OBRERO: [
    { type: 'wait', duration: 3000 },
    { type: 'walk', direction: 'right', steps: 2 }, 
    { type: 'wait', duration: 2500 },
    { type: 'look', direction: 'left' },
    { type: 'wait', duration: 1000 },
    { type: 'look', direction: 'down' },
    { type: 'wait', duration: 1000 },
    { type: 'walk', direction: 'left', steps: 2 },
    { type: 'wait', duration: 3000 },
    { type: 'reset' }
  ],

  // Fernando - Caminando por el parque
  FERNANDO: [
    { type: 'wait', duration: 1000 },
    { type: 'walk', direction: 'right', steps: 2 },
    { type: 'wait', duration: 2500 },
    { type: 'look', direction: 'left' },
    { type: 'wait', duration: 3000 },
    { type: 'look', direction: 'down' },
    { type: 'wait', duration: 2000 },
    { type: 'walk', direction: 'left', steps: 2 },
    { type: 'wait', duration: 3000 },
    { type: 'reset' }
  ],

  // Pedro - Ruta en su zona
  PEDRO: [
    { type: 'wait', duration: 1000 },
    { type: 'walk', direction: 'left', steps: 2 }, 
    { type: 'wait', duration: 3000 },
    { type: 'look', direction: 'left' },
    { type: 'wait', duration: 2500 },
    { type: 'look', direction: 'down' },
    { type: 'wait', duration: 3500 },
    { type: 'walk', direction: 'right', steps: 2 },
    { type: 'wait', duration: 3000 },
    { type: 'reset' }
  ]
};

/**
 * Configuraci�n de velocidad para las acciones
 */
export const NPC_ROUTE_CONFIG = {
  STEP_DURATION: 500,        // Duraci�n de cada paso en ms
  ANIMATION_INTERVAL: 100,   // Intervalo de animaci�n de caminar
  DEFAULT_WAIT: 1000         // Tiempo de espera por defecto
};
