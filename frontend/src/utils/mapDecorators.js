/**
 * Funciones para crear edificios y objetos decorativos en el mapa
 */

// ============================================
// === EDIFICIOS - TILES Y FUNCIONES ===
// ============================================

/**
 * Función helper para generar edificios a partir de una matriz de tiles
 * @param {Array<Array<number>>} tiles - Matriz de tiles del edificio
 * @returns {Function} Función que toma (x0, y0) y devuelve array de objetos tile
 */
export const crearEdificio = (tiles) => (x0, y0) => {
  const arr = [];
  for (let y = 0; y < tiles.length; y++) {
    for (let x = 0; x < tiles[y].length; x++) {
      if (tiles[y][x] !== undefined) {
        arr.push({ x: x0 + x, y: y0 + y, tile: tiles[y][x] });
      }
    }
  }
  return arr;
};

// ============================================
// === EDIFICIOS - DEFINICIONES DE TILES ===
// ============================================

export const CASA_TILES = [
  [89, 90, 90, 91],
  [143, 144, 144, 145],
  [124, 128, 130, 124],
  [178, 182, 184, 178],
  [178, 155, 157, 178],
  [205, 209, 211, 205],
];

export const EDIFICIO_EDUCACION_TILES = [
  [81, 82, 82, 82, 83],
  [135, 136, 136, 136, 137],
  [16, 20, 21, 22, 16],
  [70, 47, 48, 49, 70],
  [97, 101, 102, 103, 97],
];

export const EDIFICIO_SOBRE_MI_TILES = [
  [89, 90, 90, 91],
  [143, 144, 144, 145],
  [124, 128, 130, 124],
  [178, 155, 157, 178],
  [205, 209, 211, 205],
];

export const EDIFICIO_OTROS_TILES = [
  [81, 82, 82, 82, 83],
  [135, 136, 136, 136, 137],
  [16, 20, 21, 22, 16],
  [70, 47, 48, 49, 70],
  [97, 101, 102, 103, 97],
];

export const EDIFICIO_EXPERIENCIA_TILES = [
  [108, 86, 136, 136, 136, 87, 110, 83],
  [108, 110, 128, 129, 130, 108, 110, 137],
  [135, 137, 182, 183, 184, 135, 137, 127],
  [125, 127, 209, 210, 211, 125, 127, 208],
  [206, 208, undefined, undefined, undefined, 206, 208],
];

export const EDIFICIO_CONTACTO_TILES = [
  [81, 81, 82, 82, 82, 82, 82, 83, 83],
  [135, 108, 86, 136, 136, 136, 87, 110, 137],
  [125, 135, 137, 128, 129, 130, 135, 137, 127],
  [206, 125, 127, 182, 183, 184, 125, 127, 208],
  [undefined, 206, 208, 209, 210, 211, 206, 208],
];

export const EDIFICIO_PROYECTOS_TILES = [
  [149, 90, 90, 90, 149, 90, 90, 90, 149, 90, 90, 90, 149],
  [116, 117, 117, 117, 117, 117, 117, 117, 117, 117, 117, 117, 118],
  [149, 144, 144, 144, 149, 144, 144, 144, 149, 144, 144, 144, 149],
  [16, 20, 21, 22, 16, 20, 21, 22, 16, 20, 21, 22, 16],
  [70, 74, 75, 76, 70, 74, 75, 76, 70, 74, 75, 76, 70],
  [70, 74, 75, 76, 70, 74, 75, 76, 70, 74, 75, 76, 70],
  [97, 101, 102, 103, 97, 101, 102, 103, 97, 101, 102, 103, 97],
];

export const EDIFICIO_SKILLS_TILES = [
  [89, 90, 90, 91],
  [143, 144, 144, 145],
  [124, 128, 130, 124],
  [178, 182, 184, 178],
  [178, 155, 157, 178],
  [205, 209, 211, 205],
];

export const EDIFICIO_RRSS_TILES = [
  [89, 90, 90, 91],
  [143, 144, 144, 145],
  [124, 128, 130, 124],
  [178, 182, 184, 178],
  [178, 155, 157, 178],
  [205, 209, 211, 205],
];

export const EDIFICIO_HOBBIES_TILES = [
  [89, 90, 90, 91],
  [143, 144, 144, 145],
  [124, 128, 130, 124],
  [178, 182, 184, 178],
  [178, 155, 157, 178],
  [205, 209, 211, 205],
];


export const PUERTA = (x, y) => ({ x, y, tile: 255 });

export const PUERTA_310 = (x, y) => ({ x, y, tile: 310 });

export const PUERTA_311 = (x, y) => ({ x, y, tile: 311 });

export const PUERTA_312 = (x, y) => ({ x, y, tile: 312 });

export const PUERTA_414 = (x, y) => ({ x, y, tile: 414 });

export const PUERTA_415 = (x, y) => ({ x, y, tile: 415 });

export const PUERTA_285 = (x, y) => ({ x, y, tile: 285 });


export const PUERTA_386 = (x, y) => ({ x, y, tile: 386 });


export const PUERTA_388 = (x, y) => ({ x, y, tile: 388 });


export const PUERTA_EMERGENCIA = (x, y) => ({ x, y, tile: 282 });


export const PUERTA_DOBLE = (x, y) => [{ x, y, tile: 312 }];


export const PUERTA1 = (x, y) => ({ x, y, tile: 255 });



export const SEMAFORO = (x, y, flip = false) => [
  { x, y, tile: 409, flip },
  { x, y: y + 1, tile: 191, flip }
];

export const STOP = (x, y) => [
  { x, y, tile: 166 },
  { x, y: y + 1, tile: 193 }
];

export const CARTELITOS = (x, y) => [
  { x, y, tile: 167 },
  { x, y: y + 1, tile: 194 }
];


export const CARTEL_TALLER = (x, y) => [
  { x, y, tile: 167 },
  { x, y: y + 1, tile: 194 }
];

export const CARTEL_RADIO = (x, y) => [
  { x, y, tile: 167 },
  { x, y: y + 1, tile: 194 }
];

export const CARTEL_CLUB = (x, y) => [
  { x, y, tile: 167 },
  { x, y: y + 1, tile: 194 }
];


export const FAROLA_VERDE = (x, y) => [
  { x, y, tile: 169 },
  { x, y: y + 1, tile: 196 }
];

export const FAROLA_GRIS = (x, y, flip = false) => [
  { x, y, tile: 164, flip },
  { x, y: y + 1, tile: 191, flip }
];

export const FAROLA_DOBLE = (x, y) => [
  { x, y, tile: 165 },
  { x, y: y + 1, tile: 192 }
];

// ============================================
// === VENTANAS - TODAS LAS VARIANTES ===
// ============================================

// Ventana simple (tile 335) - Más común
export const VENTANA = (x, y) => ({ x, y, tile: 335 });

// Ventana tipo 338
export const VENTANA_338 = (x, y) => ({ x, y, tile: 338 });

// Ventana tipo 363
export const VENTANA_363 = (x, y) => ({ x, y, tile: 363 });

// Ventana cuadrada (2 tiles verticales: 362 + 389)
export const VENTANA_CUADRADA = (x, y) => [
  { x, y, tile: 362 },
  { x, y: y + 1, tile: 389 }
];

// Ventanas tipo 417/446/473 (3 tiles de alto)
export const VENTANA_417_446_473 = (x, y) => [
  { x, y, tile: 417 },
  { x, y: y + 1, tile: 446 },
  { x, y: y + 2, tile: 473 }
];

// Ventanas tipo 418/473 (2 tiles de alto)
export const VENTANA_418_473 = (x, y) => [
  { x, y, tile: 418 },
  { x, y: y + 1, tile: 473 }
];

// Ventanas tipo 418/446/473 (3 tiles de alto)
export const VENTANA_418_446_473 = (x, y) => [
  { x, y, tile: 418 },
  { x, y: y + 1, tile: 446 },
  { x, y: y + 2, tile: 473 }
];

// Ventana tipo 445 (techo/decoración)
export const VENTANA_445 = (x, y) => ({ x, y, tile: 445 });

// Ventana tipo 446 con rotación
export const VENTANA_446_ROTADA = (x, y) => ({ x, y, tile: 446, rotate: 90 });


// Ventanas tipo 255 (marco de puerta/ventana)
export const VENTANA_255 = (x, y) => ({ x, y, tile: 255 });

// Ventanas tipo 470 (inferior)
export const VENTANA_470 = (x, y) => ({ x, y, tile: 470 });

// Toldos
export const TOLDO = (x, y) => [
  { x, y, tile: 328 },
  { x: x + 1, y, tile: 330 }
];

export const TOLDO_GRANDE = (x, y) => [
  { x, y, tile: 328 },
  { x: x + 1, y, tile: 329 },
  { x: x + 2, y, tile: 330 }
];

// Naturaleza
export const ARBOL = (x, y) => [
  { x, y, tile: 232 },
  { x, y: y + 1, tile: 286 }
];

export const ARBOL_TRIPLE = (x, y) => [
  { x, y, tile: 232 },
  { x, y: y + 1, tile: 264 },
  { x, y: y + 2, tile: 259 }
];

export const ARBUSTO = (x, y) => ({ x, y, tile: 238 });

export const FUENTE_ALARGADA = (x, y) => [
  { x, y, tile: 174 , spritesheet: 'secondary' },
  { x: x + 1, y, tile: 176, spritesheet: 'secondary' },
  { x, y: y + 1, tile: 248 , spritesheet: 'secondary' },
  { x: x + 1, y: y + 1, tile: 250, spritesheet: 'secondary' },
];

// Mobiliario urbano
export const CABLE = (x, y) => ({ x, y, tile: 247 });
export const BANCO = (x, y) => ({ x, y, tile: 381 });
export const BUZON = (x, y) => ({ x, y, tile: 305 });
export const PARKIMETRO = (x, y) => ({ x, y, tile: 190 });
export const ESCALERITA = (x, y) => ({ x, y, tile: 380 });

// Coches
export const COCHE_VERDE_DERECHA = (x, y) => [
  { x, y, tile: 480 },
  { x: x + 1, y, tile: 481 }
];

export const COCHE_NARANJA_DERECHA = (x, y) => [
  { x, y, tile: 393 },
  { x: x + 1, y, tile: 394 },
  { x, y: y + 1, tile: 420 },
  { x: x + 1, y: y + 1, tile: 421 }
];

// ============================================
// === TILES DECORATIVOS INDIVIDUALES ===
// ============================================

// Tile 238 - Decoración de parque/césped
export const TILE_238 = (x, y) => ({ x, y, tile: 238 });

// Tile 230 - Lago redondo
export const LAGO_REDONDO = (x, y) => ({ x, y, tile: 230 });


// Fuente especial de 2 filas (3x2)
export const FUENTE_ESPECIAL = (x, y) => [
  { x, y, tile: 174 , spritesheet: 'secondary'  },
  { x: x + 1, y, tile: 175, spritesheet: 'secondary'  },
  { x: x + 2, y, tile: 176 , spritesheet: 'secondary'  },
  { x, y: y + 1, tile: 211 , spritesheet: 'secondary'  },
  { x: x + 1, y: y + 1, tile: 212, spritesheet: 'secondary'  },
  { x: x + 2, y: y + 1, tile: 213, spritesheet: 'secondary'  },
   { x, y: y + 2, tile: 211, spritesheet: 'secondary'  },
  { x: x + 1, y: y + 2, tile: 212, spritesheet: 'secondary'  },
  { x: x + 2, y: y + 2, tile: 213, spritesheet: 'secondary'  },
     { x, y: y + 3, tile: 211, spritesheet: 'secondary'  },
  { x: x + 1, y: y + 3, tile: 212, spritesheet: 'secondary'  },
  { x: x + 2, y: y + 3, tile: 213, spritesheet: 'secondary'  },



];

// Tiles 327, 354 - Bancos adicionales
export const BANCO_IZQ = (x, y) => ({ x, y, tile: 327 });
export const BANCO_DER = (x, y) => ({ x, y, tile: 354 });

// Tile 299 - Park decorativo
export const PARK = (x, y) => ({ x, y, tile: 299 });
