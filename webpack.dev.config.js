var webpack = require('webpack');
var path = require('path');
var webpackConfig = require('./webpack.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');

webpackConfig = Object.assign({}, webpackConfig, {
  devtool: 'eval',
  plugins: [
    // this create a index.html in dist directory based on specified template
    new HtmlWebpackPlugin({
      template: __dirname + '/example/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
});

module.exports = webpackConfig;
