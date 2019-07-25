"use strict";

var _azureStorage = _interopRequireDefault(require("azure-storage"));

var _queue2 = _interopRequireDefault(require("./queue"));

var _table2 = _interopRequireDefault(require("./table"));

var _blob2 = _interopRequireDefault(require("./blob"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = createStorageSimple;

function createStorageSimple(storageAccountOrConnectionString, storageAccountKey) {
  var account = storageAccountOrConnectionString || process.env.AZURE_STORAGE_ACCOUNT || process.env.AZURE_STORAGE_CONNECTION_STRING;
  var key = storageAccountKey || process.env.AZURE_STORAGE_ACCESS_KEY || null;
  return {
    createTableService: function createTableService() {
      return _azureStorage["default"].createTableService(account, key);
    },
    createQueueService: function createQueueService() {
      return _azureStorage["default"].createQueueService(account, key);
    },
    createBlobService: function createBlobService() {
      return _azureStorage["default"].createBlobService(account, key);
    },
    queue: function queue(name) {
      return (0, _queue2["default"])(account, key, name);
    },
    table: function table(name) {
      return (0, _table2["default"])(account, key, name);
    },
    blob: function blob(name) {
      return (0, _blob2["default"])(account, key, name);
    }
  };
}