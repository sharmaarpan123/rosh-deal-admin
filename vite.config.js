import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
   // other settings
   preview: {
    host: true, // allow external access
    port: 4173,
    allowedHosts: ['admin.buyrapp.in'],
  },
});
