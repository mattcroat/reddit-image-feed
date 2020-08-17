module.exports = {
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%, 80%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  variants: {},
  plugins: [],
  purge: {
    content: [
      './src/**/*.jsx',
      './index.html'
    ],
  },
};
