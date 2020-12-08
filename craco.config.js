const postcss = import('postcss-import');
const tailwind = import('tailwindcss');
const autoprefixer = import('autoprefixer');
const sass = import('node-sass');

module.exports = {
  style: {
    postcss: {
      plugins: [postcss, tailwind, autoprefixer, sass],
      /*
       * env: {
       *   autoprefixer: {
       *     env: 'production',
       *   },
       * },
       */
    },
  },
};
