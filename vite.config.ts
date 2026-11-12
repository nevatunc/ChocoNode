import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// GitHub Pages: repo adı GitHub API'ye göre "ChocoNode" (büyük harfle). Farklıysa VITE_BASE ortam değişkenini değiştir.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE ?? "/ChocoNode/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
