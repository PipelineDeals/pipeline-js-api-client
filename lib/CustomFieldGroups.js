'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CustomFieldGroups = function () {
  function CustomFieldGroups(client) {
    _classCallCheck(this, CustomFieldGroups);

    this.__basePath = '/admin/custom_field_groups';
    this.__client = client;
  }

  _createClass(CustomFieldGroups, [{
    key: 'get',
    value: function get(id) {
      return this.__client.request(this.__urlFor('/' + id));
    }
  }, {
    key: 'search',
    value: function search(query) {
      return this.__client.request(this.__urlFor(''), query);
    }
  }, {
    key: '__urlFor',
    value: function __urlFor(path) {
      return this.__basePath + path;
    }
  }]);

  return CustomFieldGroups;
}();

exports.default = CustomFieldGroups;