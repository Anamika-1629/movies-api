// src/main.jsx
// Vite entry point — mounts the React app into index.html's #root div.
// BrowserRouter wraps everything so React Router can manage URLs.

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // baseline browser resets — loaded before everything else

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);