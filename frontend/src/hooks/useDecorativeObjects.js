import { useMemo } from 'react';
import {
  PUERTA_EMERGENCIA, PUERTA_386, PUERTA_388, PUERTA_DOBLE, PUERTA1,
  PUERTA_310, PUERTA_311, PUERTA_312, PUERTA_285, PUERTA_414, PUERTA_415,
  VENTANA_445, VENTANA_255, VENTANA_470, VENTANA_446_ROTADA, VENTANA_338, VENTANA_363,
  VENTANA_417_446_473, VENTANA_418_473, VENTANA_418_446_473, VENTANA, VENTANA_CUADRADA,
  FAROLA_VERDE, FAROLA_GRIS, FAROLA_DOBLE, SEMAFORO, TOLDO, TOLDO_GRANDE,
  BUZON, ESCALERITA, STOP, CARTELITOS, ARBOL, ARBOL_TRIPLE, ARBUSTO,
  CABLE, BANCO, BANCO_IZQ, BANCO_DER, PARK, PARKIMETRO,
  FUENTE_ALARGADA, FUENTE_ESPECIAL, COCHE_VERDE_DERECHA, COCHE_NARANJA_DERECHA
} from '../utils/mapDecorators';

const renderSingleParamFunc = (func, coords) => coords.map(([x, y]) => func(x, y));
const renderVentanasSimples = (coords) => coords.flatMap(([x, y]) => VENTANA(x, y));
const renderVentanasCuadradas = (coords) => coords.flatMap(([x, y]) => VENTANA_CUADRADA(x, y));
const renderVentanas417_446_473 = (coords) => coords.flatMap(([x, y]) => VENTANA_417_446_473(x, y));
const renderVentanas418_473 = (coords) => coords.flatMap(([x, y]) => VENTANA_418_473(x, y));
const renderVentanas418_446_473 = (coords) => coords.flatMap(([x, y]) => VENTANA_418_446_473(x, y));
const renderVentanas363 = (coords) => coords.map(([x, y]) => VENTANA_363(x, y));
const renderArboles = (coords) => coords.flatMap(([x, y]) => ARBOL(x, y));
const renderArbolesTriples = (coords) => coords.flatMap(([x, y]) => ARBOL_TRIPLE(x, y));
const renderFarolasDobles = (coords) => coords.flatMap(([x, y]) => FAROLA_DOBLE(x, y));
const renderSemaforos = (coords) => coords.flatMap(([x, y, flip]) => SEMAFORO(x, y, flip));
const renderToldos = (coords) => coords.flatMap(([x, y]) => TOLDO(x, y));
const renderSimpleFunc = (func, coords) => coords.map(([x, y]) => func(x, y));
const renderFuentesAlargadas = (coords) => coords.flatMap(([x, y]) => FUENTE_ALARGADA(x, y));
const renderCoches = (func, coords) => coords.flatMap(([x, y]) => func(x, y));
const renderTiles = (tile, coords) => coords.map(([x, y]) => ({ x, y, tile }));

const ESCULTURAS = [
  { x: 24, y: 25, tile: 500, image: 'tile_0500.png' },
  { x: 24, y: 26, tile: 501, image: 'tile_0501.png' },
  { x: 28, y: 25, tile: 500, image: 'tile_0500.png' },
  { x: 28, y: 26, tile: 501, image: 'tile_0501.png' },
];

export function useDecorativeObjects() {
  const OBJECTS = useMemo(() => [
    ...ESCULTURAS,
    ...renderTiles(245, [[44, 23]]),
    ...renderTiles(248, [[3, 1], [5, 2]]),
    
    // Puertas
    PUERTA_EMERGENCIA(4, 15),
    ...renderSingleParamFunc(PUERTA_386, [[5, 16], [7, 16], [10, 16]]),
    ...renderSingleParamFunc(PUERTA_388, [[6, 16], [9, 16], [11, 16]]),
    ...PUERTA_DOBLE(10, 4),
    PUERTA1(9, 4),
    PUERTA1(11, 4),
    PUERTA_414(20, 16),
    PUERTA_415(21, 16),
    ...renderSingleParamFunc(PUERTA_310, [[38, 27], [5, 29], [41, 27], [8, 16]]),
    PUERTA_311(34, 4),
    PUERTA_312(26, 25),
    ...PUERTA_DOBLE(17, 3),
    ...renderSingleParamFunc(PUERTA_285, [[16, 3], [18, 3], [25, 25], [27, 25]]),

    // Ventanas
    ...renderSingleParamFunc(VENTANA_445, [[32, 2], [36, 2]]),
    ...renderSingleParamFunc(VENTANA_255, [[32, 3], [36, 3]]),
    ...renderSingleParamFunc(VENTANA_470, [[32, 4], [36, 4]]),
    ...renderSingleParamFunc(VENTANA_446_ROTADA, [[16, 2], [17, 2], [18, 2], [19, 3], [20, 3], [14, 3], [15, 3]]),
    ...renderVentanas417_446_473([[8, 2], [12, 2]]),
    ...renderVentanas418_473([[21, 24], [23, 24], [25, 23], [26, 23], [27, 23], [29, 24], [31, 24]]),
    ...renderVentanas418_446_473([[22, 23], [30, 23]]),
    ...renderVentanasSimples([[38, 2], [38, 3], [38, 4], [41, 2], [41, 3], [41, 4], [42, 2], [42, 3], [42, 4], [45, 2], [45, 3], [45, 4], [39, 4], [44, 4], [43, 16], [6, 29], [1, 29], [2, 16], [42, 27], [46, 27], [37, 27], [0, 14], [0, 15], [0, 16], [3, 14], [3, 15], [3, 16], [19, 15], [19, 16], [22, 15], [22, 16], [37, 14], [37, 15], [37, 16], [36, 25], [36, 26], [36, 27], [39, 25], [39, 26], [39, 27], [40, 25], [40, 26], [40, 27], [43, 25], [43, 26], [43, 27], [40, 14], [40, 15], [40, 16], [41, 14], [45, 25], [45, 26], [45, 27], [46, 14], [46, 15], [46, 16], [41, 15], [41, 16], [44, 14], [44, 15], [44, 16], [7, 27], [7, 28], [7, 29], [4, 27], [4, 28], [4, 29], [3, 27], [3, 28], [3, 29], [0, 27], [0, 28], [0, 29]]),
    ...renderVentanasCuadradas([[39, 1], [40, 1], [43, 1], [44, 1], [39, 2], [40, 2], [43, 2], [44, 2], [1, 13], [2, 13], [1, 14], [2, 14], [38, 13], [38, 14], [39, 13], [39, 14], [42, 13], [42, 14], [43, 13], [43, 14], [6, 27], [5, 27], [42, 25], [41, 25], [37, 25], [38, 25], [1, 27], [2, 27], [1, 26], [2, 26], [46, 25], [46, 24]]),
    ...renderSingleParamFunc(VENTANA_338, [[38, 16], [39, 16], [42, 16], [40, 4], [43, 4], [1, 16], [2, 29]]),
    ...renderVentanas363([[7, 15], [8, 15], [9, 15]]),

    // Carteles de neón
    { x: 9, y: 2, text: "ESCUELA", neon: true, compact: true, tiles: 3, colorClass: "neon-green" },
    { x: 16, y: 1, text: "OFICINA", neon: true, compact: true, tiles: 3, colorClass: "neon-blue" },
    { x: 33, y: 2, text: "ACADEMIA", neon: true, compact: true, tiles: 3, colorClass: "neon-yellow" },
    { x: 20, y: 14, text: "HOME", neon: true, compact: true, tiles: 2, colorClass: "neon-orange" },
    { x: 7, y: 14, text: "CAFETERIA", neon: true, compact: true, colorClass: "neon-red" },
    { x: 25, y: 22, text: "MUSEO", neon: true, compact: true, colorClass: "neon-purple" },
    { x: 37, y: 24, text: "TALLER", neon: true, compact: true, tiles: 2, colorClass: "neon-cyan" },
    { x: 41, y: 24, text: "RADIO", neon: true, compact: true, tiles: 2, colorClass: "neon-pink" },
    { x: 5, y: 26, text: "CLUB", neon: true, compact: true, tiles: 2, colorClass: "neon-teal" },

    // Iluminación
    ...FAROLA_VERDE(1, 2),
    ...FAROLA_GRIS(7, 3),
    ...FAROLA_GRIS(22, 3, true),
    ...FAROLA_GRIS(13, 14, true),
    ...FAROLA_GRIS(33, 23, true),
    ...FAROLA_GRIS(24, 29),
    ...FAROLA_GRIS(28, 29, true),
    ...FAROLA_GRIS(32, 31, true),
    ...FAROLA_GRIS(20, 31),
    ...FAROLA_GRIS(36, 15),
    ...FAROLA_GRIS(19, 23),
    ...renderFarolasDobles([[0, 9], [13, 4], [8, 18], [2, 18], [8, 9], [32, 9], [41, 9]]),
    ...renderTiles(169, [[34, 16], [30, 14]]),
    ...renderTiles(196, [[34, 17], [30, 15]]),
    ...renderTiles(164, [[31, 3]]),
    { x: 31, y: 4, tile: 191, flip: false },

    // Señalización
    ...renderSemaforos([[2, 4, true], [23, 9, true], [14, 9, true], [9, 22, true], [30, 5, false]]),
    ...renderToldos([[5, 16], [10, 16]]),
    ...TOLDO_GRANDE(7, 16),
    BUZON(7, 5),
    BUZON(13, 23),
    { x: 17, y: 26, tile: 587, spritesheet: 'secondary' },
    { x: 17, y: 25, tile: 553, spritesheet: 'secondary' },
    { x: 10, y: 17, tile: 676, spritesheet: 'secondary' },
    { x: 11, y: 17, tile: 679, spritesheet: 'secondary' },
    ESCALERITA(22, 2),
    ...STOP(18, 9),
    ...CARTELITOS(26, 9),

    // Naturaleza
    ...renderArboles([[21, 3], [12, 15], [23, 25], [22, 25], [21, 25], [20, 25], [29, 25], [30, 25], [31, 25], [32, 25], [33, 25], [19, 25]]),
    ...renderArbolesTriples([[37, 17], [38, 17], [39, 17], [42, 17], [43, 17], [46, 17], [13, 26], [13, 29]]),
    ...renderSimpleFunc(ARBUSTO, [[40, 18], [41, 18], [44, 18], [45, 18], [14, 26], [14, 27], [14, 28], [14, 30], [14, 31]]),
    { x: 21, y: 12, tile: 333 },

    // Mobiliario
    CABLE(13, 1),
    ...renderSimpleFunc(BANCO, [[0, 4], [40, 19], [41, 19], [44, 19], [45, 19]]),
    ...renderSimpleFunc(BANCO_IZQ, [[33, 18], [33, 13]]),
    ...renderSimpleFunc(BANCO_DER, [[31, 18], [31, 13]]),
    ...renderSimpleFunc(PARK, [[28, 12], [28, 13], [28, 14], [28, 15], [28, 16], [28, 17]]),
    PARKIMETRO(28, 11),
    { x: 0, y: 0, tile: 499, spritesheet: 'secondary' },
    { x: 36, y: 5, tile: 499, spritesheet: 'secondary' },
    { x: 30, y: 17, tile: 499, spritesheet: 'secondary' },
    { x: 7, y: 30, tile: 499, spritesheet: 'secondary' },
    
    // Animales decorativos
    { x: 43, y: 28, tile: 53, spritesheet: 'dog', zIndex: 10 },

    // Fuentes
    ...renderFuentesAlargadas([[21, 28], [30, 28], [21, 31], [30, 31]]),
    ...FUENTE_ESPECIAL(25, 28),
    ...renderTiles(230, [[32, 15]]),

    // Baldosas
    ...renderTiles(238, [[30, 12], [31, 12], [30, 13], [33, 12], [34, 12], [30, 18], [33, 19], [34, 19], [34, 18], [34, 13]]),

    // Vehículos
    ...renderCoches(COCHE_VERDE_DERECHA, [[26, 17]]),
    ...renderCoches(COCHE_NARANJA_DERECHA, [[26, 13]]),

    // Vallas
    ...renderTiles(356, [[13, 2]]),
  ], []);

  return { OBJECTS };
}
