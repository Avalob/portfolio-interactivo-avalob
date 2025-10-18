// ============================================================
// 1. IMPORTACIONES Y DEPENDENCIAS PRINCIPALES
// ============================================================
import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Car from './Car';
import { useCarMovement } from '../hooks/useCarMovement';

// ============================================================
// 2. COMPONENTE CarNPC: GESTIÓN DE SPAWN Y CICLO DE VIDA DE CADA COCHE
// ============================================================
const CarNPC = ({ carConfig, avatar, otherCarsRef, tileSize, isNightMode }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const positionRef = useRef({ x: carConfig.path[0][0], y: carConfig.path[0][1], isActive: false });

  // Obtiene la lista de otros coches activos, excluyendo el actual
  const getOtherCars = useCallback(() => {
    const allCars = otherCarsRef.current || [];
    return allCars.filter(c => c.id !== carConfig.id);
  }, [carConfig.id, otherCarsRef]);

  // Esta función se ejecuta cuando el coche termina su recorrido y debe respawnear
  const handleComplete = useCallback(() => {
    positionRef.current.isActive = false;
    setShouldRender(false);
    const respawnDelay = carConfig.respawnDelay;
    // Calcula el delay de respawn (puede ser fijo o aleatorio)
    const delay = typeof respawnDelay === 'object' 
      ? Math.random() * (respawnDelay.max - respawnDelay.min) + respawnDelay.min
      : respawnDelay || 10000;
    setTimeout(() => {
      setShouldRender(true);
      positionRef.current.isActive = true;
    }, delay);
  }, [carConfig.respawnDelay]);

  // Efecto para el spawn inicial del coche (puede tener delay aleatorio)
  useEffect(() => {
    const spawnDelay = carConfig.spawnDelay || 0;
    const initialDelay = carConfig.randomSpawn && typeof carConfig.respawnDelay === 'object'
      ? Math.random() * (carConfig.respawnDelay.max - carConfig.respawnDelay.min)
      : spawnDelay;
    const timer = setTimeout(() => {
      setShouldRender(true);
      positionRef.current.isActive = true;
    }, initialDelay);
    return () => clearTimeout(timer);
  }, [carConfig.spawnDelay, carConfig.randomSpawn, carConfig.respawnDelay]);

  if (!shouldRender) return null;

  return (
    <CarMoving
      carConfig={carConfig}
      avatar={avatar}
      otherCarsRef={otherCarsRef}
      tileSize={tileSize}
      getOtherCars={getOtherCars}
      onComplete={handleComplete}
      positionRef={positionRef}
      isNightMode={isNightMode}
    />
  );
};

// ============================================================
// 3. COMPONENTE CarMoving: GESTIÓN DE MOVIMIENTO Y ESTADO DE CADA COCHE
// ============================================================
const CarMoving = ({ carConfig, avatar, otherCarsRef, tileSize, getOtherCars, onComplete, positionRef, isNightMode }) => {
  const carState = useCarMovement({
    path: carConfig.path,
    speed: carConfig.speed,
    sprites: carConfig.sprites,
    avatar,
    otherCars: getOtherCars(),
    onComplete,
  });

  // Sincroniza la posición del coche en el ref global compartido (sin provocar re-render)
  useEffect(() => {
    if (carState.isActive) {
      positionRef.current = {
        id: carConfig.id,
        x: carState.x,
        y: carState.y,
        isActive: carState.isActive,
      };
      if (otherCarsRef.current) {
        const index = otherCarsRef.current.findIndex(c => c.id === carConfig.id);
        if (index >= 0) {
          otherCarsRef.current[index] = positionRef.current;
        } else {
          otherCarsRef.current.push(positionRef.current);
        }
      }
    }
  }, [carState.x, carState.y, carState.isActive, carConfig.id, otherCarsRef, positionRef]);

  if (!carState.isActive) return null;

  // Renderiza el componente visual del coche en su posición actual
  return (
    <Car
      x={carState.x}
      y={carState.y}
      direction={carState.direction}
      currentSprites={carState.currentSprites}
      showHorn={carState.showHorn}
      tileSize={tileSize}
      hornMessage={carConfig.hornMessage}
      isNightMode={isNightMode}
    />
  );
};

CarNPC.propTypes = {
  carConfig: PropTypes.object.isRequired,
  avatar: PropTypes.object.isRequired,
  otherCarsRef: PropTypes.object.isRequired,
  tileSize: PropTypes.number.isRequired,
  isNightMode: PropTypes.bool,
};

CarMoving.propTypes = {
  carConfig: PropTypes.object.isRequired,
  avatar: PropTypes.object.isRequired,
  otherCarsRef: PropTypes.object.isRequired,
  tileSize: PropTypes.number.isRequired,
  getOtherCars: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  positionRef: PropTypes.object.isRequired,
  isNightMode: PropTypes.bool,
};

// ============================================================
// 4. COMPONENTE CarsManager: ORQUESTA TODOS LOS COCHES NPC
// ============================================================
const CarsManager = ({ carsConfigs, avatar, tileSize, isNightMode, carsPositionsRef }) => {
  const carsStateRef = useRef([]);

  // Sincroniza el estado global de posiciones de coches con el ref externo
  useEffect(() => {
    if (carsPositionsRef) {
      carsPositionsRef.current = carsStateRef.current;
    }
  });

  // Renderiza todos los coches NPC definidos en carsConfigs
  return (
    <>
      {carsConfigs.map(carConfig => (
        <CarNPC
          key={carConfig.id}
          carConfig={carConfig}
          avatar={avatar}
          otherCarsRef={carsStateRef}
          tileSize={tileSize}
          isNightMode={isNightMode}
        />
      ))}
    </>
  );
};

CarsManager.propTypes = {
  carsConfigs: PropTypes.array.isRequired,
  avatar: PropTypes.object.isRequired,
  tileSize: PropTypes.number.isRequired,
  isNightMode: PropTypes.bool,
  carsPositionsRef: PropTypes.object,
};

// ============================================================
// 5. EXPORTACIÓN PRINCIPAL
// ============================================================
export default CarsManager;
