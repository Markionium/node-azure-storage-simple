"use strict";

var readEntity = require('./read-entity');

var writeEntity = require('./write-entity');

var deleteEntity = require('./delete-entity');

var queryTable = require('./query-table');

module.exports = function createTableWrapper(store, key, name) {
  return {
    read: function read(partitionKey, rowKey) {
      return readEntity(store, key, name, partitionKey, rowKey);
    },
    write: function write(partitionKey, rowKey, record) {
      return writeEntity(store, key, name, partitionKey, rowKey, record);
    },
    "delete": function _delete(partitionKey, rowKey) {
      return deleteEntity(store, key, name, partitionKey, rowKey);
    },
    query: function query() {
      return queryTable(store, key, name);
    }
  };
};