'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IphoneAuth;

var _Error = require('./Error');

var _Error2 = _interopRequireDefault(_Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function IphoneAuth(username, password) {
  var apiBase = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'https://api.pipelinedeals.com';

  var path = apiBase + '/api/v3/iphone_auths';
  var body = JSON.stringify({
    email_or_username: username,
    password: password
  });

  return fetch(path, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: body
  }).then(_Error2.default).then(function (json) {
    return json.user;
  });
} /* global fetch */