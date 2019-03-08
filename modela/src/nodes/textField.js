import store from '../store';

class TextField {
  /**
   * @description Creates an instance of TextField.
   * 
   * @param { String } modelaId
   * @param { Object } element
   * 
   * @memberof TextField
   */
  constructor(name, element) {
    this.$element = element;
    this.name = name;
    this.bindToChange();
  }

  /**
   *
   * 
   * @description Get node value from DOM
   *
   * @returns { String }
   * 
   * @memberof TextField
   */
  getValue = () => (this.$element.val());
  
  /**
   *
   * 
   * @description Set value for node in DOM
   *
   * @returns { Boolean }
   * 
   * @memberof TextField
   */
  setValue = (value) => (this.$element.val(value));

  /**
   *
   * 
   * @description Listen for changes on node
   * 
   * @memberof TextField
   */
  bindToChange = () => {
    this.$element.on('keyup', (event) => {
      const value = event.target.value;

      if (store.getState(this.name) !== value) {
        store.update({ [this.name]: value });
      }
    });
  }
}

export default TextField;
