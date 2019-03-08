const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroceryItemSchema = new Schema({
  id:String,
  name: String,
  purchased: Boolean
});

//++ register a new model ( name, schema, docname )
const GroceryItem = mongoose.model(
  'GroceryItem',
  GroceryItemSchema,
  'groceryItems'
);

module.exports = GroceryItem;
