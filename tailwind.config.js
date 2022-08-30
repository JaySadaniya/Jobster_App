const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      brand: colors.blue,
      secondary: colors.gray,
      emarald: colors.emerald,
      blue: colors.blue,
      green: colors.green,
      pending: colors.amber,
      declined: colors.red,
      "og-red": colors.red,
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      inset: {
        0.313: "-0.313rem",
        0.563: "-0.563rem",
        1.375: "-1.375rem",
        8.438: "8.438rem",
      },
      minHeight: {
        10: "10rem",
        "50vh": "50vh",
        2.375: "2.375rem",
      },
      maxHeight: {
        2.375: "2.375rem",
        "152px": "152px",
        "76px": "76px",
      },
      maxWidth: {
        "50%": "50%",
      },
    },
  },
  plugins: [],
};
