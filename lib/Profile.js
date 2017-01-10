'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Profile = function () {
  function Profile(client) {
    _classCallCheck(this, Profile);

    this.__basePath = '/profile';
    this.__client = client;
  }

  _createClass(Profile, [{
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

  return Profile;
}();

exports.default = Profile;