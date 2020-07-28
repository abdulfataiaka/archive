const path = require('path');
const usage = require('./usage');
const Script = require('./script');

class InvalidConfigError extends Error {}
class InvalidArgumentsError extends Error {}

class Context {
    static call() {
        const { root, command } = Context.params();
        const config = Context.config(root);
        const script = Context.script(root, config);
        return { script, command, usage };
    }

    static config(root) {
        const config = require(path.join(root, 'assets.config.js'));
        if('destination' in config && 'entries' in config) return config;
        throw new InvalidConfigError;
    }

    static script(root, config) {
        return new Script({
            ...config,
            root,
            src: path.join(root, 'src'),
        });
    }

    static params() {
        const argv = process.argv.slice(2);

        if(argv.length >= 2 && argv[0] === '--root') return {
            root: argv[1],
            command: argv.length === 2 ? 'install' : argv[2]
        };

        throw new InvalidArgumentsError;
    }
}

module.exports = Context;
