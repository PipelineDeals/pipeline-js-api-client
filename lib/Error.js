'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var PipelineDealsError = function PipelineDealsError(response) {
  undefined.message = response.statusText || 'No message';
  undefined.name = 'PipelineDealsError';
  undefined.stack = new Error().stack;
};
PipelineDealsError.prototype = Object.create(Error.prototype);
PipelineDealsError.prototype.constructor = PipelineDealsError;

exports.default = PipelineDealsError;