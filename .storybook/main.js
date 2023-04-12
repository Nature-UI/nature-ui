const fs = require('fs');
const path = require('path');

module.exports = {
  stories: ['../packages/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-postcss',
      options: {
        cssLoaderOptions: {
          importLoaders: 1,
        },
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  typescript: {
    reactDocgen: false,
  },
  core: {
    builder: 'webpack5',
  },
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@nature-ui/core': path.resolve(__dirname, '../packages/core/src'),
    };
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
