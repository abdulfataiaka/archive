const mongoose = require('mongoose');
const GroceryItem = require('./models/GroceryItem');

mongoose.connect('mongodb://localhost:27017/grocery', { useNewUrlParser: true }, function() {
  console.log('Mongoose connected to mongodb database');

  mongoose.connection.db.dropDatabase();

  const items = [
    { name: 'Ice cream' },
    { name: 'Waffles' },
    { name: 'Canndy', purchased: true },
    { name: 'Snarks' },
  ];

  items.forEach(function(item) {
    const groceryItem = new GroceryItem(item);
    groceryItem.save();
  });
});
