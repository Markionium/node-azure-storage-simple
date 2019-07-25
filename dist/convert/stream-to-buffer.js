"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = streamToBuffer;

var _streamToArray = _interopRequireDefault(require("./stream-to-array"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function streamToBuffer(stream) {
  return (0, _streamToArray["default"])(stream).then(function (ary) {
    return Buffer.concat(ary);
  });
}