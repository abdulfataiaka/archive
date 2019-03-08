const global = require('./global');
const base = require('../helper/base');
const fsys = require('../helper/fsys');
const rpath = require('../helper/rpath');
/**
 *
 * 
 * @description helpers for server
 *
 * @name Assist
 *
 * @static
 *  
 */
class Assist {
  /**
   *
   * 
   * @description validate config object
   *
   * @static
   * 
   * @param { Object } config
   * 
   * @returns { Array }
   * 
   * @memberof Assist
   * 
   */
  static config(config) {
    const self = Assist;

    if(!base.isobj(config)) {
      return [ 'invalid configuration object' ];
    }
    
    let key;
    let value;
    let check;
    const logs = [];

    for(key in config) {
      value = config[key];
      check = self.check(key, value);
      if (check !== true) {
        logs.push(check);
      } 
    }

    return logs;
  }
  
  /**
   *
   * 
   * @description validate config key
   *
   * @static
   * 
   * @param { String } key
   * @param {*} value
   * 
   * @returns { String | True }
   * 
   * @memberof Assist
   * 
   */
  static check(key, value) {
    const self = Assist;

    switch (key) {
      case 'port' : return self.isport(value);
      case 'base' : return self.isbase(value);
      case 'assets' : return self.isassets(value);
      default: return `invalid configuration key - ${key}`;
    }
  }

  /**
   *
   * 
   * @description validate port number
   *
   * @static
   * 
   * @param { Integer } argument
   * 
   * @returns { String | True }
   * 
   * @memberof Assist
   * 
   */
  static isport(argument) {
    return (
      !base.isint(argument) ||
      argument < 3000 ||
      argument > 65000
    ) ? `port not valid or out of range - ${argument}` : true;
  }

  /**
   *
   * 
   * @description validate base path
   *
   * @static
   * 
   * @param { String } argument
   * 
   * @returns { String | True }
   * 
   * @memberof Assist
   * 
   */
  static isbase(argument) {
    return (
      base.isstr(argument) &&
      fsys.isdir(argument)
    ) ? true : 'base path is not a valid directory path';
  }

  /**
   *
   * 
   * @description validate router object
   *
   * @static
   * 
   * @param { Array } argument
   * 
   * @returns { String | True }
   * 
   * @memberof Assist
   * 
   */
  static isassets(argument) {
    if (!base.isarr(argument)) {
      return 'asset attribute should be an array';
    }

    let index;
    let asset;
    for(index in argument) {
      asset = argument[index];
      if(!base.isstr(asset) || asset.match(/^[a-z]+$/) === null) {
        return `asset entry not valid - ${asset}`;
      }
    }

    return true;
  }

  /**
   *
   * 
   * @description check if is asset path
   *
   * @static
   * 
   * @param { String } uri
   * @param { Array } assets
   * 
   * @returns { Boolean }
   * 
   * @memberof Assist
   * 
   */
  static isasseturi(uri, assets) {
    if (rpath.ispath(uri)) {
      const splitted = uri.split('/');
      return assets.includes(splitted[1]);
    }

    return false; 
  }

  /**
   *
   * 
   * @description end process
   *
   * @static
   * 
   * @param {*} message
   * 
   * @memberof Assist
   * 
   */
  static kill(message) {
    console.log(message);
    process.exit(0);
  }

  /**
   *
   * 
   * @description log errors
   *
   * @static
   * 
   * @param { Array } logs
   * 
   * @returns { None }
   * 
   * @memberof Assist
   * 
   */
  static logerr(title, errors) {
    console.log(`\n------ ${title} ------`);
    errors.forEach(error => console.log(`=> ${error}`));
  }

  /**
   *
   * 
   * @description check !important config
   *
   * @static
   * 
   * @param { Object } argument
   * 
   * @returns { None }
   * 
   * @memberof Assist
   * 
   */
  static checkfatal(argument) {
    const self = Assist;
    const { base } = argument;
    const logs = [];

    if (!base) {
      logs.push('base path for project needs to be set');
    }
    
    if (logs.length == 0) return;
    self.logerr('Fatal error log', logs);
    self.kill('\n=! Server shutdown due to errors');
  }

  /**
   *
   * 
   * @description prints startup message
   *
   * @static
   * 
   * @param { String } host
   * @param { Integer } port
   * 
   * @memberof Assist
   * 
   */
  static startup(host) {
    let message = `=> ${base.title(global.name)} version ${global.version}`;
    message += `\n=> Node ${global.node.version} server starting on ${host}`;
    message += `\n=> Release date is ${global.release}`;
    console.log(message);
  }

  /**
   *
   * 
   * @description convert to nodes array
   *
   * @static
   * 
   * @param { String } uri
   * 
   * @returns { Array }
   * 
   * @memberof Assist
   * 
   */
  static tonodes(uri) {
    if (uri == '/') return [];
    uri = rpath.rmbslash(uri);
    uri = rpath.rmeslash(uri);
    return uri.split('/');
  }

  /**
   *
   * 
   * @description validate route object
   *
   * @static
   * 
   * @param { Object } route
   * 
   * @returns { Boolean }
   * 
   * @memberof Assist
   * 
   */
  static isroute(route) {
    return (
      base.isobj(route) &&
      Object.keys(route).length == 2 &&
      rpath.isuri(route.uri) &&
      (
        base.haskey(route, 'purge') &&
        !base.haskey(route, 'theme') &&
        base.isstr(route.purge)
      ) ||
      (
        base.haskey(route, 'theme') &&
        !base.haskey(route, 'purge') &&
        rpath.ispath(route.theme) &&
        rpath.extension(route.theme) == 'html'
      )
    );
  }
}

module.exports = Assist;
