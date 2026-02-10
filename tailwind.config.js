/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0a0a0a',
          darker: '#050505',
          lighter: '#1a1a1a',
        },
        gold: {
          DEFAULT: '#d4af37',
          dark: '#8b7729',
          light: '#f4cf67',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)'],
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
}
