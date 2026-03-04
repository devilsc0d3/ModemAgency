/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#1c1917',
        surfaceBorder: '#44403c',
        gold: {
          DEFAULT: '#d4af37',
          hover: '#ca8a04',
          light: '#fde047'
        },
        textMain: '#fafaf9',
        textMuted: '#a8a29e',
      },
      fontFamily: {
        sans: ['"Montserrat"', 'sans-serif'],
        serif: ['"Cormorant"', 'serif'],
      }
    },
  },
  plugins: [],
}
