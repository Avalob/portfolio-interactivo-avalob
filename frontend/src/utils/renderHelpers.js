// ============================================================
// RENDER HELPERS - Funciones auxiliares para renderizar decoraciones
// ============================================================

/**
 * Renderiza elementos aplicando una función con un solo parámetro
 */
export const renderSingleParamFunc = (func, coords) => 
  coords.map(([x, y]) => func(x, y));

/**
 * Renderiza tiles simples en las coordenadas especificadas
 */
export const renderTiles = (tile, coords) => 
  coords.map(([x, y]) => ({ x, y, tile }));

/**
 * Renderiza ventanas estándar
 */
export const renderVentanas = (coords) => 
  coords.flatMap(([x, y]) => VENTANA(x, y));

/**
 * Renderiza ventanas tipo 338
 */
export const renderVentanas338 = (coords) => 
  coords.map(([x, y]) => VENTANA_338(x, y));

/**
 * Renderiza ventanas tipo 363
 */
export const renderVentanas363 = (coords) => 
  coords.map(([x, y]) => VENTANA_363(x, y));

/**
 * Renderiza ventanas simples (alias de renderVentanas)
 */
export const renderVentanasSimples = (coords) => 
  coords.flatMap(([x, y]) => VENTANA(x, y));

/**
 * Renderiza ventanas cuadradas
 */
export const renderVentanasCuadradas = (coords) => 
  coords.flatMap(([x, y]) => VENTANA_CUADRADA(x, y));

/**
 * Renderiza ventanas tipo 417_446_473
 */
export const renderVentanas417_446_473 = (coords) => 
  coords.flatMap(([x, y]) => VENTANA_417_446_473(x, y));

/**
 * Renderiza ventanas tipo 418_473
 */
export const renderVentanas418_473 = (coords) => 
  coords.flatMap(([x, y]) => VENTANA_418_473(x, y));

/**
 * Renderiza ventanas tipo 418_446_473
 */
export const renderVentanas418_446_473 = (coords) => 
  coords.flatMap(([x, y]) => VENTANA_418_446_473(x, y));

/**
 * Renderiza árboles individuales
 */
export const renderArboles = (coords) => 
  coords.flatMap(([x, y]) => ARBOL(x, y));

/**
 * Renderiza árboles triples
 */
export const renderArbolesTriples = (coords) => 
  coords.flatMap(([x, y]) => ARBOL_TRIPLE(x, y));

/**
 * Renderiza farolas dobles
 */
export const renderFarolasDobles = (coords) => 
  coords.flatMap(([x, y]) => FAROLA_DOBLE(x, y));

/**
 * Renderiza semáforos (con flip opcional)
 */
export const renderSemaforos = (coords) => 
  coords.flatMap(([x, y, flip]) => SEMAFORO(x, y, flip));

/**
 * Renderiza toldos
 */
export const renderToldos = (coords) => 
  coords.flatMap(([x, y]) => TOLDO(x, y));

/**
 * Renderiza elementos con función simple
 */
export const renderSimpleFunc = (func, coords) => 
  coords.map(([x, y]) => func(x, y));

/**
 * Renderiza fuentes alargadas
 */
export const renderFuentesAlargadas = (coords) => 
  coords.flatMap(([x, y]) => FUENTE_ALARGADA(x, y));

/**
 * Renderiza coches
 */
export const renderCoches = (func, coords) => 
  coords.flatMap(([x, y]) => func(x, y));

/**
 * Renderiza farolas grises (con flip opcional)
 */
export const renderFarolas = (coords) => 
  coords.flatMap(([x, y, flip]) => FAROLA_GRIS(x, y, flip));

/**
 * Renderiza farolas verdes
 */
export const renderFarolaVerde = (coords) => 
  coords.flatMap(([x, y]) => FAROLA_VERDE(x, y));

// Importaciones necesarias para las funciones
import {
  VENTANA, VENTANA_338, VENTANA_363,
  VENTANA_417_446_473, VENTANA_418_473, VENTANA_418_446_473,
  VENTANA_CUADRADA,
  ARBOL, ARBOL_TRIPLE,
  FAROLA_DOBLE, FAROLA_GRIS, FAROLA_VERDE,
  SEMAFORO,
  TOLDO,
  FUENTE_ALARGADA
} from './mapDecorators';
