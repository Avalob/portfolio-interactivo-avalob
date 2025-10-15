// =============================
// COMPONENTE PRINCIPAL DE LA APP
// =============================
// Este componente envuelve el mapa interactivo y define el layout principal del portfolio.

import { StrictMode } from "react";
import TileMapPNG from "./components/TileMapPNG";

export default function App() {
  return (
    <div 
      className="min-h-screen" 
      role="main"
      aria-label="Portfolio Andrea Valbuena"
    >
      {/* Mapa interactivo de la ciudad */}
      <TileMapPNG />
    </div>
  );
}

