var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin');


const SRC_DIR = path.resolve(__dirname, 'src'),
      ENTRY = path.resolve(__dirname, './src/demo'),
      EXAMPLE = path.resolve(__dirname, 'example');

const webpackConfig = {
  entry: ENTRY,
  output: {
    path: EXAMPLE,
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'eslint-loader',
        include: SRC_DIR
      }
    ],
    loaders: [
      {
      	test: /\.jsx?$/,
      	loader: 'babel-loader',
        include: SRC_DIR
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'less']
      },
      {
        test: /\.s?css$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
};

module.exports = webpackConfig;
