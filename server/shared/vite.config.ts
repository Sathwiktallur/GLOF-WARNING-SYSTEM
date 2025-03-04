import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Allows importing with "@/components" instead of "../../../components"
    },
  },
  server: {
    port: 5173, // Change if needed
    open: true, // Automatically opens the browser
  },
  build: {
    outDir: "dist",
  },
});
