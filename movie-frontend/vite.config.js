// vite.config.js
// Vite build configuration.
//
// The `server.proxy` block is what connects your React frontend
// to your Spring Boot backend during development.
//
// Any request from the frontend that starts with /api
// gets forwarded to http://localhost:8080 automatically.
// This avoids CORS errors without touching your backend code.

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000, // React dev server runs on http://localhost:3000

    proxy: {
      // Forward all /api/* requests to Spring Boot
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        // No rewrite needed — your backend already uses /api/v1/... paths
      },
    },
  },
});