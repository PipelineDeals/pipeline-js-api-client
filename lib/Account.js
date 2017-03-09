'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Account = function () {
  function Account(client) {
    _classCallCheck(this, Account);

    this.__basePath = '/account';
    this.__client = client;
  }

  _createClass(Account, [{
    key: 'get',
    value: function get() {
      return this.__client.request(this.__urlFor(''));
    }
  }, {
    key: '__urlFor',
    value: function __urlFor() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      return this.__basePath + path;
    }
  }]);

  return Account;
}();

exports.default = Account;