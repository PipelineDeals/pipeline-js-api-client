'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CustomFieldLabelDropdownEntries = function () {
  function CustomFieldLabelDropdownEntries(client) {
    _classCallCheck(this, CustomFieldLabelDropdownEntries);

    this.__basePath = '/admin/custom_field_label_dropdown_entries';
    this.__client = client;
  }

  _createClass(CustomFieldLabelDropdownEntries, [{
    key: 'get',
    value: function get(id) {
      return this.__client.request(this.__urlFor('/' + id));
    }
  }, {
    key: 'search',
    value: function search(query) {
      return this.__client.request(this.__urlFor(), { query: query });
    }
  }, {
    key: '__urlFor',
    value: function __urlFor() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      return this.__basePath + path;
    }
  }]);

  return CustomFieldLabelDropdownEntries;
}();

exports.default = CustomFieldLabelDropdownEntries;