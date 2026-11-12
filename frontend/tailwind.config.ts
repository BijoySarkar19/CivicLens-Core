import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        noto: ['"Noto Sans"', '"Noto Sans Devanagari"', "sans-serif"],
      },
      colors: {
        civic: {
          navy: "#07111f",
          dark: "#050c16",
          accent: "#22d3ee",
          "govt-blue": "#0a5c9e",
          "govt-dark": "#0d1b2a",
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        shimmer: "shimmer 1.6s infinite",
        blob: "blob-drift 14s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "blob-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(60px, -40px) scale(1.12)" },
          "66%": { transform: "translate(-30px, 30px) scale(0.92)" },
        },
      },
      backdropBlur: {
        xl: "18px",
      },
    },
  },
  plugins: [],
} satisfies Config;
