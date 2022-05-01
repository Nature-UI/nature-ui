const colors = require('tailwindcss/colors');

module.exports = {
  content: ['packages/**/*.{ts,tsx,js}'],
  plugins: [],
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        teal: colors.teal,
        red: colors.red,
        blue: colors.blue
      },
    },
  },
};
