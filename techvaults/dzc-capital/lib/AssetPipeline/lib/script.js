const Shell = require('./shell');
const Compiler = require('./compiler');

const modules = [
    'css-loader',
    'sass-loader',
    'fork-ts-checker-webpack-plugin',
    'mini-css-extract-plugin',
    'sass',
    'ts-loader',
    'typescript',
    'webpack',
    'webpack-merge',
];

class Script {
    constructor(context) {
        this.context = context;
    }

    install() {
        Shell.exec(`yarn add ${modules.join(' ')} --dev`);
    }

    build() {
        (new Compiler(this.context)).build();
    }

    watch() {
        (new Compiler(this.context)).watch();
    }
}

module.exports = Script;
