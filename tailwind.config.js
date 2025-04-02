/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purpleMain: "#6B46C1",
        lightPurple: "#f9f9ff",
        cancelRed: "#dc2626",
        runningBlack: "#1a1a1a",
        receivedGreen: "#16a34a",
      },
    },
  },
  plugins: [],
};
