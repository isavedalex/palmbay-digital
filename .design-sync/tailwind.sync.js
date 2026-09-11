/**
 * Design-sync Tailwind build. Same preset/theme as the site's tailwind.config.js,
 * but the content globs also cover .design-sync/previews so utilities used only
 * in authored preview cards (padding, grid, max-width) are emitted.
 */
const base = require("../tailwind.config.js");

module.exports = {
  ...base,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./.design-sync/previews/**/*.{ts,tsx}",
    "./.design-sync/shims/**/*.{ts,tsx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
};
