/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#f7f6ff',
        'dark': '#191919'
      }
    },
    fontFamily: {
      body: ['Montserrat']
    }
  },
  plugins: [],
}