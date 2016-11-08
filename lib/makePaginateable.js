"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function makePaginateable(object, _request) {
  return Object.assign({}, object, _defineProperty({
    request: function request() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return _request(options);
    }
  }, Symbol.iterator, function () {
    var entries = this.entries;
    var page = this.pagination.page;
    var pages = this.pagination.pages;
    var request = this.request;

    return {
      next: function next() {
        if (page > pages) {
          return { done: true };
        }

        if (page > 1) {
          entries = request({ page: page });
        }

        page++;

        return { value: entries, done: false };
      }
    };
  }));
}
exports.default = makePaginateable;