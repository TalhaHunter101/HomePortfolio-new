/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
  // primary: "#4bbdc3", // Light mode primary color
  primary: "#FF6347", // Tomato for both modes
  secondary: "#FF6347", // Tomato
        background: "#FFFFFF", // White background for light mode
        text: "#000000", // Black text for light mode
      },
      fontFamily: {
        body: ["Arial, sans-serif"],
        heading: ["Georgia, serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "scrolling-banner": {
          from: {transform: "translateX(0)"},
          to: {transform: "translateX(calc(-50% - var(--gap)/2))"},
        },
        "scrolling-banner-vertical": {
          from: {transform: "translateY(0)"},
          to: {transform: "translateY(calc(-50% - var(--gap)/2))"},
        },
      },
      animation: {
        "scrolling-banner": "scrolling-banner var(--duration) linear infinite",
        "scrolling-banner-vertical": "scrolling-banner-vertical var(--duration) linear infinite",
      },
      
    },
  },
            darkMode: "class", // Enable dark mode
  plugins: [
    nextui({
      themes: {

        
        light: {
          colors: {
            // primary: "#4bbdc3", // Light mode primary color
            primary: "#FF6347", // Tomato for both modes
            secondary: "#FF6347", // Tomato
            background: "#FFFFFF", // White background for light mode
            text: "#000000", // Black text for light mode
          },
          fontFamily: {
            body: ["Arial, sans-serif"],
            heading: ["Georgia, serif"],
            "text-lg": {
              fontSize: "1.125rem",
              lineHeight: "1.75rem",
              fontFamily: "Georgia, sans-serif",
            },
          },
        },
        dark: {
          colors: {
            primary: "#800080", // Dark mode primary color (purple)
            secondary: "#FF6347", // Tomato
            background: "#121212", // Dark background for dark mode
            text: "#FFFFFF", // White text for dark mode
          },
          fontFamily: {
            body: ["Arial, sans-serif"],
            heading: ["Georgia, serif"],
          },
        },
      },
    }),
  ],
};
