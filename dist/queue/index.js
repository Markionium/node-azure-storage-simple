"use strict";

var addOne = require('./add-one');

var getOne = require('./get-one');

var doneOne = require('./mark-one-done');

module.exports = function createQueueWrapper(store, key, name) {
  return {
    add: function add(value) {
      return addOne(store, key, name, value);
    },
    one: function one() {
      return getOne(store, key, name);
    },
    done: function done(message) {
      return doneOne(store, key, name, message);
    }
  };
};