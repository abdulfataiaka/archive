const storage = {};
let subscribeCallback = null;

class Store {
  constructor() {
    this.subscribeArgs = [this.getStore];
  }

  /**
   *
   * 
   * @description add new field to storage
   *
   * @memberof Store
   */
  insert = (key, value, handler, groups) => {
    storage[key] = { value, handler, groups };
  }

  /**
   *
   * 
   * @description update storage with state
   *
   * @param { Object } state
   * 
   * @memberof Store
   */
  update = (state) => {
    Object.keys(state).map((key) => {
      const value = `${state[key]}`;
      storage[key].value = value;
    });

    this.callSubscribe();
  }

  /**
   *
   *
   * @description bind a callback to subscribe
   * 
   * @param { Function } callback
   *
   * @memberof Store
   */
  subscribe = (callback) => {
    callback(...this.subscribeArgs);
    subscribeCallback = callback;
  }
  
  /**
   *
   * 
   * @description get whole store
   *
   * @returns { Object }
   * 
   * @memberof Store
   */
  getStore = () => {
    const result = {};

    Object.keys(storage).map((key) => {
      result[key] = storage[key].value
    });

    return result;
  }

  /**
   *
   * 
   * @description get whole store
   *
   * @returns { Object }
   * 
   * @memberof Store
   */
  getState = (key) => storage[key].value;

  /**
   *
   * 
   * @description decide to call subscribe method if set
   *
   * @memberof Store
   */
  callSubscribe = () => {
    if (!subscribeCallback) return;
    subscribeCallback(...this.subscribeArgs);
  }
}

export default (new Store());
