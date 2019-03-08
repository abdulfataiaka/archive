const connect = require('connect');
const morgan = require('morgan');

const server = connect();
server.use(morgan('dev'));

module.exports = server;
