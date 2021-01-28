module.exports = {
  plugins: [
    'autoprefixer',
    'postcss-import',
    'postcss-mixins',
    [
      'postcss-preset-env',
      {
        stage: 1,
      },
    ],
    'postcss-flexbugs-fixes',
    'tailwindcss',
  ],
};
