const path = require('path');
const mimetypes = require('mime-types');
/**
 * 
 * 
 * @description resource path
 * 
 * @name Rpath
 * 
 * @static
 * 
 */
class Rpath {
  /**
   * 
   * 
   * @description is valid uri with respect to server
   * 
   * @param { String } argument
   * 
   * @returns { Boolean }
   * 
   * @static 
   * 
   * @memberof Rpath
   * 
   */
  static isuri(argument) {
    return (
      argument == '/' ||
      argument.match(/^(\/[a-z]+)+\/?$/) != null
    );
  }

  /**
   * 
   * 
   * @description is valid rpath with respect to server
   * 
   * @param { String } argument
   * 
   * @returns { Boolean }
   * 
   * @static
   * 
   * @memberof Rpath
   * 
   */
  static ispath(argument) {
    return (
      argument == '/' ||
      argument.match(/^(\/[^\/]+)+\/?$/) != null
    );
  }

  /**
   *
   * 
   * @description remove front slashes
   *
   * @static
   * 
   * @param { String } argument
   * 
   * @memberof Rpath
   * 
   * @returns { String }
   * 
   */
  static rmbslash(argument) {
    let char;
    let index;
    for(index in argument) {
      char = argument[index];
      if (char != '/') break;
    }
    
    return argument.substr(index);
  }

  /**
   *
   * 
   * @description remove back slashes
   *
   * @static
   * 
   * @param { String } argument
   * 
   * @memberof Rpath
   * 
   * @returns { String }
   * 
   */
  static rmeslash(argument) {
    let char;
    let index;
    for(index = argument.length - 1; index >= 0; index--) {
      char = argument[index];
      if (char != '/') break;
    }

    return (index < 0)
      ? argument
      : argument.substr(0, index+1);
  }

  /**
   *
   * 
   * @description get resource extension
   *
   * @static
   * 
   * @param { String } argument
   * 
   * @returns { String | null }
   * 
   * @memberof Rpath
   * 
   */
  static extension(argument) {
    const ext = path.extname(argument);
    if (ext.length <= 0) return null;
    return ext.substr(1);
  }

  /**
   *
   * 
   * @description get file mimetype
   *
   * @static
   * 
   * @param { String } extension
   * 
   * @returns { String }
   * 
   * @memberof Rpath
   * 
   */
  static mimetype(extension) {
    return (
      mimetypes.contentType(extension) ||
      'application/octect-stream'
    );
  }
}

module.exports = Rpath;
