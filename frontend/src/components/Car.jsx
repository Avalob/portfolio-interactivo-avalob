// === Car.jsx ===
// Renderiza el NPC de coche con luces, bocina y animaciones según la dirección actual.

import PropTypes from 'prop-types';

const Car = ({ x, y, direction, currentSprites, showHorn, tileSize, hornMessage = '🚗 ¡PI PIIII!', isNightMode = false }) => {
  // --- Cálculos previos ---
  const isHorizontal = direction === 'left' || direction === 'right';
  const width = isHorizontal ? tileSize * 2 : tileSize;

  // --- Render principal ---
  return (
    <div
      className="car-npc"
      style={{
        position: 'absolute',
        left: `${x * tileSize}px`,
        top: `${y * tileSize}px`,
        width: `${width}px`,
        height: `${tileSize}px`,
        zIndex: 3,
        transition: 'left 0.15s linear, top 0.15s linear',
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    >
      {currentSprites.map((sprite, index) => (
        <img
          key={index}
          src={`${import.meta.env.BASE_URL}Tiles/tile_${sprite.toString().padStart(4, '0')}.png`}
          alt={`car-${direction}`}
          className={`car-sprite car-${direction}`}
          style={{
            position: 'absolute',
            left: `${index * tileSize}px`,
            top: 0,
            width: `${tileSize}px`,
            height: `${tileSize}px`,
            imageRendering: 'pixelated',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        />
      ))}

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
};

// --- PropTypes ---
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

export default Car;
