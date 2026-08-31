import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // 🟢 RESTORED BACKEND PROXY SERVER INFRASTRUCTURE
  server: {
    proxy: {
      // Intercepts frontend /api calls and securely tunnels them to your Node server locally
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
