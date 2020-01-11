(function(window){
  'use strict';
  var App = window.App || {};
  var data = {};//私有化数据

  function DataStore(){
    this.data = {};
    // this.data = data;
  }

  DataStore.prototype.add = function(key, val){
    this.data[key] = val;
    // data[key] = val;
  };

  DataStore.prototype.get = function(key){
    return this.data[key];
    // return data[key];
  };

  DataStore.prototype.getAll = function(){
    return this.data;
    // return data;
  };

  DataStore.prototype.remove = function(key){
    delete this.data[key];
    // delete data[key];
  };

  App.DataStore = DataStore;
  window.App = App;
})(window);
