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
<<<<<<< HEAD
=======
    { type: 'walk', direction: 'down', steps: 2 },
    { type: 'wait', duration: 1500 },
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
    { type: 'look', direction: 'left' },
    { type: 'wait', duration: 1000 },
    { type: 'walk', direction: 'left', steps: 2 },
    { type: 'wait', duration: 1500 },
<<<<<<< HEAD
    { type: 'look', direction: 'up' }
=======
    { type: 'look', direction: 'up' },
    { type: 'wait', duration: 1000 },
    { type: 'walk', direction: 'up', steps: 2 },
    { type: 'wait', duration: 1500 },
    { type: 'look', direction: 'right' },
    { type: 'wait', duration: 1000 }
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
  ],

  // Obrero - Patrullando la zona de construcción
  OBRERO: [
<<<<<<< HEAD
    { type: 'wait', duration: 3000 },           
    { type: 'walk', direction: 'right', steps: 2 }, 
    { type: 'wait', duration: 2500 },          
    { type: 'look', direction: 'left' },       
    { type: 'wait', duration: 1000 },          
    { type: 'look', direction: 'down' },       
    { type: 'wait', duration: 1000 },            
    { type: 'walk', direction: 'left', steps: 2 },    
    { type: 'wait', duration: 3000 }, 
    { type: 'look', direction: 'up' },    
    { type: 'wait', duration: 1000 },        
    { type: 'reset' }                          
=======
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
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
  ],

  // Fernando - Caminando por el parque
  FERNANDO: [
<<<<<<< HEAD
      { type: 'wait', duration:1000 },           
    { type: 'walk', direction: 'right', steps: 2 },  
    { type: 'wait', duration: 2500 },           
    { type: 'look', direction: 'left' },      
    { type: 'wait', duration: 3000 },       
    { type: 'look', direction: 'down' },      
    { type: 'wait', duration: 2000 },          
    { type: 'walk', direction: 'left', steps: 2 },   
    { type: 'wait', duration: 3000 },         
    { type: 'reset' }                          
=======
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
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
  ],

  // Pedro - Ruta en su zona
  PEDRO: [
<<<<<<< HEAD
          { type: 'wait', duration:1000 },         
    { type: 'walk', direction: 'up', steps: 2 }, 
    { type: 'wait', duration: 3000 },         
    { type: 'look', direction: 'left' },        
    { type: 'wait', duration: 2500 },         
    { type: 'look', direction: 'down' },       
    { type: 'wait', duration: 3500 },           
    { type: 'walk', direction: 'down', steps: 2 },    
    { type: 'wait', duration: 3000 },           
    { type: 'reset' }                          
=======
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
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
  ]
};

/**
 * Configuración de velocidad para las acciones
 */
export const NPC_ROUTE_CONFIG = {
<<<<<<< HEAD
  STEP_DURATION: 500,       
  ANIMATION_INTERVAL: 100,   
  DEFAULT_WAIT: 1000        
=======
  STEP_DURATION: 500,        // Duración de cada paso en ms
  ANIMATION_INTERVAL: 100,   // Intervalo de animación de caminar
  DEFAULT_WAIT: 1000         // Tiempo de espera por defecto
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
};
