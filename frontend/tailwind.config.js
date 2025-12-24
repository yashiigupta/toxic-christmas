/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        holly: '#FFB7B2',
        mistletoe: '#B5EAD7',
        snow: '#F9F9F9',
        coal: '#4A4A4A',
        tinsel: '#E2F0CB',
      },
      fontFamily: {
        sans: ['Quicksand', 'Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
