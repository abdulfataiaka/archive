if(process.env.NODE_ENV == 'development') {
    module.exports = require('./webpack/development.js');
} else {
    module.exports = require('./webpack/production.js');
}
