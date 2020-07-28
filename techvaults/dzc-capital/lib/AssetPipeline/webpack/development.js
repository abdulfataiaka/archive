const common = require('./common');
const merge = require('webpack-merge');

module.exports = merge(common, {
    mode: 'development',
    cache: false,
    watchOptions: {
        ignored: /node_modules/
    }
});
