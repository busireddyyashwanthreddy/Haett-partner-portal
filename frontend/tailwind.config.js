/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#f8f9ff",
        primary: {
          DEFAULT: "#064e3b",
          dark: "#003527",
          light: "#80bea6",
        },
        secondary: {
          DEFAULT: "#fea619",
          dark: "#855300",
        },
        error: "#ba1a1a",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1440px",
      },
    },
  },
  plugins: [],
};
