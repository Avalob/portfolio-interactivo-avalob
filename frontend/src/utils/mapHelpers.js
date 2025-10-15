// utils/mapHelpers.js
// Helpers y constantes para la construcción de edificios y objetos decorativos en el mapa
// Modulariza y reutiliza lógica de TileMapPNG.jsx

// Tamaño de cada tile en píxeles
export const TILE_SIZE = 16;

// Sprites de avatar y NPCs
export const AVATAR_SPRITES = {
  down:  [105, 159],
  up:    [106, 160],
  right: [107, 161],
  left:  [104, 131],
};

export const NPC_SPRITES = {
  right: [431, 458, 485],
  left:  [428, 455, 482],
  down:  [429, 456, 483],
  up:    [430, 457, 484],
};

// Helper para crear edificios a partir de una matriz de tiles
export function crearEdificio(tiles) {
  return (x0, y0) => {
    const arr = [];
    for (let y = 0; y < tiles.length; y++) {
      for (let x = 0; x < tiles[y].length; x++) {
        arr.push({ x: x0 + x, y: y0 + y, tile: tiles[y][x] });
      }
    }
    return arr;
  };
}

// Helpers para objetos decorativos
export const PUERTA = (x, y) => ({ x, y, tile: 255 });
export const PUERTA_DOBLE = (x, y) => [{ x, y, tile: 312 }];
export const PUERTA1 = (x, y) => ({ x, y, tile: 255 });

export const SEMAFORO = (x, y, flip = false) => [
  { x, y, tile: 409, flip },
  { x, y: y + 1, tile: 191, flip }
];
export const TOLDO = (x, y) => [
  { x, y, tile: 328 },
  { x: x + 1, y, tile: 330 }
];
export const FAROLA_VERDE = (x, y) => [
  { x, y, tile: 169 },
  { x, y: y + 1, tile: 196 }
];
export const VENTANA_ALARGADA_REDONDO = (x, y) => [
  { x, y, tile: 169 },
  { x, y: y + 1, tile: 473 }
];
export const FAROLA_GRIS = (x, y, flip = false) => [
  { x, y, tile: 164, flip },
  { x, y: y + 1, tile: 191, flip }
];
export const FAROLA_DOBLE = (x, y) => [
  { x, y, tile: 165 },
  { x, y: y + 1, tile: 192 }
];
export const LAGO = (x, y) => [
  { x, y, tile: 227 },
  { x: x + 1, y, tile: 228 },
  { x: x + 2, y, tile: 228 },
  { x: x + 3, y, tile: 229 }
];
export const STOP = (x, y) => [
  { x, y, tile: 166 },
  { x, y: y + 1, tile: 193 }
];
export const CARTELITOS = (x, y) => [
  { x, y, tile: 167 },
  { x, y: y + 1, tile: 194 }
];
