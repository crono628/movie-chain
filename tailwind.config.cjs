/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      keyframes: {
        btnIn: {
          '0%': {
            opacity: 0,
            visibility: 'hidden',
          },
          '100%': {
            opacity: 1,
            visibility: 'visible',
          },
        },
        btnOut: {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
            visibility: 'hidden',
          },
        },
        highlightIn: {
          '0%': {
            backgroundColor: 'transparent',
          },
          '100%': {
            backgroundColor: '#fff',
          },
        },
        highlightOut: {
          '0%': {
            backgroundColor: '#fff',
          },
          '100%': {
            backgroundColor: 'transparent',
          },
        },
      },
      animation: {
        btnIn: 'btnIn  0.25s ease-in both ',
        btnOut: 'btnOut  0.25s ease-out forwards ',
        highlightIn: 'highlightIn  0.25s ease-in forwards ',
        highlightOut: 'highlightOut  0.25s ease-out forwards ',
      },
    },
  },
  plugins: [],
};
