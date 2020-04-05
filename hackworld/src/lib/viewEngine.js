import appLib from './appLib'; 
import nunjucks from 'nunjucks';

class ViewEngine {
    CONFIG = { autoescape: true };
    VIEWSDIR = appLib.viewsPath();

    constructor() {
        this.engine = nunjucks;
        this.engine.configure(this.VIEWSDIR, this.CONFIG);
    }

    transpile(name, context = {}) {
        name = `${name}.html`;
        return this.engine.render(name, context);
    }
}

const viewEngine = new ViewEngine();
export default viewEngine;
