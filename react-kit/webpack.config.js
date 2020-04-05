const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    main: './src/index.js'
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },

      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      favicon: './src/images/favicon.png'
    }),

    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devServer: {
    host: '0.0.0.0',
    port: 4000,
    hot: true,
    overlay: true,
    compress: true,
    noInfo: true,
    historyApiFallback: true,

    watchContentBase: true,
    contentBase: path.join(__dirname, 'build'),
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    }
  }
};
