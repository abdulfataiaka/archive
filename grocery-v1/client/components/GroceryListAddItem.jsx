const React = require('react');
const createReactClass = require('create-react-class');
const action = require('../actions/GroceryItemActionCreator.js'); 

module.exports = createReactClass({
  getInitialState: function() {
    return {
      input: ''
    }
  },
  handleInputName: function(e) {
    this.setState({ input: e.target.value });
  },

  addItem: function(e) {
    e.preventDefault();
    action.add({ name: this.state.input });
    this.setState({ input: '' });
  },

  render: function() {
    return (
      <div className="grocery-add-item">
        <form onSubmit={this.addItem} >
          <input value={this.state.input} type="text" onChange={this.handleInputName} />
          <button style={{ marginLeft: '20px' }}>Add Item</button>
        </form>
      </div>
    );
  }
});