import store from './store';

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
   * @param { Function } callback
   *
   * @memberof Modela
   */
  static subscribe = (callback) => {
    // validate callback function
    store.subscribe(callback);
  }

  /**
   *
   * 
   * @description get store as object
   *
   * @returns { Object }
   * 
   * @memberof Modela
   */
  static store = () => store.getStore();
}

export default Modela;
