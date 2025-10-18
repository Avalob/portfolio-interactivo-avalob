import React from 'react';
import Tile from './Tile';
import CarsManager from './CarsManager';
import { MAP, TILE_SIZE, AVATAR_SPRITES, NPC_SPRITES, OBRERO_SPRITES, FERNANDO_SPRITES, PEDRO_SPRITES, FAROLILLOS, SEMAFOROS } from '../utils/mapConfig';
import { VENTANAS_ILUMINADAS } from '../utils/mapConstants';

export function MapRenderer({
  WIDTH,
  cameraOffsetX,
  cameraOffsetY,
  EDIFICIOS_RENDER,
  OBJECTS,
  enEdificio,
  avatar,
  isOverlappingNPC,
  npc,
  obrero,
  fernando,
  pedro,
  isDarkMode,
  isMobileDevice,
  carsPositionsRef,
  CARS_CONFIG
}) {
  const TILES_SECUNDARIOS = new Set([511, 743, 744, 745, 706, 707, 708, 748, 746, 821, 747, 710, 711, 709, 820, 822]);

  return (
    <div 
      className="tilemap-canvas"
      style={{
        left: -cameraOffsetX,
        top: -cameraOffsetY,
        width: WIDTH * TILE_SIZE,
        height: MAP.length * TILE_SIZE
      }}
    >
      {/* Capa 1: Mapa base */}
      {MAP.map((row, y) => (
        <div key={y} className="tilemap-row">
          {row.map((tile, x) => {
            const spritesheet = TILES_SECUNDARIOS.has(tile) ? 'secondary' : 'main';
            return (
              <Tile 
                key={x}
                index={tile} 
                size={TILE_SIZE}
                className="tilemap-tile"
                spritesheet={spritesheet}
              />
            );
          })}
        </div>
      ))}

      {/* Capa 2: Edificios */}
      {EDIFICIOS_RENDER.map((obj, i) => (
        typeof obj.tile !== "undefined" && (
          <div
            key={`edificio-${obj.x}-${obj.y}-${i}`}
            className={`tilemap-edificio${obj.flip ? ' flip-x' : ''}`}
            style={{ left: obj.x * TILE_SIZE, top: obj.y * TILE_SIZE, position: 'absolute' }}
          >
            <Tile 
              index={obj.tile} 
              size={TILE_SIZE} 
              flip={obj.flip}
              spritesheet={obj.spritesheet || 'main'}
            />
          </div>
        )
      ))}

      {/* Capa 3: Objetos decorativos */}
      {OBJECTS.map((obj, i) => {
        const isFarola = obj.tile && [169, 196, 164, 191, 165, 192].includes(obj.tile);
        const isSemaforo = obj.tile && [409].includes(obj.tile);
        const isSenal = obj.tile && [166, 193, 167, 194].includes(obj.tile);
        const cssClass = isFarola ? 'tilemap-farola' : (isSemaforo || isSenal) ? 'tilemap-semaforo' : 'tilemap-objeto';
        
        return (
          <React.Fragment key={`objeto-${obj.x}-${obj.y}-${i}`}>
            {typeof obj.tile !== "undefined" && (
              <div
                className={`${cssClass}${obj.rotate ? ' rotate' + obj.rotate : ''}`}
                style={{ 
                  left: obj.x * TILE_SIZE, 
                  top: obj.y * TILE_SIZE, 
                  position: 'absolute',
                  zIndex: obj.zIndex || undefined
                }}
              >
                {obj.image ? (
                  <img
                    src={`${import.meta.env.BASE_URL}Tiles/${obj.image}`}
                    width={TILE_SIZE}
                    height={TILE_SIZE}
                    style={{ display: 'block', imageRendering: 'pixelated' }}
                    alt=""
                  />
                ) : (
                  <Tile 
                    index={obj.tile} 
                    size={TILE_SIZE} 
                    flip={obj.flip}
                    spritesheet={obj.spritesheet || 'main'}
                  />
                )}
              </div>
            )}
            {obj.text && (
              <span
                className={`tilemap-cartel
                  ${obj.neon ? ' neon-sign' : ''}
                  ${obj.letter ? ' neon-letter' : ''}
                  ${obj.compact ? ' neon-compact' : ''}
                  ${obj.colorClass ? ' ' + obj.colorClass : ''}`}
                style={{
                  left: obj.x * TILE_SIZE + (obj.tiles ? (TILE_SIZE * obj.tiles) / 2 : (TILE_SIZE * 3) / 2),
                  top: obj.y * TILE_SIZE + TILE_SIZE / 2,
                  width: obj.tiles ? TILE_SIZE * obj.tiles * 0.9 : TILE_SIZE * 3 * 0.9,
                  height: TILE_SIZE * 0.85,
                }}
              >
                {obj.text.toUpperCase()}
              </span>
            )}
          </React.Fragment>
        );
      })}

      {/* Capa 4: Efectos de luz */}
      {FAROLILLOS.map((f, idx) => (
        <div
          key={`farolillo-${idx}`}
          className="tilemap-farolillo"
          style={{ left: f.x * TILE_SIZE + TILE_SIZE / 2 - 4, top: f.y * TILE_SIZE + TILE_SIZE / 2 - 4 }}
        />
      ))}

      {SEMAFOROS.map((sem, idx) => (
        <div
          key={`traffic-light-${idx}`}
          className="tilemap-semaforo-light"
          style={{
            left: sem.x * TILE_SIZE + TILE_SIZE / 2 - 2,
            top: sem.y * TILE_SIZE + 8
          }}
        />
      ))}

      {/* Ventanas iluminadas */}
      {!isMobileDevice && VENTANAS_ILUMINADAS.map((ventana, i) => (
        <div
          key={`window-${i}`}
          className="tilemap-window"
          style={{
            left: ventana.x * TILE_SIZE + (TILE_SIZE - ventana.width) / 2,
            top: ventana.y * TILE_SIZE + (TILE_SIZE - ventana.height) / 2,
            width: ventana.width,
            height: ventana.height
          }}
        />
      ))}

      {/* Avatar */}
      {!enEdificio && (
        <Tile
          index={AVATAR_SPRITES[avatar.dir][avatar.step]}
          size={TILE_SIZE}
          spritesheet="avatar"
          className={`tilemap-avatar ${avatar.teleporting ? 'teleporting' : ''} ${isOverlappingNPC ? 'overlapping-npc' : ''}`}
          style={{
            left: avatar.x * TILE_SIZE + TILE_SIZE / 2,
            top: avatar.y * TILE_SIZE,
          }}
        />
      )}

      {/* NPCs */}
      <Tile
        index={NPC_SPRITES[npc.dir][npc.moving ? npc.step : 0]}
        size={TILE_SIZE}
        spritesheet="npc"
        className="tilemap-npc"
        style={{
          left: npc.x * TILE_SIZE + TILE_SIZE / 2,
          top: npc.y * TILE_SIZE,
        }}
      />
      {npc.showPhrase && (
        <div
          className="npc-bubble"
          style={{
            left: `calc(${npc.x * TILE_SIZE}px + ${TILE_SIZE / 2}px)`,
            top: `${npc.y * TILE_SIZE - 10}px`
          }}
        >
          {npc.phrase}
          <div className="npc-bubble-triangle" />
        </div>
      )}

      {/* Pedro */}
      <div
        className="tilemap-npc pedro"
        style={{
          position: 'absolute',
          left: pedro.x * TILE_SIZE + TILE_SIZE / 2,
          top: pedro.y * TILE_SIZE,
        }}
      >
        <Tile
          index={PEDRO_SPRITES[pedro.dir][pedro.moving ? pedro.step : 0]}
          size={TILE_SIZE}
          spritesheet="pedro"
        />
      </div>
      {pedro.showPhrase && (
        <div
          className="npc-bubble pedro-bubble"
          style={{
            left: `calc(${pedro.x * TILE_SIZE}px + ${TILE_SIZE / 2}px)`,
            top: `${pedro.y * TILE_SIZE - 10}px`
          }}
        >
          {pedro.phrase}
          <div className="npc-bubble-triangle" />
        </div>
      )}

      {/* Obrero */}
      <div
        className="tilemap-npc obrero"
        style={{
          position: 'absolute',
          left: obrero.x * TILE_SIZE + TILE_SIZE / 2,
          top: obrero.y * TILE_SIZE,
        }}
      >
        <Tile
          index={OBRERO_SPRITES[obrero.dir][obrero.moving ? obrero.step : 0]}
          size={TILE_SIZE}
          spritesheet="obrero"
        />
      </div>
      {obrero.showPhrase && (
        <div
          className="npc-bubble"
          style={{
            left: `calc(${obrero.x * TILE_SIZE}px + ${TILE_SIZE / 2}px)`,
            top: `${obrero.y * TILE_SIZE - 10}px`
          }}
        >
          {obrero.phrase}
          <div className="npc-bubble-triangle" />
        </div>
      )}

      {/* Fernando */}
      <div
        className="tilemap-npc fernando"
        style={{
          position: 'absolute',
          left: fernando.x * TILE_SIZE + TILE_SIZE / 2,
          top: fernando.y * TILE_SIZE,
        }}
      >
        <Tile
          index={FERNANDO_SPRITES[fernando.dir][fernando.moving ? fernando.step : 0]}
          size={TILE_SIZE}
          spritesheet="fernando"
        />
      </div>
      {fernando.showPhrase && (
        <div
          className="npc-bubble fernando-bubble"
          style={{
            left: `calc(${fernando.x * TILE_SIZE}px + ${TILE_SIZE / 2}px)`,
            top: `${fernando.y * TILE_SIZE - 10}px`
          }}
        >
          {fernando.phrase}
          <div className="npc-bubble-triangle" />
        </div>
      )}

      {/* Coches */}
      <CarsManager
        carsConfigs={CARS_CONFIG}
        avatar={avatar}
        tileSize={TILE_SIZE}
        isNightMode={isDarkMode}
        carsPositionsRef={carsPositionsRef}
      />
    </div>
  );
}
