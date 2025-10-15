
// ============================================================
// 1. IMPORTACIONES PRINCIPALES
// ============================================================

import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ============================================================
// 2. MONTAJE DE LA APLICACIÓN EN EL DOM
// ============================================================

// Este bloque monta el componente principal <App /> en el elemento raíz del HTML.
ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);
