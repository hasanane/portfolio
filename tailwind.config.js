/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        s60: "60vh",
        s70: "70vh",
        s80: "750px",
        s90: "90vh",
        s130: "130vh",
        "300px":"300px",
        "250px":"250px",
      },
      spacing: {
        '65%': '65%',
      },
      width: {},
    },
  },
  plugins: [],
};
