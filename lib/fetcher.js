'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetcher = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _ResponseError = require('./ResponseError');

var _ResponseError2 = _interopRequireDefault(_ResponseError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* global fetch */


var handleResponse = function handleResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new _ResponseError2.default(response);
  }
};

var param = function param(query) {
  return _qs2.default.stringify(query, { arrayFormat: 'brackets' });
};

var fetcher = exports.fetcher = function fetcher(path) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var auth = options.auth,
      headers = options.headers,
      query = options.query,
      rest = _objectWithoutProperties(options, ['auth', 'headers', 'query']);

  var fetchUrl = url(path, _extends({}, query, auth));

  return fetch(fetchUrl, _extends({
    credentials: 'same-origin',
    headers: _extends({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, headers)
  }, rest)).then(handleResponse).then(toJSON);
};

var toJSON = function toJSON(response) {
  return response.json();
};
var url = function url(path) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.keys(query).length > 0 ? path + '?' + param(query) : path;
};

exports.default = fetcher;