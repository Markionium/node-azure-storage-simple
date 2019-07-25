"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createBlobWrapper;

var _getBlobService = _interopRequireDefault(require("./get-blob-service"));

var _readBuffer = _interopRequireDefault(require("./read-buffer"));

var _writeBuffer = _interopRequireDefault(require("./write-buffer"));

var _deleteBlob = _interopRequireDefault(require("./delete-blob"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function createBlobWrapper(store, key, containerName, containerOptions) {
  return {
    // (path, [options]) => Buffer
    read: function read() {
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      return (0, _getBlobService["default"])(store, key, containerName, containerOptions).then(function (svc) {
        return _readBuffer["default"].apply(void 0, [svc, containerName].concat(params));
      });
    } // (path, [options], Buffer) => ...
    ,
    write: function write() {
      for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        params[_key2] = arguments[_key2];
      }

      return (0, _getBlobService["default"])(store, key, containerName, containerOptions).then(function (svc) {
        return _writeBuffer["default"].apply(void 0, [svc, containerName].concat(params));
      });
    } // (path, [options]) => ...
    ,
    "delete": function _delete() {
      for (var _len3 = arguments.length, params = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        params[_key3] = arguments[_key3];
      }

      return (0, _getBlobService["default"])(store, key, containerName, containerOptions).then(function (svc) {
        return _deleteBlob["default"].apply(void 0, [svc, containerName].concat(params));
      });
    }
  };
}

;