/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        s60: "60vh",
        s70: "70vh",
        s80: "80vh",
        s90: "90vh",
        s130: "130vh",
      },
      spacing: {
        '65%': '65%',
      },
      width: {},
    },
  },
  plugins: [],
};
