const React = require('react');
const createReactClass = require('create-react-class');
const GroceryItem = require('./GroceryItem.jsx');
const GroceryListAddItem = require('./GroceryListAddItem.jsx');

//++ The basic react class component
module.exports = createReactClass({
  render: function() {
    return (
      <div>
        <h1>Grocery Listify</h1>
        <br />
        <div>
          {
            this.props.items.map(function(item, index) {
              return <GroceryItem key={index} item={item} />
            })
          }
        </div>
        <br />
        <GroceryListAddItem />
      </div>
    );
  }
});
