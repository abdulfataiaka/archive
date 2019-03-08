import config from './config';
import Message from './message';

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
   * @description check if jquery is available
   *
   * @static
   * 
   * @returns { Boolean }
   * 
   * @memberof Helper
   */
  static hasJQuery() {  
    try {
      if(!$) { return false; }
      Helper.stdout(Message.get(0), false);
      return true;
    }
    catch(e) {}

    self.stdout(Message.get(1), false);
    return false;
  }
}

export default Helper;
