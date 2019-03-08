const path = require('path');
const assist = require('./assist');
const fsys = require('../helper/fsys'); 
const rpath = require('../helper/rpath'); 
/**
 *
 * 
 * @description server operations
 *
 * @name Controller
 * 
 */
class Handle {
  /**
   *
   * 
   * @description instatiate Controllerler
   * 
   * @param { Object } config
   * 
   * @returns { this }
   * 
   * @memberof Controller
   * 
   */
  constructor(config) {
    this.base = rpath.rmeslash(config.base);
    this.assets = config.assets;
    this.router = config.router;
    this.req = null;
    this.res = null;

    this.headers = {
      plain: {'Content-Type': 'text/plain'},
      html: {'Content-Type': 'text/html'},
      js: {'Content-Type': 'text/javascript'}
    }
  }

  /**
   *
   * 
   * @description handle all incoming requests
   *
   * @param { Request } request
   * @param { Response } response
   * 
   * @memberof Controller
   * 
   * @returns { None }
   * 
   */
  respond_to_request(request, response) {
    let uri = request.url;
    this.req = request;
    this.res = response;

    try {
      this.respond_to_root(uri)
        ? null
        : this.respond_to_asset(uri)
          ? null
          : this.respond_to_route(uri)
            ? null
            : this.resource_not_found();
    }

    catch(error) {
      console.log(error);
      this.internal_server_error();
    }
  }

  /**
   *
   * 
   * @description handle root request
   *
   * @param { String } uri
   * 
   * @returns { Boolean }
   * 
   * @memberof Handle
   * 
   */
  respond_to_root(uri) {
    if (uri !== '/') return false;
    const htmlpath = path.join(this.base , 'index.html');
    const initpath =  path.resolve(__dirname, '../assets/index.html');
    const content = fsys.read(htmlpath) || fsys.read(initpath) || '';
    this.res.writeHead(200, this.headers.html);
    this.res.end(content);
    return true;
  }

  /**
   *
   * 
   * @description handle asset requests
   *
   * @param { String } uri
   * 
   * @memberof Controller
   * 
   * @returns { Boolean }
   * 
   */
  respond_to_asset(uri) {
    if (!assist.isasseturi(uri, this.assets)) {
      return false;
    }
    
    //++ check file existence
    const filepath = this.base + uri;
    const content = fsys.read(filepath);
    if (content === false) {
      this.resource_not_found();
      return true;
    }
    
    //++ setup headers
    const ext = rpath.extension(uri);
    const mimetype = rpath.mimetype(ext);
    const headers = { 'Content-Type': mimetype };

    //++ send back response
    this.res.writeHead(200, headers);
    this.res.end(content);
    return true;
  }

  /**
   *
   * 
   * @description handle route requests
   *
   * @param { String } uri
   * 
   * @memberof Controller
   * 
   * @returns { None }
   * 
   */
  respond_to_route(uri) {
    if (!this.router) return false;
    const route = this.router.pull(uri);
    if (!route) { return false; }

    // handle purge request
    if (route.purge) {
      this.res.writeHead(200, this.headers.html);
      this.res.end(route.purge);
      return true;
    }

    //++ handle theme request
    const htmlpath = this.base + route.theme;
    const ext = rpath.extension(route.theme);
    let content;
    if (ext !== 'html' || (content = fsys.read(htmlpath)) === false) {
      this.resource_not_found();
      return true;
    }

    //++ responsd with html content
    this.res.writeHead(200, this.headers.html);
    this.res.end(content);
    return true;
  }

  /**
   *
   * 
   * @description handle not found
   * 
   * @param { None }
   * 
   * @returns { None }
   *
   * @memberof Controller
   * 
   */
  resource_not_found() {
    const initpath =  path.resolve(__dirname, '../assets/404.html');
    const content = fsys.read(initpath) || 'Resource not found';
    this.res.writeHead(404, this.headers.html);
    this.res.end(content);
  }

  /**
   *
   * 
   * @description handle internal error
   * 
   * @param { None }
   * 
   * @returns { None }
   *
   * @memberof Controller
   * 
   */
  internal_server_error() {
    const initpath =  path.resolve(__dirname, '../assets/500.html');
    const content = fsys.read(initpath) || 'Internal server error';
    this.res.writeHead(500, this.headers.html);
    this.res.end(content);
  }
}

module.exports = Handle;
