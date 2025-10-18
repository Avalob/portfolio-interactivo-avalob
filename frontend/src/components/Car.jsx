// ============================================================
// 1. IMPORTACIÓN DE DEPENDENCIAS
// ============================================================
import PropTypes from 'prop-types';
import Tile from './Tile';

// ============================================================
// 2. COMPONENTE PRINCIPAL
// ============================================================
function Car({ x, y, direction, currentSprites, showHorn, tileSize, hornMessage, isNightMode }) {
  // Calcula el ancho del coche según la cantidad de sprites
  const width = currentSprites.length * tileSize;

  // Estilo base del coche
  const carStyle = {
    position: 'absolute',
    left: `${x * tileSize}px`,
    top: `${y * tileSize}px`,
    width: `${width}px`,
    height: `${tileSize}px`,
    zIndex: 3,
    transition: 'left 0.15s linear, top 0.15s linear',
    willChange: 'transform',
    transform: 'translateZ(0)',
  };

  return (
    <div style={carStyle}>
      {/* Renderiza los sprites del coche según la dirección y frame actual */}
      {currentSprites.map((sprite, index) => (
        <Tile
          key={index}
          index={sprite}
          size={tileSize}
          className={`car-sprite car-${direction}`}
          style={{
            position: 'absolute',
            left: `${index * tileSize}px`,
            top: 0,
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        />
      ))}

      {/* Luces delanteras según modo noche y dirección */}
      {isNightMode && direction === 'right' && (
        <div
          className="car-headlight"
          style={{
            position: 'absolute',
            left: `${width + 2}px`,
            top: `${tileSize / 2 - 4}px`,
            width: '28px',
            height: '10px',
            borderRadius: '50%',
            boxShadow: '0 0 12px 6px rgba(255, 255, 200, 0.5), 0 0 24px 12px rgba(255, 240, 150, 0.3)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      )}
      {isNightMode && direction === 'left' && (
        <div
          className="car-headlight"
          style={{
            position: 'absolute',
            left: '-30px',
            top: `${tileSize / 2 - 4}px`,
            width: '28px',
            height: '10px',
            borderRadius: '50%',
            boxShadow: '0 0 12px 6px rgba(255, 255, 200, 0.5), 0 0 24px 12px rgba(255, 240, 150, 0.3)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      )}
      {isNightMode && direction === 'up' && (
        <div
          className="car-headlight"
          style={{
            position: 'absolute',
            left: `${tileSize / 2 - 5}px`,
            top: '-24px',
            width: '10px',
            height: '24px',
            borderRadius: '50%',
            boxShadow: '0 0 12px 6px rgba(255, 255, 200, 0.5), 0 0 24px 12px rgba(255, 240, 150, 0.3)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      )}
      {isNightMode && direction === 'down' && (
        <div
          className="car-headlight"
          style={{
            position: 'absolute',
            left: `${tileSize / 2 - 5}px`,
            top: `${tileSize + 2}px`,
            width: '10px',
            height: '24px',
            borderRadius: '50%',
            boxShadow: '0 0 12px 6px rgba(255, 255, 200, 0.5), 0 0 24px 12px rgba(255, 240, 150, 0.3)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      )}

      {/* Bocina animada sobre el coche cuando showHorn es true */}
      {showHorn && (
        <div
          className="car-horn-bubble"
          style={{
            position: 'absolute',
            top: '-42px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#ffeb3b',
            border: '2px solid #333',
            borderRadius: '12px',
            padding: '8px 14px',
            fontSize: '15px',
            fontWeight: 900,
            color: '#000',
            whiteSpace: 'nowrap',
            boxShadow: '0 0 10px rgba(255, 235, 59, 0.6), 0 3px 8px rgba(0,0,0,0.25)',
            animation: 'hornShake 0.1s ease-in-out infinite, hornPulse 0.2s ease-in-out infinite',
            zIndex: 1000,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}
        >
          {hornMessage}
          <div
            style={{
              position: 'absolute',
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #ffeb3b',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '9px solid transparent',
              borderRight: '9px solid transparent',
              borderTop: '9px solid #333',
            }}
          />
        </div>
      )}
    </div>
  );
}

// ============================================================
// 3. PROPTYPES DEL COMPONENTE
// ============================================================
Car.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']).isRequired,
  currentSprites: PropTypes.arrayOf(PropTypes.number).isRequired,
  showHorn: PropTypes.bool,
  tileSize: PropTypes.number.isRequired,
  hornMessage: PropTypes.string,
  isNightMode: PropTypes.bool,
};

// ============================================================
// 4. EXPORTACIÓN PRINCIPAL
// ============================================================
export default Car;
