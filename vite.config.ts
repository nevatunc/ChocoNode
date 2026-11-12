import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// GitHub Pages: repo adı "choconode" varsayıldı. Farklıysa VITE_BASE ortam değişkenini değiştir.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE ?? "/choconode/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
