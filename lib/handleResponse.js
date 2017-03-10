'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Error = require('./Error');

var _Error2 = _interopRequireDefault(_Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (response) {
  if (!response.ok) throw new _Error2.default(response);
  if (response.status === 204) return {};
  return response.json();
};