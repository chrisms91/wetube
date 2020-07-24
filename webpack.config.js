const path = require('path');
const ExtractCSS = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, 'assets', 'js', 'main.js');
const OUTPUT_DIR = path.join(__dirname, 'static');

const config = {
  entry: ['@babel/polyfill', ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(scss)$/, // when webpack finds scss files,
        use: ExtractCSS.extract([
          {
            loader: 'css-loader', // teaches webpack how to work with css
          },
          {
            loader: 'postcss-loader', // takes css and transforms it with plugin we provide (compatible)
            options: {
              plugins() {
                return [autoprefixer({ overrideBrowserslist: 'cover 99.5%' })];
              },
            },
          },
          {
            loader: 'sass-loader', // takes sass or scss and converts into normal css
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: '[name].js',
  },
  plugins: [new ExtractCSS('styles.css')],
};

module.exports = config;
