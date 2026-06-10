/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#00f0ff",
        surface: "#131313",
        "surface-dim": "#0e0e0e",
        "on-surface": "#ffffff",
        "on-surface-variant": "#9ca3af",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backdropBlur: {
        glass: "20px",
      },
      animation: {
        shimmer: "shimmer 2s infinite linear",
        "pulse-glow": "pulse-glow 3s infinite ease-in-out",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
      },
    },
  },
};
