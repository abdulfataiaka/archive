const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'app', 'index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}
