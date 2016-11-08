'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global fetch */

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _Error = require('./Error');

var _Error2 = _interopRequireDefault(_Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Requester = function () {
  function Requester(apiBase, auth) {
    _classCallCheck(this, Requester);

    this.__apiBase = apiBase;
    this.__auth = auth;
  }

  _createClass(Requester, [{
    key: 'post',
    value: function post(path) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return fetch(this.__urlFor(path), {
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(_Error2.default);
    }
  }, {
    key: 'request',
    value: function request(path) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return fetch(this.__urlFor(path, query), {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET'
      }).then(_Error2.default);
    }
  }, {
    key: '__urlFor',
    value: function __urlFor(path) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      query = Object.assign(query, this.__auth);

      var queryString = _queryString2.default.stringify(query);
      var url = this.__apiBase + path + '?' + queryString;

      return url;
    }
  }]);

  return Requester;
}();

exports.default = Requester;