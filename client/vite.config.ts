// 👇 This triple-slash directive tells TypeScript to include type definitions from Vitest
/// <reference types="vitest" />

import { defineConfig } from "vite";        // Vite's config helper
import react from "@vitejs/plugin-react";   // React plugin for Vite

// Export the Vite configuration
export default defineConfig({
  plugins: [react()], // Enables React-specific optimizations

  // 👇 Vitest test configuration
  test: {
    globals: true,         // Allows using `describe`, `it`, `expect` globally (no need to import them)
    environment: "jsdom",  // Simulates a browser-like environment (needed for React DOM tests)
    setupFiles: ["./setupTests.ts"], // Runs this file before each test file
  },

  // 👇 Dev server proxy setup (useful for avoiding CORS during development)
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001", // Redirect API requests to your backend server
        changeOrigin: true,              // Adjusts the host header to match the target
        secure: false,                   // Allows proxying to HTTP (not HTTPS)
      },
    },
  },
});