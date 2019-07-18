const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const publicDirPath = path.join(__dirname, './public');

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  
  output: {
    filename: 'bundle.js',
    path: publicDirPath
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css'
    })
  ],

  module: {
    rules: [
      {
        test: /.jsx?/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /.scss?/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /.(jpg|jpeg|gif|png)/,
        use: 'file-loader',
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: [ '.js', '.jsx' ]
  },

  devServer: {
    port: 3001,
    contentBase: publicDirPath,
    historyApiFallback: true
  }
}
