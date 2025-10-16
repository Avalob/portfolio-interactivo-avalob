/**
 * Componente Tile - Renderiza un tile individual desde un spritesheet
 * 
 * @param {number} index - Índice del tile en el spritesheet
 * @param {number} size - Tamaño del tile en píxeles (por defecto 16px)
 * @param {boolean} flip - Si el tile debe voltearse horizontalmente
 * @param {string} className - Clases CSS adicionales
 * @param {object} style - Estilos CSS adicionales
 * @param {string} spritesheet - Nombre del spritesheet a usar: 'main' (27x18) o 'secondary' (37x28)
 */
function Tile({ 
  index, 
  size = 16, 
  flip = false, 
  className = '', 
  style: customStyle = {},
  spritesheet = 'main' 
}) {
  // Configuración de spritesheets
  const SPRITESHEETS = {
    main: {
      cols: 27,
      rows: 18,
      file: 'spritesheet.png'
    },
    secondary: {
      cols: 37,
      rows: 28,
      file: 'spritesheet2.png' // o el nombre que tenga tu segundo spritesheet
    }
  };

  const config = SPRITESHEETS[spritesheet] || SPRITESHEETS.main;
  
  // Calcular posición en el spritesheet
  const col = index % config.cols;
  const row = Math.floor(index / config.cols);
  
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundImage: `url(${import.meta.env.BASE_URL}Tiles/${config.file})`,
    backgroundPosition: `-${col * size}px -${row * size}px`,
    backgroundSize: `${config.cols * size}px auto`,
    backgroundRepeat: 'no-repeat',
    imageRendering: 'pixelated',
    display: 'inline-block',
    verticalAlign: 'top',
    // Forzar flip booleano
    transform: !!flip ? 'scaleX(-1)' : 'none',
    pointerEvents: 'none',
    fontSize: 0,
    lineHeight: 0,
    ...customStyle, // Permite sobrescribir estilos
  };
  
  return <div style={style} className={className} />;
}

export default Tile;
