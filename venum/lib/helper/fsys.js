const fs = require('fs');
/**
 *
 * 
 * @description file system ops
 *
 * @name Fsys
 * 
 * @static
 * 
 */
class Fsys {

  /**
   *
   * 
   * @description copy a file
   *
   * @static
   * 
   * @param { String } source
   * @param { String } destination
   * 
   * @returns { Boolean }
   * 
   * @memberof Fsys
   * 
   */
  static copy(source, destination) {
    if (!fs.existsSync(source)) {
      return false;
    }

    fs
      .createReadStream(source)
      .pipe(fs.createWriteStream(destination));

    return true;
  }

  /**
   *
   * 
   * @description read file content
   *
   * @static
   * 
   * @param { String } source
   * 
   * @returns { Boolean }
   * 
   * @memberof Fsys
   * 
   */
  static read(source) {
    if (
      !fs.existsSync(source) ||
      !fs.lstatSync(source).isFile()
    ) return false;
    
    return fs.readFileSync(source);
  }

  /**
   *
   * 
   * @description check if file
   *
   * @static
   * 
   * @param { String } source
   * 
   * @returns { Boolean }
   * 
   * @memberof Fsys
   * 
   */
  static isfile(source) {
    if (!fs.existsSync(source)) {
      return false;
    }

    return fs
      .lstatSync(source)
      .isFile();
  }

  /**
   *
   * 
   * @description check if directory
   *
   * @static
   * 
   * @param {*} source
   * 
   * @returns { Boolean }
   * 
   * @memberof Fsys
   * 
   */
  static isdir(source) {
    if (!fs.existsSync(source)) {
      return false;
    }

    return fs
      .lstatSync(source)
      .isDirectory();
  }
}

module.exports = Fsys;
