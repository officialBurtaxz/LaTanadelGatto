/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gatto: {
          950: '#140d09',
          900: '#1c130d',
          800: '#2a1d14',
          700: '#3d2718',
          600: '#5a3a23',
          tom: '#c0392b',
          ember: '#e0772a',
          gold: '#e3a82e',
          cream: '#fbf3e4',
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