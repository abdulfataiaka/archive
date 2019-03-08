const Error = require('../error');
const Struct = require('../struct');
const ParserError = require('../error/parser');

class Parser {
  constructor(html) {
    const struct = new Struct(html);

    if (struct.error.is()) {
      this.error = struct.error;
      this.struct = null;
      this.irepr = null;
    }

    else {
      this.error = new Error();
      this.struct = struct.irepr;
      this.irepr = [];
    }

    this.process();
  }

  /**
   * 
   * 
   * @description start execution
   * 
   * @memberof Parser
   */
  process() {
    if (this.error.is()) {
      return;
    }

    let token;
    let index;
    for (index=0; index<this.struct.length; index++) {
      token = this.struct[index];
      console.log(token);
      console.log('');
    }
  }
}

module.exports = Parser;
