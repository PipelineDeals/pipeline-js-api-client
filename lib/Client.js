'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requester = require('./Requester');

var _Requester2 = _interopRequireDefault(_Requester);

var _CustomFieldLabelDropdownEntries = require('./CustomFieldLabelDropdownEntries');

var _CustomFieldLabelDropdownEntries2 = _interopRequireDefault(_CustomFieldLabelDropdownEntries);

var _CustomFieldLabels = require('./CustomFieldLabels');

var _CustomFieldLabels2 = _interopRequireDefault(_CustomFieldLabels);

var _CustomFieldGroups = require('./CustomFieldGroups');

var _CustomFieldGroups2 = _interopRequireDefault(_CustomFieldGroups);

var _DealLossReasons = require('./DealLossReasons');

var _DealLossReasons2 = _interopRequireDefault(_DealLossReasons);

var _NoteCategories = require('./NoteCategories');

var _NoteCategories2 = _interopRequireDefault(_NoteCategories);

var _Notes = require('./Notes');

var _Notes2 = _interopRequireDefault(_Notes);

var _People = require('./People');

var _People2 = _interopRequireDefault(_People);

var _Person = require('./Person');

var _Person2 = _interopRequireDefault(_Person);

var _Users = require('./Users');

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function () {
  function Client(auth) {
    var apiBase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://api.pipelinedeals.com/api/v3';

    _classCallCheck(this, Client);

    this.__requester = new _Requester2.default(apiBase, auth);
  }

  _createClass(Client, [{
    key: 'delete',
    value: function _delete(path) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.__requester.delete(path, query);
    }
  }, {
    key: 'post',
    value: function post(path) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.__requester.post(path, data);
    }
  }, {
    key: 'put',
    value: function put(path) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.__requester.put(path, data);
    }
  }, {
    key: 'request',
    value: function request(path) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.__requester.request(path, query);
    }
  }, {
    key: 'customFieldLabelDropdownEntries',
    value: function customFieldLabelDropdownEntries() {
      return new _CustomFieldLabelDropdownEntries2.default(this);
    }
  }, {
    key: 'customFieldLabels',
    value: function customFieldLabels() {
      return new _CustomFieldLabels2.default(this);
    }
  }, {
    key: 'customFieldGroups',
    value: function customFieldGroups() {
      return new _CustomFieldGroups2.default(this);
    }
  }, {
    key: 'dealLossReasons',
    value: function dealLossReasons() {
      return new _DealLossReasons2.default(this);
    }
  }, {
    key: 'noteCategories',
    value: function noteCategories() {
      return new _NoteCategories2.default(this);
    }
  }, {
    key: 'notes',
    value: function notes() {
      return new _Notes2.default(this);
    }
  }, {
    key: 'people',
    value: function people() {
      return new _People2.default(this);
    }
  }, {
    key: 'person',
    value: function person(attributes) {
      return new _Person2.default(this, attributes);
    }
  }, {
    key: 'users',
    value: function users() {
      return new _Users2.default(this);
    }
  }]);

  return Client;
}();

exports.default = Client;