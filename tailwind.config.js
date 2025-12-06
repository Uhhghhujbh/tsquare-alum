/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0056b3', // A strong, trustworthy blue for buttons/highlights
          secondary: '#64748b', // A metallic grey/slate for secondary text
          dark: '#1e293b', // Deep slate for dark backgrounds/text
          light: '#f8fafc', // Very light grey background
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // A clean, modern font
      }
    },
  },
  plugins: [],
}