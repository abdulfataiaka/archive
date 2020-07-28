const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    node: {
        fs: 'empty',
    },
    output: {
        filename: 'js/[name].[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true
                }
            },
            {
                test: /.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            moduleFilename: ({ name, contentHash }) => {
                const contenthash = contentHash['css/mini-extract'];
                return `css/${name}.${contenthash}.css`
            }
        }),
        new ForkTsCheckerWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
}
