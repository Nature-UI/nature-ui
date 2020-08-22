const path = require('path');

module.exports = {
  stories: ['../packages/**/*.stories.(ts|tsx|mdx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
  ],
  webpackFinal: async (config) => {
    // config.module.rules.push({
    //   test: /\.scss$/,
    //   use: [
    //     'style-loader',
    //     'css-loader',
    //     {
    //       loader: 'postcss-loader',
    //       options: {
    //         ident: 'postcss',
    //         sourceMap: true,
    //         config: {
    //           path: './.storybook/',
    //         },
    //       },
    //     },
    //   ],

    //   include: path.resolve(__dirname, '../'),
    // });
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [require.resolve('babel-preset-react-app')],
          },
        },
        require.resolve('react-docgen-typescript-loader'),
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
