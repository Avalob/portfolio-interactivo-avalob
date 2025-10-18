/**
 * Componente Tile - Renderiza un tile individual desde un spritesheet
 * Ajustado para que ningún personaje sobresalga hacia arriba.
 */

function Tile({ 
  index, 
  size = 16, 
  flip = false, 
  className = '', 
  style: customStyle = {},
  spritesheet = 'main',
  offsetYExtra = 0,
  heightScale = 1.2
}) {
  const SPRITESHEETS = {
    main: {
      cols: 27,
      rows: 18,
      file: 'Tiles/spritesheet.png',
      frameWidth: size,
      frameHeight: size
    },
    secondary: {
      cols: 37,
      rows: 28,
      file: 'Tiles/spritesheet2.png',
      frameWidth: size,
      frameHeight: size
    },
    avatar: {
      cols: 4,
      rows: 3,
      file: 'Tiles/Avatar.png',
      frameWidth: 38,
      frameHeight: 72,
      realFrameWidth: 64,
      realFrameHeight: 96
    },
    obrero: {
      cols: 4,
      rows: 3,
      file: 'Tiles/Obrero.png',
      frameWidth: 38,
      frameHeight: 72,
      realFrameWidth: 64,
      realFrameHeight: 96
    },
    pedro: {
      cols: 4,
      rows: 3,
      file: 'Tiles/Pedro.png',
      frameWidth: 38,
      frameHeight: 72,
      realFrameWidth: 64,
      realFrameHeight: 96
    },
    fernando: {
      cols: 4,
      rows: 3,
      file: 'Tiles/Fernando.png',
      frameWidth: 38,
      frameHeight: 72,
      realFrameWidth: 64,
      realFrameHeight: 96
    },
    npc: {
      cols: 4,
      rows: 3,
      file: 'Tiles/Npc.png',
      frameWidth: 36,
      frameHeight: 72,
      realFrameWidth: 64,
      realFrameHeight: 96
    },
    
    dog: {
      cols: 16,
      rows: 10,
      file: 'Tiles/Animals.png',
      frameWidth: 32,
      frameHeight: 25.6,
      realFrameWidth: 32,
      realFrameHeight: 25.6
    }
  };

  const config = SPRITESHEETS[spritesheet] || SPRITESHEETS.main;
  const frameWidth = config.frameWidth;
  const frameHeight = config.frameHeight;
  const realFrameWidth = config.realFrameWidth || frameWidth;
  const realFrameHeight = config.realFrameHeight || frameHeight;
  const col = index % config.cols;
  const row = Math.floor(index / config.cols);

  // 🔹 Ajuste vertical base
  let offsetY = 0;
  if (['avatar', 'obrero', 'fernando', 'pedro', 'npc'].includes(spritesheet)) {
    offsetY = 0 - offsetYExtra;
  }
  const isCharacter = ['avatar', 'obrero', 'fernando', 'pedro', 'npc'].includes(spritesheet);
  const isAnimal = ['dog'].includes(spritesheet);
  let style;

  // Para personajes
  
  if (isCharacter) {
    const originalWidth = realFrameWidth;
    const originalHeight = realFrameHeight;
    const tileWidth = size;
    const tileHeight = size;
    const verticalScale = 1.15;
    const scale = (tileHeight / originalHeight) * verticalScale;
    const scaledWidth = originalWidth * (tileHeight / originalHeight);
    const bgSize = `${originalWidth * config.cols * scale}px ${originalHeight * config.rows * scale}px`;
    const bgPosX = -(col * originalWidth * scale);
    const bgPosY = -(row * originalHeight * scale);
    const horizontalOffset = (scaledWidth - tileWidth/2) * 0.35; 
    style = {
      width: `${scaledWidth}px`,
      height: `${tileHeight * verticalScale}px`,
      backgroundImage: `url(${import.meta.env.BASE_URL}${config.file})`,
      backgroundPosition: `${bgPosX - horizontalOffset}px ${bgPosY - (tileHeight * (verticalScale - 1))}px`,
      backgroundSize: bgSize,
      backgroundRepeat: 'no-repeat',
      imageRendering: 'pixelated',
      backgroundColor: 'transparent',
      display: 'block',
      position: 'absolute',
      left: customStyle.left !== undefined ? customStyle.left : '50%',
      top: customStyle.top !== undefined ? customStyle.top : `${offsetY}px`,
      transform: `translateX(-50%) scaleY(${verticalScale})${flip ? ' scaleX(-1)' : ''}`,
      transformOrigin: 'bottom center',
      pointerEvents: 'none',
      zIndex: 6, // Los personajes quedan por encima del suelo y objetos, pero debajo de bocadillos, topbar y modales
      fontSize: 0,
      lineHeight: 0,
      overflow: 'hidden',
      ...customStyle
    };
  } else if (isAnimal) {
    const originalWidth = realFrameWidth;
    const originalHeight = realFrameHeight;
    const tileWidth = size;
    const tileHeight = size;
    const verticalScale = 0.8; // Los animales son más pequeños
    const scale = (tileHeight / originalHeight) * verticalScale;
    const scaledWidth = originalWidth * scale;
    const scaledHeight = originalHeight * scale;
    const bgSize = `${originalWidth * config.cols * scale}px ${originalHeight * config.rows * scale}px`;
    // Centrado horizontal y pies en la base
    const bgPosX = (tileWidth - scaledWidth) / 2 - (col * originalWidth * scale);
    const bgPosY = tileHeight - scaledHeight;
    style = {
      width: `${tileWidth}px`,
      height: `${tileHeight}px`,
      backgroundImage: `url(${import.meta.env.BASE_URL}${config.file})`,
      backgroundPosition: `${bgPosX}px ${bgPosY}px`,
      backgroundSize: bgSize,
      backgroundRepeat: 'no-repeat',
      imageRendering: 'pixelated',
      backgroundColor: 'transparent',
      display: 'block',
      position: 'absolute',
      left: customStyle.left !== undefined ? customStyle.left : '50%',
      top: customStyle.top !== undefined ? customStyle.top : `${offsetY}px`,
      transform: `translateX(-50%)${flip ? ' scaleX(-1)' : ''}`,
      transformOrigin: 'bottom center',
      pointerEvents: 'none',
      zIndex: 6,
      fontSize: 0,
      lineHeight: 0,
      overflow: 'hidden',
      ...customStyle
    };
  } else {
    style = {
      width: `${frameWidth}px`,
      height: `${frameHeight}px`,
      backgroundImage: `url(${import.meta.env.BASE_URL}${config.file})`,
      backgroundPosition: `-${col * frameWidth}px -${row * frameHeight}px`,
      backgroundSize: `${config.cols * frameWidth}px auto`,
      backgroundRepeat: 'no-repeat',
      imageRendering: 'pixelated',
      display: 'inline-block',
      pointerEvents: 'none',
      fontSize: 0,
      lineHeight: 0,
      overflow: 'hidden',
      ...customStyle
    };
  }

  return <div style={style} className={className} />;
}

export default Tile;
