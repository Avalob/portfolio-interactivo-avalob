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
    { type: 'wait', duration: 3000 },           // Espera unos segundos
    { type: 'walk', direction: 'up', steps: 1 },  // 2 pasos hacia arriba
    { type: 'walk', direction: 'right', steps: 2 }, 
    { type: 'wait', duration: 2500 },           // Espera
    { type: 'look', direction: 'left' },        // Mira a la izquierda
    { type: 'wait', duration: 1000 },            // Pausa
    { type: 'look', direction: 'down' },       // Mira hacia abajo
    { type: 'wait', duration: 1000 },            // Pausa
    { type: 'walk', direction: 'down', steps: 1 }, // 2 pasos para atrás (derecha)
    { type: 'walk', direction: 'left', steps: 2 },    // 1 paso hacia arriba
    { type: 'wait', duration: 3000 },           // Espera otros segundos
    { type: 'reset' }                           // Vuelve a la posición inicial
  ],

  // Fernando - Caminando por el parque
  FERNANDO: [
      { type: 'wait', duration:1000 },           // Espera unos segundos
    { type: 'walk', direction: 'right', steps: 2 },  // 2 pasos hacia arriba
    { type: 'walk', direction: 'down', steps: 1 }, 
    { type: 'wait', duration: 2500 },           // Espera
    { type: 'look', direction: 'left' },        // Mira a la izquierda
    { type: 'wait', duration: 3000 },            // Pausa
    { type: 'look', direction: 'down' },       // Mira hacia abajo
    { type: 'wait', duration: 2000 },            // Pausa
    { type: 'walk', direction: 'up', steps: 1 }, // 2 pasos para atrás (derecha)
    { type: 'walk', direction: 'left', steps: 2 },    // 1 paso hacia arriba
    { type: 'wait', duration: 3000 },           // Espera otros segundos
    { type: 'reset' }                           // Vuelve a la posición inicial
  ],

  // Pedro - Ruta en su zona
  PEDRO: [
          { type: 'wait', duration:1000 },           // Espera unos segundos
    { type: 'walk', direction: 'up', steps: 2 },  // 2 pasos hacia arriba
    { type: 'walk', direction: 'right', steps: 1 }, 
    { type: 'wait', duration: 3000 },           // Espera
    { type: 'look', direction: 'left' },        // Mira a la izquierda
    { type: 'wait', duration: 2500 },            // Pausa
    { type: 'look', direction: 'down' },       // Mira hacia abajo
    { type: 'wait', duration: 3500 },            // Pausa
    { type: 'walk', direction: 'left', steps: 1 }, // 2 pasos para atrás (derecha)
    { type: 'walk', direction: 'down', steps: 2 },    // 1 paso hacia arriba
    { type: 'wait', duration: 3000 },           // Espera otros segundos
    { type: 'reset' }                           // Vuelve a la posición inicial
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
