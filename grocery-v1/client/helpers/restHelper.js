const $ = require('jquery');

module.exports = {
  get: function(url) {
    return new Promise(function(resolve, reject){
      $.ajax({
        url: url,
        dataType: 'json',
        success: resolve,
        error: reject
      });
    });
  },

  post: function(url, data) {
    return new Promise(function(resolve, reject){
      $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: resolve,
        error: reject
      });
    });
  },

  patch: function(url, data) {
    return new Promise(function(resolve, reject){
      $.ajax({
        url: url,
        type: 'PATCH',
        data: data,
        success: resolve,
        error: reject
      });
    });
  },

  deleteReq: function(url) {
    return new Promise(function(resolve, reject){
      $.ajax({
        url: url,
        type: 'DELETE',
        success: resolve,
        error: reject
      });
    });
  }
};