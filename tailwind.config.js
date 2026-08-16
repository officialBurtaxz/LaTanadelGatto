/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gatto: {
          950: '#081311',
          900: '#0d1f1c',
          800: '#143028',
          700: '#1d4438',
          600: '#2a5b4d',
          sage: '#8aa194',
          basil: '#4fb87f',
          gold: '#d9a73a',
          cream: '#f5ebd4',
          ember: '#e2683a',
          tom: '#c14a3a',
          bg: '#081311',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        accent: ['Caveat', 'cursive'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ember-flicker': {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.6' },
          '50%': { transform: 'translateY(-6px) scale(1.04)', opacity: '0.9' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out both',
        'ember-flicker': 'ember-flicker 6s ease-in-out infinite',
        'spin-slow': 'spin 24s linear infinite',
      },
    },
  },
  plugins: [],
}