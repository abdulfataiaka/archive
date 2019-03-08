/**
 * 
 * 
 * @description generic methods
 * 
 * @name Base
 * 
 * @static
 * 
 */
class Base {
  /**
   * 
   * 
   * @description check if argument is a string
   * 
   * @param {*} argument
   * 
   * @returns { Boolean }
   * 
   * @memberof Core
   * 
   */
  static isstr(argument) {
    return typeof argument == 'string';
  }

  /**
   * 
   * 
   * @description check if argument is an object
   * 
   * @param {*} argument
   * 
   * @returns { Boolean }
   * 
   * @memberof Core
   * 
   */
  static isobj(argument) {
    return (
      argument !== null &&
      typeof argument == 'object'
    );
  }

  /**
   * 
   * 
   * @description check if object has a key
   * 
   * @param { Object } haystack
   * @param { String } needle
   * 
   * @returns { Boolean }
   * 
   * @memberof Core
   * 
   */
  static haskey(haystack, needle) {
    return Object
      .keys(haystack)
      .includes(needle);
  }

  /**
   *
   * 
   * @description check if boolean
   *
   * @static
   * 
   * @param {*} argument
   * 
   * @returns { Boolean }
   * 
   * @memberof Base
   * 
   */
  static isbool(argument) {
    return (
      argument === true ||
      argument === false
    );
  }

  /**
   *
   * 
   * @description check if argument is an integer
   *
   * @static
   * 
   * @param {*} argument
   * 
   * @returns { Boolean }
   * 
   * @memberof Base
   * 
   */
  static isint(argument) {
    return Number.isInteger(argument);
  }

  /**
   *
   * 
   * @description check if argument is a function
   *
   * @static
   * 
   * @param {*} argument
   * 
   * @returns { Boolean }
   * 
   * @memberof Base
   * 
   */
  static isfunc(argument) {
    return typeof argument == 'function';
  }

  /**
   *
   * 
   * @description check if argument is array
   *
   * @static
   * 
   * @param {*} argument
   * 
   * @returns { Boolean }
   * 
   * @memberof Base
   * 
   */
  static isarr(argument) {
    return Array.isArray(argument);
  }

  /**
   *
   * 
   * @description caplitalize text
   *
   * @static
   * 
   * @param { String } argument
   * 
   * @returns { String }
   * 
   * @memberof Base
   * 
   */
  static title(argument) {
    if (argument.length == 0) {
      return argument.toUpperCase();
    }

    return (
      argument[0].toUpperCase() +
      argument.substr(1).toLowerCase()
    )
  }

  /**
   *
   * 
   * @description extract specific attribute
   *
   * @static
   * 
   * @param { Object } haystack
   * @param { Array } keys
   * 
   * @returns { Object }
   * 
   * @memberof Base
   * 
   */
  static pull(haystack, keys) {
    const result = {}

    let index;
    let key;
    for(index in keys) {
      key = keys[index];
      if (haystack[key] !== undefined) {
        result[key] = haystack[key];
      }
    }

    return result;
  }
}

module.exports = Base;
