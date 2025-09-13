/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        'black': '#141619',
        'dark-gray': '#2C2E3A',
        'light-gray': '#B3B4BD',
        'white': '#FFFFFF',
      },
    },
  },
  plugins: [],
}