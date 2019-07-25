"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = deleteBlob;

var _repromise = _interopRequireDefault(require("repromise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function deleteBlob() {
  for (var _len = arguments.length, options = new Array(_len), _key = 0; _key < _len; _key++) {
    options[_key] = arguments[_key];
  }

  return (0, _repromise["default"])(function () {
    return deleteBlobPromise.apply(void 0, options);
  })["catch"](function (err) {
    return console.error(err.stack);
  });
}

function deleteBlobPromise(svc, containerName, path, options) {
  return new Promise(function (resolve, reject) {
    svc.deleteBlob(containerName, path, options, function (err, response) {
      try {
        if (err) {
          if (response && response.statusCode == 404) return resolve(null); //bury errors for 404 response

          err.detail = {
            response: response
          };
          return reject(err);
        }

        return resolve(null);
      } catch (err) {
        return reject(err);
      }
    });
  });
}