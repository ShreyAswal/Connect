import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        // The backend server address prefix for any request sent from the frontend server to the backend server
        target: "http://localhost:5000",
      },
    },
  },
});
