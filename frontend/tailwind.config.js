/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plumPurple: "#833ab4",
        brightRed: "#fd1d1d",
        amberYellow: "#fcb045",

      },
    },
  },
  plugins: [],
}



