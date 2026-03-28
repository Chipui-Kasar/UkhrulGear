/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern dark theme
        obsidian: "#0A0A0F", // Deep dark background
        slate: "#1E1E2E", // Card backgrounds
        granite: "#313244", // Elevated elements

        // Modern accent colors
        moss: "#74C0FC", // Primary blue
        trail: "#94E2D5", // Mint green secondary
        sunrise: "#F38BA8", // Soft pink accent
        peak: "#FAB387", // Warm orange

        // Text colors
        snow: "#F8F8F2", // Primary text
        mist: "#BAC2DE", // Secondary text
        cloud: "#6C7086", // Muted text
      },
      fontFamily: {
        display: ["Bebas Neue", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
