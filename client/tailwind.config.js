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
        'dark': '#1c1c1c',
        'btn-dark': '#303030',
      }
    },
    fontFamily: {
      body: ['Montserrat']
    }
  },
  plugins: [],
}