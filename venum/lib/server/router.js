const assist = require('./assist');
const base = require('../helper/base');
const rpath = require('../helper/rpath');
/**
 * 
 * 
 * @description routes manager class
 * 
 * @param { None }
 * 
 * @name Router
 * 
 */
class Router {
  /**
   * 
   * 
   * @description router class initializer
   * 
   * @param { None }
   * 
   * @memberof Router
   * 
   * @returns { this }
   * 
   */
  constructor() {
    this.tree = {
      uri: '/',
      theme: '/index.html'
    }
  }

  /**
   *
   * 
   * @description update tree with uri
   *
   * @param { Array } nodes
   * 
   * @returns { Object }
   * 
   * @memberof Router
   * 
   */
  dosync(nodes) {
    let ref = this.tree;

    nodes.map(node => {
      if (!base.haskey(ref, node)){
        ref[node] = {}
      }
      ref = ref[node];
    });
  
    return ref;
  }
  
  /**
   *
   * 
   * @description access node object
   *
   * @param {*} nodes
   * 
   * @returns { Object }
   * 
   * @memberof Router
   * 
   */
  unsync(nodes) {
    let node;
    let index;
    let ref = this.tree;
    
    for(index in nodes) {
      node = nodes[index];
      if (!base.haskey(ref, node)) {
        return null;
      }
      ref = ref[node];
    }

    return ref;
  }

  /**
   *
   * 
   * @description get route from tree
   *
   * @param { String } uri
   * 
   * @returns { Object | null }
   * 
   * @memberof Router
   * 
   */
  pull(uri) {
    const nodes = assist.tonodes(uri);
    const refobj = this.unsync(nodes);

    return !refobj
      ? null
      : base.pull(refobj, [
        'uri',
        'purge',
        'theme'
      ]);
  }

  /**
   * 
   * 
   * @description push route into tree
   * 
   * @param { Object } argument 
   * 
   * @memberof Router
   * 
   * @returns { Boolean }
   * 
   */
  push(route) {
    if (!assist.isroute(route)) return false;
    const { uri, purge, theme } = route;
    const nodes = assist.tonodes(uri);
    const refobj = this.dosync(nodes);

    if (Object.keys(refobj).length != 0) return false;
    refobj.uri = rpath.rmeslash(uri);
    purge ? refobj.purge = purge : refobj.theme = rpath.rmeslash(theme);
    return true;
  }

  /**
   *
   * 
   * @description pull all routes
   *
   * @param { None }
   * 
   * @returns { Array }
   * 
   * @memberof Router
   * 
   */
  pullall() {}

  /**
   *
   * 
   * @description push in routes
   *
   * @param { Array } routes
   * 
   * @returns { Boolean }
   * 
   * @memberof Router
   */
  pushall(routes) {
    if (!base.isarr(routes)) return false;
    routes.forEach(route => this.push(route));
    return true;
  }
}

module.exports = Router;
