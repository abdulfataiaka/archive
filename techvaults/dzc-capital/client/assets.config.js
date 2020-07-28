const path = require('path');

const entries = {
    main: './src/main/index.ts',
    auth: './src/auth/index.ts'
};

module.exports = {
    entries,
    envfile: path.resolve('..', '.env'),
    destination: path.resolve('..', 'public'),
    afterHook: exec => exec('cd .. && php artisan view:clear'),
};
