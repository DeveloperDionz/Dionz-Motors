/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf8ec',
          100: '#faeecb',
          200: '#f5dc92',
          300: '#efc459',
          400: '#eaad32',
          500: '#e2921b',
          600: '#c87014',
          700: '#a65114',
          800: '#874017',
          900: '#6f3516',
        },
        ink: {
          50: '#f6f6f7',
          100: '#e2e3e6',
          200: '#c5c7cc',
          300: '#a0a3ab',
          400: '#7b7f89',
          500: '#61646e',
          600: '#4c4f57',
          700: '#3f4147',
          800: '#26272b',
          900: '#151619',
          950: '#0c0d0f',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.55' },
        },
      },
      animation: {
        'fade-up': 'fadeUp .7s cubic-bezier(.22,.9,.35,1) both',
        'fade-in': 'fadeIn .9s ease both',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
