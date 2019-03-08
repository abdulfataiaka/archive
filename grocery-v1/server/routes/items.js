const GroceryItem = require('../models/GroceryItem');

module.exports = function (app) {
  app.route('/api/items')
    .get(function(req, res) {
      GroceryItem.find({}, function(error, items) {
        res.send(items);    
      });
    })
    .post(function(req, res) {
      const item = req.body;
      const groceryItem = new GroceryItem(item);
      groceryItem.save(function(error) {
        res.status(201).send();
      });
    });
  app.route('/api/items/:id')
    .delete(function(req, res) {
      const id = req.params.id;
      GroceryItem.deleteOne({ _id: id }, function(){
        res.status(200).send();
      });
    })
    .patch(function(req, res) {
      const id = req.params.id;
      GroceryItem.updateOne({ _id: id }, req.body, function() {
        res.status(200).send();
      });
    });
}
