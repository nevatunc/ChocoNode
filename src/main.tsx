import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/styles/index.css";

function applyColorScheme(matches: boolean) {
  document.documentElement.classList.toggle("dark", matches);
}

const media = window.matchMedia("(prefers-color-scheme: dark)");
applyColorScheme(media.matches);
media.addEventListener("change", (e) => applyColorScheme(e.matches));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
