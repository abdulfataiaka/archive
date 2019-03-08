//++ To register listeners and sennds events to the listeners
const guid  = require('guid');
const listeners = {};

module.exports = {
  register: function(cb) {
    const id = guid.raw();
    listeners[id] = cb;
    return id;
  },
  dispatch: function(payload) {
    console.log('Dispatching ', payload);
    for (id in listeners) {
      listeners[id](payload);
    }
  }
}