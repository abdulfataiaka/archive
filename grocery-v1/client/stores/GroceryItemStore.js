const dispatcher = require('../dispatcher');
const helper = require('../helpers/restHelper');

function GroceryItemStore() {
  let items = [];
  const listeners = [];

  helper.get('/api/items')
    .then(function(_items) {
      items = _items;
      triggerListeners();
    })
    .catch(function(error) {});
  
  function getItems() {
    return items;
  }

  function addGroceryItem(item) {
    items.push(item);
    triggerListeners();

    helper.post('/api/items', item);
  }

  function deleteGroceryItem(item) {
    let index;
    items.filter(function(_item, _index) {
      if(_item.name === item.name) index = _index;
    });
    
    items.splice(index, 1);
    triggerListeners();

    helper.deleteReq(`/api/items/${item._id}`);
  }

  function setGroceryItemBought(item, status) {
    const filtered = items.filter(function(_item, _index) {
      return _item.name === item.name;
    })[0];

    filtered.purchased = status;
    triggerListeners();

    helper.patch(`/api/items/${item._id}`, { purchased: item.purchased });
  }

  function onChange(listener) {
    listeners.push(listener);
  }
  
  function triggerListeners() {
    listeners.forEach(function (listener) {
      listener(items);
    });
  }

  dispatcher.register(function(event) {
    const split =  event.type.split(':');
    if (split[0] === 'grocery-item') {
      switch(split[1]) {
        case 'add': addGroceryItem(event.payload); break;
        case 'delete': deleteGroceryItem(event.payload); break;
        case 'buy': setGroceryItemBought(event.payload, true); break;
        case 'unbuy': setGroceryItemBought(event.payload, false); break;
      }
    }
  });

  return {
    getItems: getItems,
    onChange: onChange
  };
}

module.exports = new GroceryItemStore();
