const fs = require("fs")

// [Workaround] This logic means `"../packages/*/stories/*.stories.tsx"` but it's much faster.
function getStories(pkg) {
  const scope = pkg ? [pkg] : fs.readdirSync("packages")
  return scope
    .map((package) => `packages/${package}/stories`)
    .filter((storyDir) => fs.existsSync(storyDir))
    .map((storyDir) => `../${storyDir}/*.stories.tsx`)
}

module.exports = {
  stories: getStories(),
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
    builder: "webpack5",
    // disableTelemetry: true
  }
};