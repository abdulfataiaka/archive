import Helper from '../helper';
import Message from '../message';

const storage = {};
const storeGroups = {};
const storeHandles = {};
const defaultTransforms = {};
const storeTransforms = {};
let subscribeCallback = null;

class Store {
  /**
   * @description Creates an instance of Store.
   * 
   * @memberof Store
   */
  constructor() {
    this.subscribeProps = [
      this.getStore
    ];
  }

  

  /**
   *
   * 
   * @description
   * Add new field to state, this is only used when parsing page nodes
   *
   * @param { Array | Object } states
   * 
   * @memberof Store
   */
  insert = (modelaId, value, grpstr, node) => {
    storage[modelaId] = value;
    storeHandles[modelaId] = node;
    this.parseGroup(modelaId, grpstr);
  };

  /**
   *
   * 
   * @description update both store and node on view
   *
   * @memberof Store
   */
  update = (state) => {
    let value;

    Object.keys(state).map((key) => {
      value = `${state[key]}`;
      storage[key] = value;
      storeHandles[key].setValue(value);
    });
    
    this.callSubscribe();
  }

  /**
   *
   * 
   * @description register transform for use
   * 
   * @param { Object } transforms
   *
   * @memberof Store
   */
  addTransforms = (transforms) => {
    Object.keys(transforms).map(name => {
      storeTransforms[name] = transforms[name];
    });
  }

  /**
   *
   * 
   * @description register transform for use
   * 
   * @param { Object } transforms
   *
   * @memberof Store
   */
  setTransforms = (transforms) => {
    Object.keys(transforms).map(field => {
      defaultTransforms[field] = transforms[field];
    });
  }

  /**
   *
   * 
   * @description Get state using fields
   *
   * @returns { Object }
   * 
   * @memberof Store
   */
  fetchByFields = (fields) => {
    const result = {};
  
    fields.map((field) => {
      const transform = defaultTransforms[field];
      result[field] = this.execTransform(transform, storage[field]);
    });

    return result;
  }

  /**
   *
   * 
   * @description Get state using group name
   *
   * @returns { Object }
   * 
   * @memberof Store
   */
  fetchByGroup = (group) => {
    const fields = storeGroups[group];
    return this.fetchByFields(fields);
  }

  /**
   *
   * 
   * @description update store only
   *
   * @memberof Store
   */
  updateOnly = (state) => {
    Object.keys(state).map((key) => {
      storage[key] = `${state[key]}`;
    });

    this.callSubscribe();
  }

  execTransform = (transform, value) => {
    const executor = storeTransforms[transform];
    return executor ? executor(value) : value;
  }

  hasGroup = (group) => {
    return !!storeGroups[group];
  }

  hasTransform = (transform) => {
    return !!storeTransforms[transform];
  }

  

  /**
   *
   * 
   * @description Add node to group specified
   * This is only used when parsing page nodes
   *
   * @memberof Store
   */
  parseGroup = (modelaId, grpstr) => {
    if (grpstr === '') return;

    grpstr.split('|').map((groupId) => {
      storeGroups[groupId]
        ? storeGroups[groupId].push(modelaId)
        : storeGroups[groupId] = [modelaId]
    });
  }

  /**
   *
   * 
   * @description check if node with id exist
   * 
   * @param { String } modelId
   * 
   * @returns { Boolean }
   *
   * @memberof Store
   */
  hasField = (modelId) => !!storeHandles[modelId];

  /**
   *
   * 
   * @description
   *
   * @static
   * @memberof Helper
   */
  parseStoreSelector = (string) => {
    const result = string.split('|');
    let field = null;
    const transformers = [];

    let index, item;
    for(index in result) {
      item = result[index];

      if (index === 0) {
        if(!this.hasField(item)) {
          return { status: false, message: 'Field ' + item + ' does not exist' }
        } else (field = item);
      } else {
        if(!this.hasTransform(item)) {
          return { status: false, message: 'Transform ' + item + ' does not exist' }
        } else transformers.push(item);
      }
    }

    return [field, transformers];
  }
}

export default (new Store());
