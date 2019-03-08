import store from './store';
import Helper from './helper';
import Validator from './validator';
import Message from './message';

/**
 *
 * 
 * @description Methods and attributes available to end users
 *
 * @class Modela
 */
class Modela {
  /**
   *
   * 
   * @description set a callback for subscribe
   *
   * @memberof Modela
   */
  subscribe = (callback) => store.subscribe(callback);

  /**
   *
   * 
   * @description get store as object
   *
   * @returns { Object }
   * 
   * @memberof Modela
   */
  getStore = () => store.getStore();

  /**
   *
   * 
   * @description update store with new data
   * 
   * @param { Array | Object } states
   *
   * @memberof Modela
   */
  setState = (state) => {    
    if (typeof state === 'function') {
      state = state(store.getStore());
    }

    const result = Validator.checkState(state);
    if(!result.status) {
      Helper.stdout(result.message);
      return false;
    }

    store.update(state);
    return true;
  }

  /**
   *
   * 
   * @description Get state values
   * 
   * @param { String | Array } argument
   *
   * @returns { null | Object }
   * 
   * @memberof Modela
   */
  getState = (argument) => {
    if(!Helper.isString(argument)) {
      const result = Validator.checkFields(argument);

      if(!result.status) {
        Helper.stdout(result.message);
        return {};
      } return store.fetchByFields(argument);
    }
    
    //++ handle string argument as group
    if (!store.hasGroup(argument)) {
      Helper.stdout(Helper.strWithParams(Message.get(11), {
        group: argument
      })); return {};
    } return store.fetchByGroup(argument); 
  }

  /**
   *
   * 
   * @description Register tranformer functions
   * 
   * @param { Object } argument
   *
   * @returns { Boolean }
   * 
   * @memberof Modela
   */
  transforms = (argument) => {
    const result = Validator.checkNewTransforms(argument);
    
    if (!result.status) {
      Helper.stdout(result.message);
      return false;
    }

    store.addTransforms(argument);
    return true;
  }

  /**
   *
   * 
   * @description Set default tranformer functions for fields
   * 
   * @param { Object } argument
   *
   * @returns { Boolean }
   * 
   * @memberof Modela
   */
  setTransforms = (argument) => {
    const result = Validator.checkSetTransforms(argument);

    if (!result.status) {
      Helper.stdout(result.message);
      return false;
    }

    store.setTransforms(argument);
    return true;
  }
}

export default (new Modela());
