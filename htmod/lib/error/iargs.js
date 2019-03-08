class IArgsError {
  static error(msg, line, coln) {
    return {
      message: msg,
      line: line,
      coln: coln
    }
  }

  static quote_end_char_unexp(char, line, coln) {
    const self = IArgsError;

    return self.error(
      `unexpected character after ending quote : ${char}`,
      line, coln
    );
  }

  static invalid_range_operand(operand, line, coln) {
    const self = IArgsError;

    return self.error(
      `invalid range operand type : ${operand}`,
      line, coln
    );
  }

  static range_next_char_unexp(char, line, coln) {
    const self = IArgsError;

    return self.error(
      `unexpected character after ending range : ${char}`,
      line, coln
    );
  }

  static no_range_start(line, coln) {
    const self = IArgsError;

    return self.error(
      'no range start provided',
      line, coln
    );
  }

  static unexp_range_operands_count(line, coln) {
    const self = IArgsError;

    return self.error(
      'incomplete operand count for range',
      line, coln
    );
  }

  static unexp_token(token, line, coln) {
    const self = IArgsError;

    return self.error(
      `unexpected token : ${token}`,
      line, coln
    );
  }

  static unexp_character(char, line, coln) {
    const self = IArgsError;

    return self.error(
      `unexpected character : ${char}`,
      line, coln
    );
  }

  static unclosed_string(line, coln) {
    const self = IArgsError;

    return self.error(
      'No closing for string',
      line, coln
    );
  }

  static unclosed_range(line, coln) {
    const self = IArgsError;

    return self.error(
      'No closing for range',
      line, coln
    );
  }
}

module.exports = IArgsError;

