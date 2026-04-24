/** @type {import('tailwindcss').Config} */
const relumeTailwindPreset = require("@relume_io/relume-tailwind");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [relumeTailwindPreset],
  theme: {
    extend: {
      fontFamily: {
        monument: ['"PP Monument Extended"', "sans-serif"],
        helvetica: ["Helvetica", "Arial", "sans-serif"],
        formula: ['"PP Formula"', "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        palmbay: {
          bluebg: "#4B52D9",
          pink: "#FE80E3",
          darkpink: "#F13CCA",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in-down": "fadeInDown 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
