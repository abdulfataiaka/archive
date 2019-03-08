const Error = require('../error');
const Reader = require('./reader');
const Assist = require('../assist');
const StructError = require('../error/struct');

const {
  categ_no_args_tags, categ_opener_tags,
  categ_if_siblings
} = Assist.categories();

class Struct {
  constructor(html) {

    this.reader = new Reader(html);
    this.error = new Error();
    
    this.irepr = [];
    this.blkrefs = [];

    this.open = {
      status: false,
      stdin: ''
    }

    this.process();
  }

  /**
   *
   * 
   * @description kickstart execution
   *
   * @memberof Struct
   */
  process() {
    if (!this.reader.is()) {
      return;
    }

    let dest;
    let read;
    let html;
    let itag;
    let blk;

    while((read = this.reader.next())) {
      html = read[0];
      itag = read[1];
      blk = this.opened_block();

      dest = !blk
        ? this.irepr
        : blk.children;
      
      dest.push({
        token: 'text',
        text: html
      });
      
      if (!itag) { continue; }

      const checks = this.itag_checks(itag);
      if(!checks) { break; }
      
      if (itag.type == 'inline') {
        dest.push(itag);
      }

      else if (categ_opener_tags.includes(itag.name)) {
        dest.push(itag);
        this.blkrefs.push(itag);
      }

      else if (itag.type == 'close') {
        this.close_open_block(blk, itag);
      }

      else if (categ_if_siblings.includes(itag.name)) {
        this.handle_if_siblings(blk, itag);
      }
    }

    this.handle_finish();
  }

  /**
   * 
   * 
   * @description check tag syntax
   * 
   * @returns { true | undefined }
   * 
   * @param { Object } itag 
   */
  itag_checks(itag) {
    if (itag.type == 'close') {
      if(itag.args !== null) {
        this.error.stack(
          StructError.tag_takes_no_args(itag.name, 0, 0)
        ); return;
      }

      return true;
    }

    if (
      !categ_no_args_tags.includes(itag.name) &&
      itag.args === null
    ) {
      this.error.stack(
        StructError.tag_takes_args(itag.name, 0, 0)
      ); return;
    }

    if (
      categ_no_args_tags.includes(itag.name) &&
      itag.args !== null
    ) {
      this.error.stack(
        StructError.tag_takes_no_args(itag.name, 0, 0)
      ); return;
    }

    return true;
  }

  /**
   *
   * 
   * @description get latest open block
   * 
   * @memberof Struct
   */
  opened_block() {
    const blk = this.blkrefs[
      this.blkrefs.length - 1
    ];

    return blk === undefined
      ? null
      : blk;
  }

  /**
   * 
   * 
   * @description handle ops at EOF
   * 
   * @memberof Struct
   */
  handle_finish() {
    if (!this.error.is() && this.blkrefs.length > 0) {
      this.error.stack(
        StructError.unclosed_tag(
          this.blkrefs[this.blkrefs.length - 1]['name'],
          0, 0
        )
      );
    }

    if (this.error.is()) {
      this.irepr = null;
    }
  }

  /**
   * 
   * 
   * @description close open block
   * 
   * @param { Object } blk 
   * 
   * @memberof Struct
   */
  close_open_block(blk, itag) {
    if (!blk) {
      this.error.stack(
        StructError.no_open_block(itag.name, 0, 0)
      ); return;
    }

    if (itag.name == '/t*'){
      this.close_loop_block(blk);
    }

    else if (itag.name == '/t%'){
      this.close_if_block(blk);
    }
  }

  /**
   * 
   * 
   * @description close loop block tag
   * 
   * @param { Object } blk 
   * 
   * @memberof Struct
   */
  close_loop_block(blk) {
    if (blk.name != 't*') {
      this.error.stack(
        StructError.unexp_close_tag('</t*>', 0, 0)
      ); return;
    }

    this.blkrefs.pop();
  }

  /**
   * 
   * 
   * @description close if block tag
   * 
   * @param { Object } blk 
   * 
   * @memberof Struct
   */
  close_if_block(blk) {
    if (categ_if_siblings.includes(blk.name)) {
      this.blkrefs.pop();
    }

    blk = this.opened_block();
    if (blk.name != 't%') {
      this.error.stack(
        StructError.unexp_close_tag('</t%>', 0, 0)
      ); return;
    }

    this.blkrefs.pop();
  }

  /**
   * 
   * 
   * @description handle if siblings
   * 
   * @param { Object } blk 
   * 
   * @memberof Struct
   */
  handle_if_siblings(blk, itag) {
    if (!blk) {
      this.error.stack(
        StructError.no_open_if_block(0, 0)
      ); return;
    }

    if (blk.name == 't!') {
      this.error.stack(
        StructError.unexp_if_siblings(0, 0)
      ); return;
    }

    if (blk.name == 't%') {
      blk.siblings = [];
    }

    else {
      this.blkrefs.pop();
      blk = this.opened_block();
    }

    blk.siblings.push(itag);
    this.blkrefs.push(itag);
  }
}

module.exports = Struct;
