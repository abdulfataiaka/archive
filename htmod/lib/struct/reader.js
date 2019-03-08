const Assist = require('../assist');

class Reader {
  constructor(html) {
    this.html = html;
    this.initialize();

    this.ipos = 0;
    this.line = 0;
    this.coln = 0;

    this.comment = false;
    this.stdin = '';

    this.open = {
      status: false,
      stdin: ''
    }
  }

  /**
   * 
   * 
   * @description handle in comment
   * 
   * @memberof Reader
   */
  comment_block(char) {
    const chars = this.prevchrs(2);
    this.stdin += char;

    if (char == '>' && chars[0] == '-' && chars[1] == '-'){
      this.comment = false;
    }
  }

  /**
   * 
   * 
   * @description handle in open tag
   * 
   * @memberof Reader
   */
  open_block(char) {
    this.open.stdin += char;
    if (char != '>') {
      return;
    }

    const content = this.open.stdin;
    const itag = Assist.tagsplit(content);
    const { name, args } = itag;
    const newtag = Assist.newtag(name);
    
    this.open.status = false;
    this.open.stdin = '';

    if (!newtag) {
      this.stdin += content;
      return;
    }

    newtag.args = args;
    return newtag;
  }

  /**
   * 
   * 
   * @description handle char
   * 
   * @returns { None }
   * 
   * @memberof Reader
   */
  process() {
    if(!this.is()) {
      return null;
    }

    let char;
    let chars;

    let newtag = null;
    while((char = this.getchar())) {
      if (this.comment) {
        this.comment_block(char);
      }

      else if (this.open.status) {
        newtag = this.open_block(char);
        if (newtag) break;
      }

      else if (char == '<') {
        chars = this.nextchrs(3);
        if (chars[0] == '!' && chars[1] == '-' && chars[2] == '-') {
          this.stdin += char;
          this.comment = true;
          continue;
        }

        this.open.status = true;
        this.open.stdin += char;
      }

      else { this.stdin += char; }
    }

    return newtag
      ? newtag
      : null;
  }

  /**
   * 
   * 
   * @description get next to tag read
   * 
   * @returns { Array | null}
   */
  next() {
    const newtag = this.process();
    const bftag = this.stdin == ''
      ? null
      : this.stdin;

    this.stdin = '';
    
    return (
      bftag == null &&
      newtag == null
    ) ? null : [bftag, newtag ];
  }

  /**
   * 
   * 
   * @description cursor details
   * 
   * @returns { Object }
   * 
   * @memberof Reader
   */
  cursor() {
    return {
      ipos: this.ipos,
      line: this.line,
      coln: this.coln
    }
  }
  /**
   *
   * 
   * @description read next character
   *
   * @returns { null | Stirng }
   * 
   * @memberof Struct
   */
  getchar() {
    const char = this.html[this.ipos];
    if (char === undefined)
      return null;

    if (char == '\n') {
      this.line++;
      this.coln = -1;
    }

    this.ipos++;
    this.coln++;
    return char;
  }

  /**
   * 
   * 
   * @description check reader status
   * 
   * @returns { Boolean }
   * 
   * @memberof Reader
   */
  is() { return this.html !== null; }

  /**
   *
   * 
   * @description check and update html
   * 
   * @memberof Struct 
   */
  initialize() {
    const html = this.html;

    this.html =
      Buffer.isBuffer(html)
        ? html.toString('utf8')
        : Assist.isstr(html)
          ? html
          : null;
  }

  /**
   *
   * 
   * @description get next chars
   *
   * @param { Integer } count
   * 
   * @returns { Array }
   * 
   * @memberof Reader
   */
  nextchrs(count) {
    const chars = [];
    let i;
    let char;

    for (i=0; i<count; i++) {
      char = this.html[this.ipos + i];
      char = char == undefined ? null : char;
      chars.push(char);
    }
    
    return chars;
  }

  /**
   *
   * 
   * @description get prev chars
   *
   * @param { Integer } count
   * 
   * @returns { Array }
   * 
   * @memberof Reader
   */
  prevchrs(count) {
    const chars = [];
    let i;
    let char;

    for (i=0; i<count; i++) {
      char = this.html[this.ipos - i - 2];
      char = char == undefined ? null : char;
      chars.push(char);
    }
    
    return chars.reverse();
  }
}

module.exports = Reader;
