module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'beat-fade': {
          '50%': {
            transform: 'scale(0.75)',
            opacity: '0.2',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1);',
          },
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1);',
          },
        },
      },
      animation: {
        'beat-fade': 'beat-fade 0.7s 0s infinite linear',
        'beat-fade-odd': 'beat-fade 0.7s 0.35s infinite linear',
      },
    },
  },
  plugins: [],
}
