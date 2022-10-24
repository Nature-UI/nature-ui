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
  // stories: getStories(),
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
    builder: "webpack5",
    // disableTelemetry: true
  },
  webpackFinal: (config) =>  {
    // https://github.com/polkadot-js/extension/issues/621#issuecomment-759341776
    // framer-motion uses the .mjs notation and we need to include it so that webpack will
    // transpile it for us correctly (enables using a CJS module inside an ESM).
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    })
  
    return config
  }
};