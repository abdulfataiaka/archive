const path = require('path');

module.exports = {
  mode: 'development',
  entry: './app/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: [ /node_modules/ ]
      },
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ],
        exclude: [ /node_modules/ ]
      }
    ]
  },
  
  resolve: {
    extensions: [ '.js', '.jsx' ]
  },

  devServer: {
    port: 7500,
    contentBase: path.join(__dirname, 'app'),
    historyApiFallback: true
  }
}

