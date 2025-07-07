const { nextui } = require("@nextui-org/theme");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      fontSize: {
        xxs: "0.5rem",
      },
      colors: {
        light: "#FFFFFF",
        dark: "#252525",
        primary: "#10B981",
        secondary: "#064E3B",
        accent: "#A1A1AA",
        background: "#F8FAFC",
        warning: "#FBBF24",
        error: "#BE123C",
      },
    },
  },
  darkMode: "class",
  plugins: [require("daisyui"), nextui()],
};
