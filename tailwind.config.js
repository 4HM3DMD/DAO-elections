/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '#0A0E17': '#0A0E17',
        '#111827': '#111827',
        '#1D2332': '#1D2332',
        '#2D3549': '#2D3549',
        '#94A3B8': '#94A3B8',
        '#1DB793': '#1DB793',
        '#22C080': '#22C080',
      }
    },
  },
  plugins: [],
} 