
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.js',

    mode: isProduction ? 'production' : 'development',

    devtool: isProduction ? 'source-map' : 'inline-source-map',

    // Сервер розробки
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true,
    },

    // Завантажувачі
    module: {
      rules: [
        {
          test: /\.js$/,
          type: 'javascript/auto',
        },
        // CSS / SCSS / SASS
        {
          test: /\.(css|scss|sass)$/i,
          use: [
            isProduction
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  localIdentName: isProduction
                    ? '[hash:base64:5]'
                    : '[name]__[local]--[hash:base64:5]',
                },
              },
            },
            'sass-loader',
          ],
        },

        // Зображення
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext][query]',
          },
        },
      ],
    },

    // Розширення файлів
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      extensionAlias: {
        '.js': ['.ts', '.js'],
        '.mjs': ['.mts', '.mjs'],
      },
    },

    //Плагіни
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'TypeScript Webpack App',
      }),

      ...(isProduction
        ? [
          new MiniCssExtractPlugin({
            filename: 'css/style.css',
          }),
        ]
        : []),
    ],

    // Результат збірки
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

    stats: {
      children: true,
      errorDetails: true,
    },
  };
};
