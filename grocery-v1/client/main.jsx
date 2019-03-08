const React = require('react');
const ReactDOM = require('react-dom');
const GroceryItemList = require('./components/GroceryItemList.jsx');
const  groceryItemStore = require('./stores/GroceryItemStore');

let initials = groceryItemStore.getItems();

function render() {
  ReactDOM.render(<GroceryItemList items={initials} />, document.getElementById('app'));
}

groceryItemStore.onChange(function(items) {
  initials = items;
  render();
});

render();
