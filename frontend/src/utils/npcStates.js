/**
 * Estados iniciales de los NPCs del mapa
 * Define posiciones, zonas de movimiento y frases
 */

/**
 * Estado inicial del NPC principal
 */
export const NPC_INITIAL_STATE = {
  x: 19,
  y: 6,
  dir: "down",
  step: 0,
  phrase: "¡Bienvenido a mi portfolio!",
  showPhrase: true,
  moving: false,
  waiting: false,
  zone: { minX: 16, maxX: 22, minY: 5, maxY: 11 }
};

/**
 * Estado inicial del Recruiter NPC (zona sur)
 */
export const RECRUITER_INITIAL_STATE = {
  x: 8,
  y: 24,
  dir: "down",
  step: 0,
  phrase: "¿Buscas talento? Estás en el lugar correcto.",
  showPhrase: false,
  moving: false,
  waiting: false,
  zone: { minX: 6, maxX: 12, minY: 22, maxY: 27 }
};

/**
 * Estado inicial del Developer NPC (zona este)
 */
export const DEVELOPER_INITIAL_STATE = {
  x: 38,
  y: 18,
  dir: "down",
  step: 0,
  phrase: "console.log('¡Hola, Developer!');",
  showPhrase: false,
  moving: false,
  waiting: false,
  zone: { minX: 36, maxX: 42, minY: 16, maxY: 21 }
};

/**
 * Estado inicial del Cat NPC (zona oeste)
 */
export const CAT_INITIAL_STATE = {
  x: 3,
  y: 18,
  dir: "down",
  step: 0,
  phrase: "Miau~ 🐱",
  showPhrase: false,
  moving: false,
  waiting: false,
  interactions: 0,
  zone: { minX: 1, maxX: 6, minY: 16, maxY: 21 }
};
