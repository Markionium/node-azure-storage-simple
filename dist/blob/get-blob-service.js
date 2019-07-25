"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getBlobService;

var _azureStorage = _interopRequireDefault(require("azure-storage"));

var _repromise = _interopRequireDefault(require("repromise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var svcCache = {};
var nameChecked = {};

function getBlobService() {
  for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
    params[_key] = arguments[_key];
  }

  return (0, _repromise["default"])(function () {
    return getBlobServicePromise.apply(void 0, params);
  });
}

function getBlobServicePromise(store, key, name, options) {
  return new Promise(function (resolve, reject) {
    try {
      //key for caching service instances
      var svcCacheKey = [store, key].join('/'); //instance of azure queue service

      var svc = svcCache[svcCacheKey];

      if (!svc) {
        svc = svcCache[svcCacheKey] = _azureStorage["default"].createBlobService(store, key);
      } //the queue name has already been checked.


      if (nameChecked[name]) return resolve(svc); //check the queue name

      svc.createContainerIfNotExists(name, options, function (err, result, response) {
        if (err) {
          delete svcCache[svcCacheKey];
          delete nameChecked[name];
          err.detail = {
            response: response
          };
          return reject(err);
        }

        nameChecked[name] = true; //checked

        return resolve(svc);
      });
    } catch (err) {
      return reject(err);
    }
  });
}