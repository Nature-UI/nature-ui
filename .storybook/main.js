const path = require('path');

module.exports = {
  stories: ['../packages/**/*.stories.(ts|tsx)'],
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
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            sourceMap: true,
            config: {
              path: './.storybook/',
            },
            // plugins: [
            //   require('tailwindcss'),
            //   require('autoprefixer'),
            //   require('postcss-import'),
            // ],
          },
        },
        'sass-loader',
      ],

      include: path.resolve(__dirname, '../'),
    });
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

/*
 webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.?(c|a)ss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            indentedSyntax: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('tailwindcss'),
              require('autoprefixer'),
              require('postcss-import'),
            ],
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });
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
  */

/**
   * Another 
config.module.rules = [
      // ...config.module.rules.filter((rule) => rule.test.toString() !== '/\\.css$/'),
      ...config.module.rules,
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              
              Enable Source Maps
             
            sourceMap: true,
            
            Set postcss.config.js config path && ctx 
           
            config: {
              path: './.storybook/',
            },
          },
        },
      ],

      include: path.resolve(__dirname, '../'),
    },
    {
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
    },
  ];
   */
