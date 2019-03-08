class Assist {
  /**
   *
   * 
   * @description check string
   *
   * @static
   * 
   * @param {*} argument
   * 
   * @returns { Boolean }
   * 
   * @memberof Assist
   */
  static isstr(argument) {
    return typeof argument == 'string';
  }

  /**
   *
   * 
   * @description generate token obj
   *
   * @param { String } value
   * @param { String } [type=null]
   * 
   * @returns { Object | null }
   * 
   * @memberof Assist
   */
  static token(value, type=null) {
    const self = Assist;
    const { INT, FLT, STR, RNG } = self.consts();
  
    if (type == STR) return {
      type: STR,
      value: value
    };

    if (type == RNG) return {
      type: RNG,
      value: value
    };
    
    type = self.type(value);
    if (!type) return null;

    const parse = [ INT, FLT ];
    if (parse.includes(type)) {
      value = self.parse(value);

      if (!value) {
        return null;
      }
    }

    return {
      type: type,
      value: value
    }
  }

  /**
   *
   * 
   * @description symtags allowed
   *
   * @static
   * 
   * @returns { Object }
   * 
   * @memberof Assist
   */
  static symtags() {
    return {
      inline: [
        't+',
        't=',
        't$',
        't&'
      ],
      block: [
        't*',
        't%',
        't!%',
        't!'
      ]
    };
  }

  /**
   * 
   * 
   * @description app entities categories
   * 
   * @returns { Block }
   * 
   * @memberof Assist 
   */
  static categories() {
    return {
      categ_no_args_tags: [ 't!' ],
      categ_opener_tags: [ 't*', 't%' ],
      categ_if_siblings: [ 't!%', 't!' ]
    }
  }

  /**
   *
   * 
   * @description type of tag
   *
   * @static
   * 
   * @param { String } name
   * 
   * @memberof Assist
   */
  static tagtype(name) {
    const self = Assist;
    const { inline, block } = self.symtags();

    return (
      inline.includes(name)
        ? 'inline'
        : block.includes(name)
          ? 'block'
          : block.includes(name.substr(1))
            ? 'close'
            : null
    );
  }

  /**
   *
   * 
   * @description generate tag obj
   *
   * @static
   * 
   * @param { String } name
   * 
   * @memberof Assist
   */
  static newtag(name) {
    const self = Assist;

    const type = self.tagtype(name);
    if (!type) return null;

    const tagref = {
      token: 'tag',
      name: name,
      type: type,
      args: null
    }

    if (type == 'block') {
      tagref.children = [];
    }

    return tagref;
  }

  /**
   *
   * 
   * @description get name and args of tag
   *
   * @static
   * 
   * @param { String } argument
   * 
   * @returns { Object }
   * 
   * @memberof Assist
   */
  static tagsplit(argument) {
    const content = argument.substr(
      1, argument.length - 2
    );

    const split = content.split(' ');
    const tagname = split[0];
    let args = null;

    if (split.length > 1) {
      split.splice(0, 1);
      args = split.join(' ').trim();
      args = args == '' ? null : args;
    }

    return {
      name: tagname,
      args: args
    };
  }

  /**
   *
   * 
   * @description allowed operators
   *
   * @static
   * 
   * @returns { Array }
   * 
   * @memberof Assist
   */
  static ops() {
    return [
      //++ assignment
      ':=',
      //++ equality ops
      ':eq',
      ':ne',
      //++ num ops
      ':gt',
      ':lt',
      ':ge',
      ':le',
      //++ content ops
      ':in',
      //++ separators
      ':&', // and
      '::'  // or
    ];
  }

  /**
   *
   * 
   * @description allowed constants
   *
   * @static
   * 
   * @returns { Object }
   * 
   * @memberof Assist
   */
  static consts() {
    return {
      VAR: 'variable',
      STR: 'string',
      NUM: 'number',
      INT: 'integer',
      FLT: 'float',
      RNG: 'range',
      OPR: 'operator'
    }
  }


  /**
   *
   * 
   * @description decide token type
   *
   * @static
   * 
   * @param { String } argument
   * 
   * @returns { null | String }
   * 
   * @memberof Assist
   */
  static type(argument) {
    const self = Assist;

    const {
      OPR, INT,
      VAR, FLT
    } = self.consts();

    return self.isint(argument)
      ? INT
      : self.isfloat(argument)
        ? FLT
        : self.isopr(argument)
          ? OPR
          : self.isvar(argument)
            ? VAR
            : null;
  }

  /**
   *
   * 
   * @description check if operator
   *
   * @static
   * 
   * @param { String } argument
   * 
   * @returns { Boolean }
   * 
   * @memberof Assist
   */
  static isopr(argument) {
    const self = Assist;

    return (
      self.ops()
        .includes(argument)
    );
  }

  /**
   *
   * 
   * @description check if variable
   *
   * @static
   * 
   * @param { String } argument
   * 
   * @returns { Boolean }
   * 
   * @memberof Assist
   */
  static isvar(argument) {
    const self = Assist;

    return (
      self.isstr(argument) &&
      argument.match(/^[a-z]+[0-9]*$/) != null
    );
  }

  /**
   *
   * 
   * @description chk for integer syntax
   *
   * @static
   * 
   * @param { String } argument
   * 
   * @returns { Boolean }
   * 
   * @memberof Assist
   */
  static isint(argument) {
    const self = Assist;

    return (
      self.isstr(argument) &&
      argument.match(/^[0-9]+$/) != null
    );
  }

  /**
   *
   * 
   * @description chk for float syntax
   *
   * @static
   * 
   * @param { String } argument
   * 
   * @returns { Boolean }
   * 
   * @memberof Assist
   */
  static isfloat(argument) {
    const self = Assist;

    return (
      !self.isstr(argument) ||
      argument.match(/^[0-9]+\.[0-9]+$/) != null
    );
  }

  /**
   *
   * 
   * @description get actual value
   *
   * @static
   * 
   * @param { String } argument
   *  
   * @returns { * }
   * 
   * @memberof Assist
   */
  static parse(argument) {
    const self = Assist;

    return self.isint(argument)
      ? parseInt(argument)
      : self.isfloat(argument)
        ? parseFloat(argument, true)
        : null;
  }
}

module.exports = Assist;
