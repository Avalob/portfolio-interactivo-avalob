import {
  NPC_PHRASES,
  NPC_BUILDING_PHRASES,
  PEDRO_PHRASES,
  OBRERO_PHRASES,
  FERNANDO_PHRASES
} from './mapConfig';

export const getContextualNPCPhrase = (visitedBuildings, isDarkMode, lastBuildingVisited) => {
  // Modo noche
  if (isDarkMode) {
    return "Qué bonita está la ciudad de noche, ¿verdad?";
  }
  
  // Acaba de salir de un edificio específico 
  if (lastBuildingVisited && NPC_BUILDING_PHRASES[lastBuildingVisited]) {
    const buildingPhrases = NPC_BUILDING_PHRASES[lastBuildingVisited];
    return buildingPhrases[Math.floor(Math.random() * buildingPhrases.length)];
  }
  
  // Frase aleatoria normal
  return NPC_PHRASES[Math.floor(Math.random() * NPC_PHRASES.length)];
};


export const getObreroPhrase = () => {
  return OBRERO_PHRASES[Math.floor(Math.random() * OBRERO_PHRASES.length)];
};

export const getFernandoPhrase = () => {
  return FERNANDO_PHRASES[Math.floor(Math.random() * FERNANDO_PHRASES.length)];
};

export const getPedroPhrase = () => {
  return PEDRO_PHRASES[Math.floor(Math.random() * PEDRO_PHRASES.length)];
};