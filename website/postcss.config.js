const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: {
    tailwindcss: {
      config: './tailwind.config.js',
    },
    autoprefixer: {},
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-preset-env': {},
    'postcss-flexbugs-fixes': {},
  },
};
