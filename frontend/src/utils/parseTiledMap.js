// Script para parsear el mapa de Tiled (sample-map.tmx) y exportar la matriz JS
// Solo para desarrollo: ejecuta este script para actualizar la matriz MAP
const fs = require('fs');
const path = require('path');

const TMX_PATH = path.join(__dirname, '../../public/Tiled/sample-map.tmx');
const OUTPUT_PATH = path.join(__dirname, './tiledMapData.js');

function extractLayerCSV(xml, layerName) {
	// Busca la capa por nombre y extrae el CSV
	const regex = new RegExp(`<layer[^>]*name=\"${layerName}\"[\s\S]*?<data encoding=\"csv\">([\s\S]*?)<\\/data>`, 'm');
	const match = xml.match(regex);
	if (!match) throw new Error('No se encontró la capa ' + layerName);
	return match[1].replace(/\s+/g, '').replace(/,$/, '');
}

function csvToMatrix(csv, width) {
	const arr = csv.split(',').map(Number);
	const matrix = [];
	for (let i = 0; i < arr.length; i += width) {
		matrix.push(arr.slice(i, i + width));
	}
	return matrix;
}

function main() {
	const xml = fs.readFileSync(TMX_PATH, 'utf8');
	// Extrae dimensiones (comillas dobles normales)
	const width = Number(xml.match(/width="(\d+)"/)[1]);
	const height = Number(xml.match(/height="(\d+)"/)[1]);
	const terrainCSV = extractLayerCSV(xml, 'Terrain');
	const terrainMatrix = csvToMatrix(terrainCSV, width);
	// Exporta como módulo JS
	const out = `// Generado automáticamente desde sample-map.tmx\nexport const WIDTH = ${width};\nexport const HEIGHT = ${height};\nexport const MAP = ${JSON.stringify(terrainMatrix, null, 2)};\n`;
	fs.writeFileSync(OUTPUT_PATH, out);
}

if (require.main === module) main();
