module.exports = {
  stories: ['../packages/**/*.stories.@(ts|tsx|mdx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', {
    name: '@storybook/addon-postcss',
    options: {
      cssLoaderOptions: {
        importLoaders: 1
      },
      postcssLoaderOptions: {
        implementation: require('postcss')
      }
    }
  }],
  typescript: {
    reactDocgen: false
  },
  core: {
    builder: "webpack5"
  }
};