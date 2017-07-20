'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fetcher = require('./fetcher');

var _fetcher2 = _interopRequireDefault(_fetcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Requester = function () {
  function Requester(apiBase, auth) {
    _classCallCheck(this, Requester);

    this.__apiBase = apiBase;
    this.__auth = auth;
  }

  _createClass(Requester, [{
    key: 'delete',
    value: function _delete(path) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return (0, _fetcher2.default)(this.__path(path), _extends({ auth: this.__auth, method: 'DELETE' }, options));
    }
  }, {
    key: 'post',
    value: function post(path) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$body = _ref.body,
          body = _ref$body === undefined ? {} : _ref$body,
          options = _objectWithoutProperties(_ref, ['body']);

      return (0, _fetcher2.default)(this.__path(path), _extends({ auth: this.__auth, method: 'POST', body: JSON.stringify(body) }, options));
    }
  }, {
    key: 'put',
    value: function put(path) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$body = _ref2.body,
          body = _ref2$body === undefined ? {} : _ref2$body,
          options = _objectWithoutProperties(_ref2, ['body']);

      return (0, _fetcher2.default)(this.__path(path), _extends({ auth: this.__auth, method: 'PUT', body: JSON.stringify(body) }, options));
    }
  }, {
    key: 'request',
    value: function request(path) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return (0, _fetcher2.default)(this.__path(path), _extends({ auth: this.__auth, method: 'GET' }, options));
    }
  }, {
    key: '__path',
    value: function __path(path) {
      return this.__apiBase + path;
    }
  }]);

  return Requester;
}();

exports.default = Requester;