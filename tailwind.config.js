/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontSize: {
      sm: "0.6rem",
      md: "0.8rem",
      lg: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        140: "35rem",
        144: "36rem",
      },
      animation: {
        rotacao: "spin 4s linear infinite reverse",
      },
    },
  },
};
