'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createReadStream;

var _util = _interopRequireDefault(require("util"));

var _stream = _interopRequireDefault(require("stream"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function createReadStream(object, options) {
  return new MultiStream(object, options);
}

;

var MultiStream =
/*#__PURE__*/
function (_Stream$Readable) {
  _inherits(MultiStream, _Stream$Readable);

  function MultiStream(object, options) {
    var _this;

    _classCallCheck(this, MultiStream);

    if (object instanceof Buffer || typeof object === 'string') {
      options = options || {};
      _this = _possibleConstructorReturn(this, _getPrototypeOf(MultiStream).call(this, {
        highWaterMark: options.highWaterMark,
        encoding: options.encoding
      }));
    } else {
      _this = _possibleConstructorReturn(this, _getPrototypeOf(MultiStream).call(this, {
        objectMode: true
      }));
    }

    _this._object = object;
    return _possibleConstructorReturn(_this);
  }

  _createClass(MultiStream, [{
    key: "_read",
    value: function _read() {
      this.push(this._object);
      this._object = null;
    }
  }]);

  return MultiStream;
}(_stream["default"].Readable);