const { transform } = require("typescript");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        slideLeft: "slideLeft 0.4s ease-in-out",
        slideRight: "slideRight 0.4s ease-in-out",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        slideLeft: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
        },
        slideRight: {
          "100%": { transform: "translateX(100%)", opacity: "100" },
        },
      },
    },
  },
  plugins: [],
};
