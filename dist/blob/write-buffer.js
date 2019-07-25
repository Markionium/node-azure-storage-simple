"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = writeBuffer;

var _repromise = _interopRequireDefault(require("repromise"));

var _toStream = _interopRequireDefault(require("../convert/to-stream"));

var _fclone = _interopRequireDefault(require("fclone"));

var _zlib = _interopRequireDefault(require("zlib"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function writeBuffer() {
  for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
    params[_key] = arguments[_key];
  }

  return (0, _repromise["default"])(function () {
    return writeBufferPromise.apply(void 0, params);
  });
}

function writeBufferPromise(svc, containerName, path, options, data) {
  //options are optional
  if (typeof data === 'undefined') {
    data = options;
    options = {};
  } //must have a value


  if (typeof data === 'undefined' || data === null) return Promise.reject(new Error('No data specified'));

  try {
    if (typeof data === 'string') return saveText();
    if (!(data instanceof Buffer)) return saveJson();
    return saveBinary();
  } catch (err) {
    return Promise.reject(err);
  }

  function saveText() {
    data = new Buffer(data);
    options.contentType = options.contentType || 'text/plain, charset=UTF-8';
    return saveBinary();
  }

  function saveJson() {
    data = new Buffer(JSON.stringify((0, _fclone["default"])(data)));
    options.contentType = options.contentType || 'application/json';
    return saveBinary();
  }

  function saveBinary() {
    return new Promise(function (resolve, reject) {
      svc.createBlockBlobFromStream(containerName, path, (0, _toStream["default"])(data), data.length, options, function (err, result, response) {
        if (err) {
          err.detail = {
            response: response
          };
          return reject(err);
        }

        return resolve(result);
      });
    });
  }
}