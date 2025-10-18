<<<<<<< HEAD
=======


>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
// ============================================
// === Configuración básica ===
// ============================================
export const TILE_SIZE = (typeof window !== 'undefined' && window.innerWidth <= 600) ? 34 : 54; // 54 escritorio, 34 móvil

export const AVATAR_START = {
  x: 2,
  y: 6,
};

// ============================================
// === Sprites ===
// ============================================
export const AVATAR_SPRITES = {
<<<<<<< HEAD
  down:  [1, 5, 9],    
  left:  [0, 4, 8],   
  right: [3, 7, 11],  
  up:    [2, 6, 10] 
=======
  down:  [105, 132, 159],
  up:    [106, 133, 160],
  right: [107, 134, 161],
  left:  [104, 131, 158],
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
};

// Andrea
export const NPC_SPRITES = {
<<<<<<< HEAD
  down:  [1, 5, 9],    
  left:  [0, 4, 8],   
  right: [3, 7, 11],  
  up:    [2, 6, 10] 
=======
  right: [431, 458, 485],
  left:  [428, 455, 482],
  down:  [429, 456, 483],
  up:    [430, 457, 484],
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
};

// NPC casco obra - chaleco naranja
export const OBRERO_SPRITES = {
<<<<<<< HEAD
  down:  [1, 5, 9],    
  left:  [0, 4, 8],   
  right: [3, 7, 11],  
  up:    [2, 6, 10] 
=======
  right: [269, 296, 323],
  left:  [266, 320, 293],
  down:  [267, 321, 294],
  up:    [268, 322, 295],
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
};

// NPC Fernando
export const FERNANDO_SPRITES = {
<<<<<<< HEAD
  down:  [1, 5, 9],    
  left:  [0, 4, 8],   
  right: [3, 7, 11],  
  up:    [2, 6, 10] 
=======
  right: [350, 377, 404],
  left:  [347, 374, 401],
  down:  [348, 375, 402],
  up:    [349, 376, 403],
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
};

// NPC PEDRO
export const PEDRO_SPRITES = {
<<<<<<< HEAD
  down:  [1, 5, 9],    
  left:  [0, 4, 8],   
  right: [3, 7, 11],  
  up:    [2, 6, 10] 
};


=======
  right: [188, 215, 242],
  left:  [185, 212, 239],
  down:  [186, 213, 240],
  up:    [187, 214, 241],
};

>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
// ============================================
// === Puertas de edificios ===
// ============================================
export const PUERTAS = {
  EDUCACION: { x: 10, y: 4 },
  EXPERIENCIA: { x: 17, y: 3 },
  SOBRE_MI: [
    { x: 20, y: 16 },
    { x: 21, y: 16 }
  ],
<<<<<<< HEAD
  SKILLS: { x: 38, y: 27 },
=======
  SKILLS: { x: 38, y: 27 }, // Edificio SKILLS (habilidades técnicas)
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
  OTROS: { x: 34, y: 4 },
  PROYECTOS: { x: 26, y: 25 },
  CONTACTO: { x: 8, y: 16 },
  HOBBIES: { x: 5, y: 29 },
  RRSS: { x: 41, y: 27 },
};

// ============================================
// === Efectos de iluminación ===
// ============================================
export const FAROLILLOS = [
  // === FAROLAS VERDES (FAROLA_VERDE) ===
<<<<<<< HEAD
  { x: 1, y: 2 }, 
  { x: 34, y: 16 }, 
  { x: 30, y: 14 }, 
  
  // === FAROLAS GRISES (FAROLA_GRIS) ===
  { x: 7, y: 3 },
  { x: 22, y: 3 },
  { x: 13, y: 14 },
  { x: 36, y: 15 },
  { x: 31, y: 3 },
=======
  { x: 1, y: 2 },     // FAROLA_VERDE(1, 2)
  { x: 34, y: 16 },   // Farola verde adicional
  { x: 30, y: 14 },   // Farola verde adicional
  
  // === FAROLAS GRISES (FAROLA_GRIS) ===
  { x: 7, y: 3 },     // FAROLA_GRIS(7, 3)
  { x: 22, y: 3 },    // FAROLA_GRIS(22, 3, true)
  { x: 13, y: 14 },   // FAROLA_GRIS(13, 14, true)
  { x: 36, y: 15 },   // FAROLA_GRIS(36, 15)
  { x: 31, y: 3 },    // Farola gris adicional
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
  { x: 19, y: 23 },
  { x: 24, y: 29 },
  { x: 28, y: 29 },
  { x: 33, y: 23 },
  { x: 32, y: 31 },
  { x: 20, y: 31 },
  
  // === FAROLAS DOBLES (FAROLA_DOBLE) ===
<<<<<<< HEAD
  { x: 0, y: 9 }, 
  { x: 13, y: 4 },
  { x: 8, y: 18 },  
  { x: 2, y: 18 },  
  { x: 8, y: 9 },  
  { x: 32, y: 9 }, 
  { x: 41, y: 9 },  
  
  // === SEMÁFOROS (SEMAFORO) ===
  { x: 2, y: 4 },   
  { x: 23, y: 9 },  
  { x: 14, y: 9 }, 
  { x: 9, y: 22 }, 
  { x: 30, y: 5 }   
=======
  { x: 0, y: 9 },     // FAROLA_DOBLE(0, 9)
  { x: 13, y: 4 },    // FAROLA_DOBLE(13, 4)
  { x: 8, y: 18 },    // FAROLA_DOBLE(8, 18)
  { x: 2, y: 18 },    // FAROLA_DOBLE(2, 18)
  { x: 8, y: 9 },     // FAROLA_DOBLE(8, 9)
  { x: 32, y: 9 },    // FAROLA_DOBLE(32, 9)
  { x: 41, y: 9 },    // FAROLA_DOBLE(41, 9)
  
  // === SEMÁFOROS (SEMAFORO) ===
  { x: 2, y: 4 },     // SEMAFORO(2, 4, true)
  { x: 23, y: 9 },    // SEMAFORO(23, 9, true)
  { x: 14, y: 9 },    // SEMAFORO(14, 9, true)
  { x: 9, y: 22 },    // SEMAFORO(9, 22, true)
  { x: 30, y: 5 }     // SEMAFORO(30, 5, false)
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
];

// Posiciones de semáforos para luces superiores
export const SEMAFOROS = [
  { x: 2, y: 4 },
  { x: 23, y: 9 },
  { x: 14, y: 9 },
  { x: 9, y: 22 },
  { x: 30, y: 5 }
];

// ============================================
// === Tiles caminables para NPC ===
// ============================================
// Todos los tiles son caminables para los NPCs
import { MAP } from "./tiledMapData";
export const NPC_WALKABLE_TILES = Array.from(new Set(MAP.flat()));

<<<<<<< HEAD
=======
// ============================================
// === Tiles de agua ===
// ============================================
export const WATER_TILES = [
  // Agrega aquí los tiles que representan agua si los necesitas
  // Ejemplo: 100, 101, 102, 127, 128, 129
];
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9

// ============================================
// === Configuración de Coches NPC ===
// ============================================

// Sprites de los coches
export const CAR_SPRITES = {
  CAR1: {
<<<<<<< HEAD
    down: [476],      
    up: [479],       
    right: [477, 478], 
    left: [474, 475],  
  },
  CAR2: {
    down: [426], 
    up: [427],
    right: [480, 481],
    left: [453, 454],
=======
    down: [476],      // De frente (1 tile)
    up: [479],        // De espaldas (1 tile)  
    right: [477, 478], // Hacia la derecha (2 tiles: parte trasera, parte delantera)
    left: [474, 475],  // Hacia la izquierda (2 tiles: ORDEN CORRECTO)
  },
  CAR2: {
    down: [426],      // De frente (1 tile)
    up: [427],        // De espaldas (1 tile) - CORREGIDO para que mire hacia arriba
    right: [480, 481], // Hacia la derecha (2 tiles)
    left: [453, 454],  // Hacia la izquierda (2 tiles - orden invertido)
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
  },
};

// Recorridos predefinidos de los coches
// Cada recorrido es un array de coordenadas [x, y]
export const CAR_PATHS = {
  // Coche 1: Empieza fuera del mapa (arriba), baja y va hacia la izquierda
  CAR1_PATH: [
    [24, -1], [24, 0], [24, 1], [24, 2], [24, 3], [24, 4], [24, 5],
    [24, 6], [24, 7], [23, 7], [22, 7], [21, 7], [20, 7],
    [19, 7], [18, 7], [17, 7], [16, 7], [15, 7], [14, 7],
    [13, 7], [12, 7], [11, 7], [10, 7], [9, 7], [8, 7],
    [7, 7], [6, 7], [5, 7], [4, 7], [3, 7], [2, 7],
    [1, 7], [0, 7], [-1, 7], [-2, 7], // Sale del mapa por la izquierda
  ],

  // Coche 2: Empieza fuera del mapa (izquierda), entra y hace un recorrido con giros
  CAR2_PATH: [
    [-1, 22], [0, 22], [1, 22], [2, 22], [3, 22], [4, 22], [5, 22],
    [6, 22], [7, 22], [8, 22], [9, 22], [10, 22], [11, 22],
    [12, 22], [13, 22], [14, 22], [15, 22], [16, 22], [17, 22],
    [17, 21], [17, 20], [17, 19], [17, 18], [17, 17], [17, 16],
    [17, 15], [17, 14], [17, 13], [17, 12], [17, 11], [17, 10],
    [17, 9], [18, 9], [19, 9], [20, 9], [21, 9], [22, 9],
    [23, 9], [24, 9], [25, 9], [26, 9], [27, 9], [28, 9],
    [29, 9], [30, 9], [31, 9], [32, 9], [33, 9], [34, 9], [35, 9],
    [36, 9], [37, 9], [38, 9], [39, 9], [40, 9], [41, 9],
    [42, 9], [43, 9], [44, 9], [45, 9], [46, 9], [47, 9], [48, 9], // Sale del mapa
  ],

  // Coche 3: Empieza fuera del mapa (derecha), entra y va hacia abajo, luego izquierda
  CAR3_PATH: [
    [-1, 9], [0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9],
    [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
    [13, 9], [14, 9], [15, 9], [15, 10], [15, 11], [15, 12], [15, 13],
    [15, 14], [15, 16], [15, 17], [15, 18], [15, 19], [15, 20],
    [14, 20], [13, 20], [12, 20], [11, 20], [10, 20], [10, 21],
    [10, 22], [10, 23], [10, 24], [10, 25], [10, 26], [10, 27],
    [10, 28], [10, 29], [10, 30], [10, 31] // Sale del mapa
  ],

  // Coche 4: Empieza fuera del mapa (abajo), sube y va hacia la derecha
  CAR4_PATH: [
    [46, 7], [45, 7], [44, 7], [43, 7], [42, 7], [41, 7], [40, 7],
    [39, 7], [38, 7], [37, 7], [36, 7], [35, 7], [34, 7], [33, 7],
    [32, 7], [31, 7], [30, 7], [29, 7], [28, 7], [27, 7], [26, 7],
    [26, 6], [26, 5], [26, 4], [26, 3], [26, 2], [26, 1], [26, 0],
    [26, -1] // Sale del mapa
  ],
};

// Configuración de coches
export const CARS_CONFIG = [
  {
    id: 'car1',
    sprites: CAR_SPRITES.CAR1,
    path: CAR_PATHS.CAR1_PATH,
<<<<<<< HEAD
    speed: 150, 
=======
    speed: 150, // Más rápido y fluido
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
    spawnDelay: 0,
    respawnDelay: { min: 3000, max: 8000 },
    hornMessage: '🚗 PI PIIIII!!',
    randomSpawn: true,
  },
  {
    id: 'car2',
    sprites: CAR_SPRITES.CAR2,
    path: CAR_PATHS.CAR2_PATH,
<<<<<<< HEAD
    speed: 150, 
=======
    speed: 150, // Más rápido y fluido
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
    spawnDelay: 0,
    respawnDelay: { min: 4000, max: 10000 },
    hornMessage: '🚙 PI PIIIII!!',
    randomSpawn: true,
  },
  {
    id: 'car3',
    sprites: CAR_SPRITES.CAR1,
    path: CAR_PATHS.CAR3_PATH,
<<<<<<< HEAD
    speed: 150, 
=======
    speed: 150, // Más rápido y fluido
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
    spawnDelay: 0,
    respawnDelay: { min: 5000, max: 9000 },
    hornMessage: '🚗 PI PIIIII!!',
    randomSpawn: true,
  },
  {
    id: 'car4',
    sprites: CAR_SPRITES.CAR2,
    path: CAR_PATHS.CAR4_PATH,
<<<<<<< HEAD
    speed: 150,
=======
    speed: 150, // Más rápido y fluido
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
    spawnDelay: 0,
    respawnDelay: { min: 6000, max: 11000 },
    hornMessage: '🚙 PI PIIIII!!',
    randomSpawn: true,
  },
];

// ============================================
// === Frases del NPC ===
// ============================================
export const NPC_PHRASES = [
  // Edificios
  "Si pasas por la Escuela, verás dónde descubrí mi pasión por programar 📚💡",
  "En la Oficina encontrarás toda mi experiencia laboral 💼✨",
  "La Academia guarda otros cursos y aprendizajes que me encantan 📖🌟",
  "En el Taller practico mis skills, siempre aprendiendo cosas nuevas 🛠️💻",
  "La Radio es donde comparto mis redes sociales, ¡échales un vistazo 📻😊!",
  "La Cafetería es tu lugar para dejarme un mensaje ☕💌",
  "En el Museo están todos mis proyectos, ¡ya verás qué divertido 🎨✨!",
  "El Club muestra mis hobbies, ¡no te lo pierdas 🎶😄!",

  // Comentarios sobre la ciudad
  "¿Has visto esa farola? Siempre ilumina el camino correctamente 💡😉",
  "Me encanta cómo quedan los árboles junto a los edificios 🌳✨",
  "Cada calle de esta ciudad tiene su propia historia… ¡explórala! 👀",
  "Cuidado con los coches pixelados… ¡van muy rápido! 🚗💨",

  // Comentarios divertidos / curiosidades
  "A veces me pierdo entre los edificios, ¿y tú? 😅",
  "Si escuchas atentamente, puedes oír a los NPCs hablando 🎵👂",
  "Me gusta que cada visitante descubra algo nuevo en la ciudad 🌟",
  "¿Sabías que este banco del parque es mi lugar favorito para descansar? 🪑✨",
  "Si te acercas demasiado a mí, ¡te contaré un secreto de la ciudad! 🤫",
  
  // Mini consejos / guiños
  "Prueba interactuar con todo… nunca se sabe qué puede pasar ✨😉",
  "Los NPCs tienen frases curiosas, ¡acércate a escucharlas! 🗣️💡",
  "Si quieres ver todo de un vistazo, mira el minimapa 🗺️✨",
  "No olvides usar el modo Recruiter si quieres toda la info de golpe 🚀",
  "Algunos edificios tienen sorpresas si te acercas con atención 👀🎁"
];

// ============================================
// === Frases especiales por edificio ===
// ============================================
export const NPC_BUILDING_PHRASES = {
  EDUCACION: [
<<<<<<< HEAD
    "Aquí descubrí mi camino profesional 💡❤️"
=======
    "Descubrí mi camino profesional aquí y me enamoré de él 💡❤️"
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
  ],
  EXPERIENCIA: [
    "Cada proyecto me enseñó algo nuevo 💼❤️"
  ],
  SOBRE_MI: [
<<<<<<< HEAD
    "Esta es mi casa, mi rincón personal 🏠✨"
  ],
  SKILLS: [
    "Aquí practico y refuerzo mis habilidades constantemente 💡🛠️"
=======
    "Esta es mi base, donde todo comienza y donde te cuento sobre mí 🏠✨"
  ],
  SKILLS: [
    "Aquí practico y refuerzo mis skills constantemente 💡🛠️"
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
  ],
  HOBBIES: [
  "Aquí conoces un poco más sobre mí y mis hobbies 🎶😄"
],
  OTROS: [
<<<<<<< HEAD
    "Aprender es un viaje sin fin… 💡🌟"
=======
    "Aprender es un viaje sin fin… ¡y me encanta! 💡🌟"
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
  ],
  RRSS: [
    "Si quieres seguirme, aquí está toda la información 📻🌟"
  ],
  CONTACTO: [
    "Deja tu mensaje en la Cafetería, ¡te contestaré! 💌☕"
  ],
  PROYECTOS: [
    "Disfruta de mis proyectos, ¡seguirán creciendo! ✨🎨"
  ]
};

// ============================================
// === Frases de NPCs Adicionales ===
// ============================================

<<<<<<< HEAD
// Obrero 
export const OBRERO_PHRASES = [
  // Cafetería
  "Un café rapidito y al tajo, que el trabajo no sale solo ☕💼",
  "Yo no paro por cansancio, paro por respeto al café ☕😉",
  "El café es pausa de manos, no de mente ☕🛠️",


  // Contacto
  "Si buscas al jefe de todo esto, entra en la cafetería. Allí te dirán como encontrarlo 😉",
  "Si quieres hablar con el que hizo todo esto, entra en la cafetería, ami no me líes que tengo faena 🛠️",
  "Si entras en la cafetería dí que vas de mi parte, igual te escucha 😉",

  // Club / Diversión
  "Si bajas al club no esperes silencio, ahí suena la vida 🎶",
  "El club es donde se suelta el estrés del día a día 🎉",
  "Si buscas diversión, el club es tu sitio 🎶😄"
];

// FERNANDO
export const FERNANDO_PHRASES = [
 //A perdido al perro
 "Siempre que salgo a despejarme acabo perdiendo algo... hoy le ha tocado al perro 🐕‍🦺",
 "A veces pienso que el perro me entiende mejor que la gente... por eso se va 😐",
 "¡Toby!🐕‍🦺 ¡Ven! Que te juro que esta vez no te baño 🙄",
 "Si toby 🐕‍🦺 me ve desde lejos, seguro que dice: Míralo como corre el tonto este otra vez....",
 "Seguro que está por la radio o por el taller... Ese perro tiene el olfato activado apra el barullo 🐕‍🦺",
 

];


// PEDRO
export const PEDRO_PHRASES = [
  //REFRANES 
  "Más sabe el diablo por viejo que por diablo 👴",
  "No por mucho madrugar amanece más temprano 🌅",
  "Camarón que se duerme se lo lleva la corriente 🌊",
  "Al mal tiempo, buena cara ☔",
  "No hay mal que por bien no venga 🌈",
  "A palabras necias, oídos sordos 🙉",
  "Más vale tarde que nunca ⏰",
  "El hábito no hace al monje 👘",
  "A río revuelto, ganancia de pescadores 🎣",
  "No dejes para mañana lo que puedas hacer hoy 📅",
  "Zapatero a tus zapatos 👞",
  "No hay tonto mas tonto que el que se cree listo 🤡",


  // Museo / Proyectos
  "Quién al museo va sin prisa, aprende más que el que corre a misa 🎨",
  "El que entra en el museo, o se inspira o se siente pequeño ✨",
  "Ahí dentro no hay solo arte, hay horas sin dormir 🎭",
  "No todo lo que brilla es oro, pero en ese museo... Algo reluce de verdad 💡",

  // Cosas propias / Reflexiones
  "Antes se saludaba por la calle, ahora te miran como si les debieras dinero 🤝",
  "Recuerdo cuando todo esto era campo 🏙️",
  "Los jóvenes de hoy en día... siempre pegados a sus pantallas 📱",
  "En mis tiempos, aprender a programar era cosa de valientes 💻",
  "La experiencia es la madre de la ciencia, y yo he tenido muchos hijos 👴💡"
=======
// Obrero - Frases profesionales sobre trabajo
export const OBRERO_PHRASES = [
  // Cafetería / Contacto con Andrea
  "He estado construyendo estos edificios… ¿ves la cafetería? ☕💌",
  "Después de tanto trabajo, la cafetería me llama… y a ti también 😉",
  "Construí gran parte de la ciudad, ahora entra y habla con Andrea ✨",
  "Mis manos están cansadas… pero tú entra a la cafetería ☕",
  "Entre ladrillos y planos, la cafetería guarda mensajes 💌",
  "He levantado estos edificios… entra y deja tu mensaje 😉",
  "Pausa tras construir la ciudad… ¡y tú aprovecha para hablar con Andrea! ☕",
  "Después de tanta obra, la cafetería es un oasis ✨",
  "Mis brazos descansan, pero tú entra a la cafetería 💌",
  "Tras poner ladrillo tras ladrillo, la cafetería te espera 😉",

  // Club / Diversión
  "Después de construir tanto, baja al club a relajarte 🎵",
  "He levantado estos edificios… ahora tú baja y pásalo bien 😎",
  "Tras mover muros y vigas, el club te espera 🎉",
  "Mis manos descansan… pero el club sigue vivo 🔥",
  "Después de tanta obra, el club es perfecto para divertirse 🎶",
  "Construir cansa… el club no, ¡entra y disfruta! 😎",
  "Tras levantar la ciudad, baja al club y relájate 🎵",
  "Mi jornada terminó… tú aún puedes explorar el club 🎉",
  "Después de mucho trabajo, el club tiene risas aseguradas 🔥",
  "He puesto ladrillos todo el día… ¡pero el club está listo para ti! 🎶",

  // Ciudad / Exploración ligera
  "He estado construyendo cada esquina de esta ciudad 🏙️, ¡explórala!",
  "Tras tanto trabajo, cada calle guarda su historia 👀",
  "Mis manos descansan… pero la ciudad sigue viva 🌟",
  "Construí cada edificio, ahora descubre sus secretos 🌃",
  "Entre planos y ladrillos, la ciudad tiene rincones curiosos 😉",
  "He levantado calles y edificios… explora y sorpréndete 🏙️",
  "Después de tanto martillo y cemento, observa la ciudad 👀",
  "Construí los cimientos… ahora tú explora y descubre ✨",
  "Tras tanto trabajo, cada calle merece ser explorada 🌟",
  "He acabado por hoy… pero la ciudad te espera 😉"
];

// FERNANDO - Frases técnicas y de programación
export const FERNANDO_PHRASES = [
  // Museo / Proyectos
  "Wow, ¿has visto ese museo más abajo? 🎨 ¡entra y descubre los proyectos!",
  "El museo guarda ideas increíbles 💡, baja y échales un vistazo",
  "Si miras más abajo, el museo tiene sorpresas que te inspirarán ✨",
  "Los proyectos del museo son dignos de explorar 👀",
  "El museo está lleno de creatividad 🎭, baja y descúbrelo",
  "Entre paredes y arte 🎨, el museo te espera",
  "Si bajas al museo, encontrarás historias y proyectos únicos 💡",
  "Mira el museo más abajo 🎨… hay mucho por ver",
  "Proyectos y arte se unen en el museo ✨, baja a verlo",
  "El museo tiene secretos que solo los curiosos descubrirán 👀",

  // Taller / Skills
  "A la derecha está el taller 🛠️, perfecto para explorar habilidades",
  "El taller guarda secretos de destreza y talento 💪",
  "Si visitas el taller, verás cómo se construyen grandes cosas 🔧",
  "El taller es un lugar de práctica y creatividad ✨",
  "En el taller aprendes y exploras nuevas habilidades 🛠️",
  "Si bajas al taller, tus skills se sentirán inspirados 💡",
  "El taller está activo 🔧… ¿quieres descubrirlo?",
  "Habilidades y herramientas te esperan en el taller 🛠️",
  "En el taller se hacen grandes cosas 💪, entra y mira",
  "El taller es tu punto de referencia para mejorar habilidades ✨",

  // Radio / Redes sociales
  "A la derecha, la radio 📻 te conecta con el mundo",
  "La radio tiene mensajes interesantes 📡, échales un vistazo",
  "Si pasas por la radio, encontrarás conexiones geniales ✨",
  "La radio transmite noticias y sorpresas 🎙️",
  "Explora la radio 📻, quizá encuentres algo útil",
  "La radio está siempre encendida 🔊, entra y escucha",
  "Con la radio conectas con todos 📡, ¡no te lo pierdas!",
  "La radio transmite historias fascinantes 🎙️",
  "Si bajas a la radio 📻, hay contenido que te gustará",
  "La radio es un punto de encuentro 🔊, acércate y explora",

  // Ciudad / Parque / Exploración
  "Este parque es mi lugar favorito 🌳, mira los pajaritos 🐦",
  "Me encanta pasear por la ciudad 🏙️ y descubrir rincones secretos",
  "Nada como descansar aquí 🍃 y observar la naturaleza",
  "Cada calle y árbol tiene su historia 👀, explora a tu alrededor",
  "El parque está lleno de vida 🌸, disfruta mientras caminas",
  "Si miras a tu alrededor, la ciudad tiene sorpresas 🌟",
  "Entre naturaleza y ciudad 🍃🏙️, siempre hay algo que ver",
  "Este lugar es perfecto para pensar y relajarte ✨",
  "Observa los pajaritos 🐦 mientras exploras la ciudad",
  "El parque y sus alrededores tienen secretos que descubrir 👀"
];


// Senior - Frases de experiencia y sabiduría tech
export const PEDRO_PHRASES = [
  // Museo / Proyectos
  "Ah, ese museo… he visto tantas cosas allí 🎨",
  "Los proyectos de hoy son impresionantes 💡",
  "Recuerdo cuando construían cada rincón de la ciudad 👀",
  "El museo guarda historias que te sorprenderán ✨",
  "Baja al museo y verás cosas que yo vi hace años 🎭",
  "Cada obra del museo tiene su encanto 🎨",
  "He aprendido mucho solo observando los proyectos 💡",
  "El museo es un lugar que siempre inspira ✨",
  "Proyectos de ayer y hoy se encuentran en ese museo 👀",
  "Mira el museo… hay historias que contar 🎨",

  // Ciudad / Parque / Exploración
  "La ciudad ha cambiado mucho desde que era joven 🏙️",
  "Cada calle guarda recuerdos 🍃",
  "Disfruta del paseo, ¡yo lo hago todos los días 🌸!",
  "Observa los edificios, tienen muchas historias 👀",
  "Mi barrio ha visto muchas generaciones pasar 🌟",
  "La ciudad es viva, incluso a mi edad 🏙️",
  "Me gusta sentarme y mirar a mi alrededor 🍃",
  "Explora y aprende, cada rincón tiene su historia ✨",
  "La ciudad es un museo vivo 👀",
  "Pasear por aquí siempre me trae buenos recuerdos 🌸",

  // Cosas de viejo / Reflexiones
  "Con mis años he aprendido a apreciar los detalles 👴",
  "Recuerdo cuando todo esto era diferente 🏙️",
  "Hay que tomarse un descanso y disfrutar 🍵",
  "La experiencia no se aprende en un día ✨",
  "Con cada arruga vienen historias 📖",
  "He visto cómo crece la ciudad paso a paso 👀",
  "A veces la tranquilidad es lo más valioso 🌿",
  "Los años enseñan a mirar con otros ojos 👴",
  "La paciencia es la clave en cualquier proyecto 🛠️",
  "Disfruta mientras puedas, joven explorador 🌟",

  // Comentarios generales / Curiosidades
  "Nunca subestimes la magia de esta ciudad ✨",
  "Hay secretos que solo los curiosos descubren 👀",
  "Me gusta ver cómo la gente explora los edificios 🏙️",
  "Siempre hay algo nuevo que aprender 💡",
  "El parque cercano es perfecto para reflexionar 🍃",
  "Me gusta escuchar a los pájaros mientras paseo 🐦",
  "Cada esquina tiene su historia escondida 🌟",
  "Algunas cosas cambian, otras permanecen igual 👴",
  "Observa bien… hay detalles que pasan desapercibidos 👀",
  "Disfruta del museo, la ciudad y sus secretos 🎨"
>>>>>>> 561a103d3fcac76a64845d6c3da8abe0f37814e9
];




// ============================================
// === Helper Functions ===
// ============================================

export const isNearby = (entity1, entity2, range = 1) => {
  return Math.abs(entity1.x - entity2.x) <= range && Math.abs(entity1.y - entity2.y) <= range;
};
