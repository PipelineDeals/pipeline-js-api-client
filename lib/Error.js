'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function handleErrors(response) {
  if (!response.ok) throw new PipelineDealsError(response);
  return response.json();
}

function PipelineDealsError(response) {
  this.message = response.statusText || 'No message';
  this.name = 'PipelineDealsError';
  this.stack = new Error().stack;
}
PipelineDealsError.prototype = Object.create(Error.prototype);
PipelineDealsError.prototype.constructor = PipelineDealsError;

exports.default = handleErrors;