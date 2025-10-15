// =============================
// ENTRADA PRINCIPAL DE LA APP
// =============================
// Este archivo monta el componente principal App en el DOM raíz.

import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Monta la aplicación en el elemento con id 'root'.
ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);
