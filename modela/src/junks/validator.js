import store from './store';
import Helper from './helper';
import Message from './message';

class Validator {

  static generateResult(message) {
    const result = { status: true, message: null};
    
    if(message) {
      result.status = false;
      result.message = message;
    }

    return result;
  }

  /**
   *
   * 
   * @description Validate transform object for defaults 
   * 
   * @param { Object } argument
   * 
   * @returns { Object }
   *
   * @memberof Validator
   */
  static checkSetTransforms(argument) {
    let message, key, value;

    if (!Helper.isNonEmptyObject(argument)) {
      message = Helper.strWithParams(Message.get(16), {
        patch: 'setTransforms function call',
        value: JSON.stringify(argument)
      });
    }
    
    else {
      for(key in argument) {
        value = argument[key];

        if (!store.hasField(key)) {
          message = Helper.strWithParams(
            Message.get(12), { field: key }
          ); break;
        }
        
        if(!store.hasTransform(value)) {
          message = Helper.strWithParams(
            Message.get(13), { transform: value }
          ); break;
        }
      }
    }

    return Validator.generateResult(message);
  }

  /**
   *
   * 
   * @description Validate transform object for register  
   * 
   * @param { Object } argument
   * 
   * @returns { Object }
   *
   * @memberof Validator
   */
  static checkNewTransforms(argument) {
    let message, key, value;

    if (!Helper.isNonEmptyObject(argument)) {
      message = Helper.strWithParams(Message.get(16), {
        patch: 'transforms function call',
        value: JSON.stringify(argument)
      });
    }

    else {
      for(key in argument) {
        value = argument[key];

        if (!Helper.isTransformName(key)) {
          message = Helper.strWithParams(
            Message.get(14), { name: key }
          ); break;
        }
        
        if(!Helper.isTransformFunc(value)) {
          message = Helper.strWithParams(
            Message.get(15), { name: key }
          ); break;
        }
      }
    }

    return Validator.generateResult(message);
  }

  /**
   *
   * 
   * @description Validate fields array
   * 
   * @param { Array } fields
   * 
   * @returns { Object }
   * 
   * @memberof Validator
   */
  static checkFields(fields) {
    let message = null;
    let field, index;

    if (!Array.isArray(fields) || fields.length === 0) {
      message = Message.get(9);
    } else {
      for(index in fields) {
        field = fields[index];

        if(!Helper.isString(field) || !store.hasField(field)) {
          message = Helper.strWithParams(
            Message.get(10), { field }
          ); break;
        }
      }
    }

    return Validator.generateResult(message);
  }

  /**
   *
   * 
   * @description Validate state object
   * 
   * @param { Object } state
   * 
   * @returns { Object }
   *
   * @memberof Validator
   */
  static checkState = (state) => {
    let key, value;
    let message = null;

    if (!Helper.isNonEmptyObject(state)) {
      message = Helper.strWithParams(Message.get(5), {
        object: JSON.stringify(state)
      });
    } else {
      for(key in state) {
        value = state[key];

        if(!store.hasField(key)) {
          message = Helper.strWithParams(Message.get(6), { key });
          break;
        }
      
        if(!Helper.isPimitive(value)) {
          message = Helper.strWithParams(Message.get(7), {
            value: JSON.stringify(value),
            key
          }); break;
        }
      }
    }

    return Validator.generateResult(message);
  }
}

export default Validator;
