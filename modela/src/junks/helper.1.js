import config from '../config';
import Message from '../message';

class Helper {

  /**
   *
   * 
   * @description check if node name is valid e.g nameName1234
   *
   * @static
   * 
   * @returns { Boolean }
   * 
   * @memberof Helper
   */
  static isNodeName(name) {
    return !!(name.match(/^([a-z]+[A-Z]*)+[0-9]*$/));
  }

  /**
   *
   * 
   * @description check if group string is valid e.g grp1|grp2
   *
   * @static
   * 
   * @returns { Boolean }
   * 
   * @memberof Helper
   */
  static isGroupString(name) {
    return !!(name.match(/^([a-z]+[0-9]*)(\|[a-z]+[0-9]*)*$/));
  }

  /**
   *
   * 
   * @description output to terminal
   *
   * @static
   * 
   * @param {string} string
   * @param {Boolean} debug
   * 
   * @memberof Helper
   */
  static stdout(string, debug=true) {
    if (!debug || config.debug) {
      console.log(`[modelaUI] ${string}`);
    }
  }










  



  /**
   *
   * 
   * @description check if transform name is valid
   *
   * @static
   * 
   * @returns { Boolean }
   * 
   * @memberof Helper
   */
  static isTransformName(name) {
    const match = name.match(/^([a-z]+)(:[a-z]+)*$/);
    return match !== null;
  }

  static isTransformFunc(func) {
    return (
      typeof func === 'function' &&
      func.length === 1
    );
  }

  /**
   *
   * 
   * @description check if jquery is available
   *
   * @static
   * 
   * @returns { Boolean }
   * 
   * @memberof Helper
   */
  static hasJQuery() {
    const self = Helper;
  
    try {
      if($) {
        self.stdout(Message.get(0), false);
        return true;
      }
    }
    catch(e) {}

    self.stdout(Message.get(1), false);
    return false;
  }

  static isPimitive(argument) {
    return (
      ['string', 'boolean', 'number']
        .includes(typeof argument)
    );
  }

  /**
   *
   * 
   * @description Check if string
   *
   * @static
   * 
   * @param { * } argument
   * 
   * @returns { Boolean }
   * 
   * @memberof Helper
   */
  static isString(argument) {
    return typeof argument === 'string';
  }

  /**
   *
   * 
   * @description Check if argument is a nonn empty object
   *
   * @static
   * 
   * @param { * } argument
   * 
   * @returns { Boolean }
   * 
   * @memberof Helper
   */
  static isNonEmptyObject(argument) {
    return (
      argument !== null &&
      !Array.isArray(argument) &&
      typeof argument === 'object' &&
      Object.keys(argument).length
    );
  }
}

export default Helper;
