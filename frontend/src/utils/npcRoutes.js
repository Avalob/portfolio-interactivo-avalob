/**
 * Rutas predefinidas para NPCs
 * Cada acción puede ser: walk, wait, look
 */

/**
 * Tipos de acciones:
 * - { type: 'walk', direction: 'up'|'down'|'left'|'right', steps: number }
 * - { type: 'wait', duration: number (en ms) }
 * - { type: 'look', direction: 'up'|'down'|'left'|'right' }
 */

export const NPC_ROUTES = {
  // Andrea (NPC principal) - Ruta en el área de bienvenida
  ANDREA: [
    { type: 'walk', direction: 'right', steps: 2 },
    { type: 'wait', duration: 1500 },
    { type: 'look', direction: 'down' },
    { type: 'wait', duration: 1000 },
    { type: 'walk', direction: 'down', steps: 2 },
    { type: 'wait', duration: 1500 },
    { type: 'look', direction: 'left' },
    { type: 'wait', duration: 1000 },
    { type: 'walk', direction: 'left', steps: 2 },
    { type: 'wait', duration: 1500 },
    { type: 'look', direction: 'up' },
    { type: 'wait', duration: 1000 },
    { type: 'walk', direction: 'up', steps: 2 },
    { type: 'wait', duration: 1500 },
    { type: 'look', direction: 'right' },
    { type: 'wait', duration: 1000 }
  ],

  // Obrero - Patrullando la zona de construcción
  OBRERO: [
    { type: 'walk', direction: 'right', steps: 3 },
    { type: 'wait', duration: 2000 },
    { type: 'look', direction: 'down' },
    { type: 'wait', duration: 1000 },
    { type: 'look', direction: 'right' },
    { type: 'wait', duration: 1000 },
    { type: 'walk', direction: 'right', steps: 2 },
    { type: 'wait', duration: 1500 },
    { type: 'walk', direction: 'down', steps: 1 },
    { type: 'wait', duration: 1000 },
    { type: 'walk', direction: 'left', steps: 5 },
    { type: 'wait', duration: 2000 },
    { type: 'look', direction: 'up' },
    { type: 'wait', duration: 1500 },
    { type: 'walk', direction: 'up', steps: 1 },
    { type: 'wait', duration: 1000 }
  ],

  // Fernando - Caminando por el parque
  FERNANDO: [
    { type: 'walk', direction: 'left', steps: 2 },
    { type: 'wait', duration: 1500 },
    { type: 'look', direction: 'down' },
    { type: 'wait', duration: 2000 },
    { type: 'walk', direction: 'down', steps: 3 },
    { type: 'wait', duration: 1500 },
    { type: 'look', direction: 'right' },
    { type: 'wait', duration: 1000 },
    { type: 'walk', direction: 'right', steps: 2 },
    { type: 'wait', duration: 2000 },
    { type: 'walk', direction: 'up', steps: 3 },
    { type: 'wait', duration: 1500 },
    { type: 'look', direction: 'left' },
    { type: 'wait', duration: 1000 }
  ],

  // Pedro - Ruta en su zona
  PEDRO: [
    { type: 'walk', direction: 'left', steps: 3 },
    { type: 'wait', duration: 2000 },
    { type: 'look', direction: 'up' },
    { type: 'wait', duration: 1500 },
    { type: 'walk', direction: 'up', steps: 2 },
    { type: 'wait', duration: 1500 },
    { type: 'look', direction: 'right' },
    { type: 'wait', duration: 1000 },
    { type: 'walk', direction: 'right', steps: 3 },
    { type: 'wait', duration: 2000 },
    { type: 'look', direction: 'down' },
    { type: 'wait', duration: 1500 },
    { type: 'walk', direction: 'down', steps: 2 },
    { type: 'wait', duration: 1500 }
  ]
};

/**
 * Configuración de velocidad para las acciones
 */
export const NPC_ROUTE_CONFIG = {
  STEP_DURATION: 500,        // Duración de cada paso en ms
  ANIMATION_INTERVAL: 100,   // Intervalo de animación de caminar
  DEFAULT_WAIT: 1000         // Tiempo de espera por defecto
};
