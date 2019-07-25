"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = readBuffer;

var _repromise = _interopRequireDefault(require("repromise"));

var _streamToBuffer = _interopRequireDefault(require("../convert/stream-to-buffer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function readBuffer() {
  for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
    params[_key] = arguments[_key];
  }

  return (0, _repromise["default"])(function () {
    return readBufferPromise.apply(void 0, params);
  });
}

function readBufferPromise(svc, containerName, path, options) {
  try {
    return (0, _streamToBuffer["default"])(svc.createReadStream(containerName, path, options));
  } catch (err) {
    return Promise.reject(err);
  }
}