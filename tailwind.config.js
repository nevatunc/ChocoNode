/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cocoa: {
          50: "#fbf1e6",
          100: "#f3ddc0",
          200: "#e3bb86",
          300: "#cf9a5c",
          400: "#a8713f",
          500: "#7d4e2d",
          600: "#5c371f",
          700: "#422715",
          800: "#2b1810",
          900: "#160b06",
        },
        caramel: "#d98a3d",
        drizzle: "#f2b544",
        cream: "#fdf1e0",
        whip: "#fffaf0",
        blush: "#f0a8ae",
        mint: "#8fd0a9",
        berry: "#c75b5b",
      },
      fontFamily: {
        display: ["Baloo 2", "system-ui", "sans-serif"],
        body: ["Nunito", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        choco: "0 6px 0 0 rgba(90,54,30,0.35), 0 10px 24px -6px rgba(43,24,16,0.35)",
        "choco-sm": "0 4px 0 0 rgba(90,54,30,0.35), 0 6px 14px -4px rgba(43,24,16,0.3)",
        "choco-press": "0 2px 0 0 rgba(90,54,30,0.35), 0 4px 10px -4px rgba(43,24,16,0.3)",
        glossy: "inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -6px 10px rgba(43,24,16,0.15)",
      },
      borderRadius: {
        blob: "42% 58% 61% 39% / 45% 42% 58% 55%",
        "blob-2": "58% 42% 39% 61% / 55% 58% 42% 45%",
      },
      keyframes: {
        steam: {
          "0%, 100%": { transform: "translateY(0) scaleX(1)", opacity: "0.55" },
          "50%": { transform: "translateY(-10px) scaleX(1.15)", opacity: "0.25" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0) rotate(-1deg)" },
          "50%": { transform: "translateY(-6px) rotate(1deg)" },
        },
        drip: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(1.18)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        pop: {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "60%": { transform: "scale(1.08)", opacity: "1" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        steam: "steam 3.2s ease-in-out infinite",
        bob: "bob 4s ease-in-out infinite",
        drip: "drip 2.6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        pop: "pop 0.35s cubic-bezier(.3,1.5,.6,1) both",
      },
      backgroundImage: {
        "cocoa-radial": "radial-gradient(circle at 30% 20%, #fbead3 0%, #f3d9ae 45%, #e3bb86 100%)",
        "cocoa-radial-dark": "radial-gradient(circle at 30% 20%, #3a2317 0%, #2b1810 55%, #160b06 100%)",
      },
    },
  },
  plugins: [],
};
