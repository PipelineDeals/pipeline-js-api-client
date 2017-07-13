'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IphoneAuth;

var _fetcher = require('./fetcher');

var _fetcher2 = _interopRequireDefault(_fetcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function IphoneAuth(username, password) {
  var apiBase = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'https://api.pipelinedeals.com';

  var path = apiBase + '/api/v3/iphone_auths';
  var body = {
    email_or_username: username,
    password: password
  };

  return (0, _fetcher2.default)(path, {
    body: body,
    method: 'POST'
  }).then(function (json) {
    return json.user;
  });
}