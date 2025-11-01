/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    extend: {
      fontFamily: {
        'monument': ['"PP Monument Extended"', 'sans-serif'],
        'helvetica': ['Helvetica', 'Arial', 'sans-serif'],
        'formula': ['"PP Formula"', 'sans-serif'],
        },


      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",


        //Palm Bay Digital Brand Colours
        'palmbay': {
          bluebg: '#4B52D9',
          pink: '#FE80E3',
          darkpink: '#F13CCA',
        }      
      },
    },
  },
  plugins: [],
};
