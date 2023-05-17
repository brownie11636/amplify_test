const tailwindcss = require("tailwindcss");

module.exports = {
  content: ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class", // default 'media', if change 'class', add className 'dark' to parent element
  plugins: [],
};
