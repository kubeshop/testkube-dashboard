const path = require('path');
const webpack = require('webpack');

const port = process.env.PORT || 3000;

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true,
  },
};
