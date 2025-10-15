
// ============================================================
// 1. IMPORTACIONES PRINCIPALES
// ============================================================

import TileMapPNG from "./components/TileMapPNG";

// ============================================================
// 2. COMPONENTE PRINCIPAL DE LA APLICACIÓN
// ============================================================

// Este componente define el layout principal del portfolio interactivo.
// Aquí se envuelve el mapa de la ciudad y se establecen roles de accesibilidad.
export default function App() {
  return (
    <div
      className="min-h-screen"
      role="main"
      aria-label="Portfolio Andrea Valbuena"
    >
      {/* Renderiza el mapa interactivo principal */}
      <TileMapPNG />
    </div>
  );
}

