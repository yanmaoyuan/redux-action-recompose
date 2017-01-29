var webpack = require('webpack');
var path = require('path');
var webpackConfig = require('./webpack.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');

webpackConfig = Object.assign({}, webpackConfig, {
  plugins: [
      // this create a index.html in dist directory based on specified template
      new HtmlWebpackPlugin({
        template: __dirname + '/example/index.example.html',
        filename: 'index.webpack.html',
        inject: 'body'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      })
    ]
});

module.exports = webpackConfig;
