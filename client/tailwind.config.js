/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        'darkblue': '#001B3A',
        'orange': '#EA580C',
        'grey': '#E5E5E5',
        'white': '#FFFFFF',
        'red': '#EA4747',
        'green': '#21D378',
        'brightblue': '#1577FF',
        'black': '#333333',
        'slategrey': '#777777',
        'hover-darkblue': '#1A324E',
        'hover-orange': '#CA4A07',
        'hover-beige': '#E7DCD7',
        'hover-brightblue': '#0055CA',
        'new-green': '#41B06F',
        'main-green': '#076F32',
        'medium-pink-red': '#990F30'
      },
      spacing: {
        '128': '32rem',
        '150': '40rem',
      }
    },
  },
  plugins: [],
}
