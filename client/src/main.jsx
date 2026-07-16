import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Fonts must load before index.css so the font-face declarations exist
// before any component renders text with them. See lib/fonts.js for why
// these are all local imports and never a CDN request.
import "./lib/fonts.js";
import "./index.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
