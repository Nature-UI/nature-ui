const colors = require('tailwindcss/colors')

module.exports = {
  content: ['packages/**/*.{ts,tsx,js}'],
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        teal: colors.teal,
        red: colors.red
      },
    },
  },
  variants: {
  },
  plugins: [],
};
