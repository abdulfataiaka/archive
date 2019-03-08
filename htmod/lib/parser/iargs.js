const Error = require('../error');
const IArgsError = require('../error/iargs');

const Assist = require('../assist');
//++ destructure type contants
const { STR, RNG } = Assist.consts();

class IArgs {
  constructor() {}

  /**
   *
   * 
   * @description reset instance variables
   *
   * @memberof IArgs
   */
  initialize() {
    this.stdin = '';
    this.tokens = [];

    this.error = new Error();
    
    this.string = {
      quote: null,
      stdin: null
    }
    
    this.range = {
      on: false,
      stdin: null,
      start: null,
      end: null
    }
  }

  /**
   *
   * 
   * @description start args parsing
   *
   * @param { String | null } argstr
   * 
   * @memberof IArgs
   */
  process(argstr) {
    if (argstr == null) {
      return null;
    }

    this.initialize();

    let i;
    for(i=0; i<argstr.length; i++){
      if (this.error.is()) break;

      const { prev, char, next } = (
        this.getchars(argstr, i)
      );

      if (this.string.quote) {
        this.string_block(char, next); 
      }

      else if (this.range.on) {
        this.range_block(char, next); 
      }

      else if(char == ' ') {
        this.token_end_block();
      }

      else {
        this.opener_block(prev, char);
      }
    }

    this.handle_finish();

    return this.error.is()
      ? this.error
      : this.tokens;
  }

  /**
   *
   * 
   * @description read string
   *
   * @param { String | null } char
   * @param { String | null } next
   * 
   * @memberof IArgs
   */
  string_block(char, next) {
    if (char == this.string.quote){
      if (next == null || next == ' ') {
        this.string.quote = null;
      }

      else {
        this.error.stack(
          IArgsError.quote_end_char_unexp(char, 0, 0)
        );
      }
    }

    else {
      this.string.stdin += char;
    }
  }

  /**
   *
   * 
   * @description read RANGE
   *
   * @param { String | null } char
   * @param { String | null } next
   * 
   * @memberof IArgs
   */
  range_block(char, next) {
    if (!this.range_check(char, next)) {
      return;
    }
  
    if (char != ',' && char != '|') {
      this.range.stdin += char;
      return;
    }

    const operand = this.range.stdin.trim();
    this.range.stdin = '';

    if (operand == '') {
      this.error.stack(
        IArgsError.unexp_range_operands_count(0, 0)
      ); return;
    }

    const number = Assist.isint(operand)
      ? parseInt(operand)
      : null;

    if (!number) {
      this.error.stack(
        IArgsError.invalid_range_operand(operand, 0, 0)
      ); return;
    }

    if (char == ',') {
      this.range.start = number;
    }

    else {
      this.range.end = number;
      this.range.on = false;
      this.range.stdin = null;
    }
  }

  /**
   *
   * 
   * @description handle space
   * 
   * @memberof IArgs
   */
  token_end_block() {
    if (this.string.stdin != null) {
      this.tokens.push(Assist.token(
        this.string.stdin, STR
      ));
      
      this.string.stdin = null;
      return;
    }

    if (this.range.end) {
      const { start, end } = this.range;
      this.tokens.push(Assist.token(
        [start, end], RNG
      ));
      
      this.range.start = null;
      this.range.end = null;
      return;
    }

    const tokenstr = this.stdin.trim();
    this.stdin = '';

    if (tokenstr == '') return; 
    const token = Assist.token(tokenstr);

    if (!token) {
      this.error.stack(
        IArgsError.unexp_token(tokenstr, 0, 0)
      ); return;
    }

    this.tokens.push(token);
  }

  /**
   *
   * 
   * @description handle openers
   *
   * @param { String } prev
   * @param { String } char
   * 
   * @memberof IArgs
   */
  opener_block(prev, char) {
    if (['"', "'", '|'].includes(char) && !(prev == null || prev == ' ')) {
      this.error.stack(
        IArgsError.unexp_character(char, 0, 0)
      );
    }

    else if (['"', "'"].includes(char)) {
      this.string.quote = char;
      this.string.stdin = '';
    }

    else if (char == "|") {
      this.range.on = true;
      this.range.stdin = '';
    }

    else {
      this.stdin += char;
    }
  }

  /**
   *
   * 
   * @description run wrapup processing
   *
   * @memberof IArgs
   */
  handle_finish() {
    if(!this.error.is() && this.string.quote != null) {
      this.error.stack(
        IArgsError.unclosed_string(0, 0)
      ); return;
    }

    else if (!this.error.is() && this.range.on) {
      this.error.stack(
        IArgsError.unclosed_range(0, 0)
      ); return;
    }

    this.token_end_block();
  }

  /**
   * 
   * 
   * @description check range chars
   * 
   * @param { String } char 
   * @param { String } next
   * 
   * @returns { true | undefined }
   * 
   * @memberof IArgs
   */
  range_check(char, next) {
    if(char == ',' && this.range.start != null) {
      this.error.stack(
        IArgsError.no_range_start(0, 0)
      ); return;
    }

    if(char == '|' && this.range.start == null) {
      this.error.stack(
        IArgsError.unexp_range_operands_count(0, 0)
      ); return;
    }

    if (char == '|' && !(next == null || next == ' ')) {
      this.error.stack(
        IArgsError.range_next_char_unexp(char, 0, 0)
      ); return;
    }

    return true;
  }

  /**
   *
   * 
   * @description read prev, current and next chars
   *
   * @param { String } argstr
   * @param { Integer } index
   * 
   * @returns { Object }
   * 
   * @memberof IArgs
   */
  getchars(argstr, index) {
    const char = argstr[index];
    let prev = argstr[index - 1];
    let next = argstr[index + 1];

    prev = prev === undefined
      ? null
      : prev; 
  
    next = next === undefined
      ? null
      : next; 

    return {
      prev: prev,
      char: char,
      next: next
    }
  }
}

module.exports = IArgs;
