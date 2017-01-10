'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global fetch */

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _handleResponse = require('./handleResponse');

var _handleResponse2 = _interopRequireDefault(_handleResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return fetch(this.__urlFor(path, query), this.__options({ method: 'DELETE' })).then(_handleResponse2.default);
    }
  }, {
    key: 'post',
    value: function post(path) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return fetch(this.__urlFor(path), this.__options({ body: JSON.stringify(data), method: 'POST' })).then(_handleResponse2.default);
    }
  }, {
    key: 'put',
    value: function put(path) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return fetch(this.__urlFor(path), this.__options({ body: JSON.stringify(data), method: 'PUT' })).then(_handleResponse2.default);
    }
  }, {
    key: 'request',
    value: function request(path) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return fetch(this.__urlFor(path, query), this.__options({ method: 'GET' })).then(_handleResponse2.default);
    }
  }, {
    key: '__options',
    value: function __options() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return _extends({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      }, options);
    }
  }, {
    key: '__urlFor',
    value: function __urlFor(path) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      query = Object.assign(query, this.__auth);

      var queryString = _queryString2.default.stringify(query);
      var url = this.__apiBase + path + '.json?' + queryString;

      return url;
    }
  }]);

  return Requester;
}();

exports.default = Requester;