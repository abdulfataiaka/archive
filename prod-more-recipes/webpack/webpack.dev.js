const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = webpackMerge(common, {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /server/, /template/],
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    port: 8082,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8081',
      },
    },
    contentBase: path.join(__dirname, '..', 'public'),
    hotOnly: true,
    noInfo: true,
    historyApiFallback: true,
    compress: true,
  },
});
