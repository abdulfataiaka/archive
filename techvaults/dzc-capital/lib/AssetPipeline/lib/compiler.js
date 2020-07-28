const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const Shell = require('./shell');
const webpack = require('webpack');
const config = require('../webpack.config');
const webpackMerge = require('webpack-merge');

class Compiler {
    constructor(context) {
        this.context = context;

        if(this.context.envfile) {
            dotenv.config({
                path: this.context.envfile
            });
        }

        this.build = this.build.bind(this);
        this.watch = this.watch.bind(this);
        this.config = this.config.bind(this);
        this.plugins = this.plugins.bind(this);
        this.handler = this.handler.bind(this);
        this.unlinkAll = this.unlinkAll.bind(this);
        this.afterHook = this.afterHook.bind(this);
    }

    build() {
        const compiler = webpack(this.config());
        compiler.hooks.done.tap('DoneHook', () => this.afterHook());
        compiler.hooks.beforeRun.tap('BeforeRunHook', this.unlinkAll);
        compiler.run(this.handler);
    }

    watch() {
        const config = this.config();
        const compiler = webpack(config);
        compiler.hooks.done.tap('DoneHook', () => this.afterHook());
        compiler.hooks.watchRun.tap('BeforeRunHook', this.unlinkAll);
        compiler.watch(config.watchOptions, this.handler);
    }

    config() {
        return webpackMerge(config, {
            plugins: this.plugins(),
            entry: this.context.entries,
            output: { path: this.context.destination },
        });
    }

    afterHook() {
        if(this.context.afterHook) {
            this.context.afterHook(Shell.exec);
        }
    }

    handler(error, stats) {
        if(error) throw error;
        console.debug(stats.toString({ colors: true }));
    }

    plugins() {
        return [
            new webpack.DefinePlugin({
                'process.env': {
                    API_BASE_URL: JSON.stringify(process.env.API_BASE_URL)
                }
            })
        ];
    }

    unlinkAll() {
        const { destination } = this.context;

        const params = {
            [`${destination}/js`]: ['.keep'],
            [`${destination}/css`]: ['.keep'],
        };

        Object.entries(params).forEach(([dirpath, exclude]) => {
            fs.readdirSync(dirpath).forEach(filename => {
                if(!exclude.includes(filename)) {
                    fs.unlinkSync(path.join(dirpath, filename));
                }
            });
        });
    }
}

module.exports = Compiler;
