class ParserError {
  static error(msg, line, coln) {
    return {
      message: msg,
      line: line,
      coln: coln
    }
  }

  // static template(name, line, coln) {
  //   const self = ParserError;

  //   return self.error(
  //     `you have an unclosed block tag ${name}`,
  //     line, coln
  //   );
  // }
}

module.exports = ParserError;

