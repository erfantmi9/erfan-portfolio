import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#09090b", 900: "#0f172a", 800: "#1e293b", 700: "#334155" },
        neon: { DEFAULT: "#38bdf8", dim: "#0ea5e9" },
        amber: { glow: "#fbbf24" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(56, 189, 248, 0.45)",
      },
      keyframes: {
        blink: { "0%, 49%": { opacity: "1" }, "50%, 100%": { opacity: "0" } },
      },
      animation: { blink: "blink 1s steps(1) infinite" },
    },
  },
  plugins: [],
};

export default config;
