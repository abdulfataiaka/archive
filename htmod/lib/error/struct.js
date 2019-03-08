class StructError {
  static error(msg, line, coln) {
    return {
      message: msg,
      line: line,
      coln: coln
    }
  }

  static unclosed_tag(name, line, coln) {
    return StructError.error(
      `you have an unclosed block tag ${name}`,
      line, coln
    );
  }

  static no_open_block(name, line, coln) {
    return StructError.error(
      `no block opened for closing : ${name}`,
      line, coln
    );
  }

  static unexp_close_tag(tagstr, line, coln) {
    return StructError.error(
      `unexpected closing tag : ${tagstr}`,
      line, coln
    );
  }

  static tag_takes_no_args(name, line, coln) {
    return StructError.error(
      `tag does not take arguments : ${name}`,
      line, coln
    );
  }

  static tag_takes_args(name, line, coln) {
    return StructError.error(
      `tag requires an argument : ${name}`,
      line, coln
    );
  }

  static unexp_if_siblings(line, coln) {
    return StructError.error(
      'Does not allow any if siblings after t!',
      line, coln
    );
  }

  static no_open_if_block(line, coln) {
    return StructError.error(
      'No open if block for tag',
      line, coln
    );
  }
}

module.exports = StructError;

