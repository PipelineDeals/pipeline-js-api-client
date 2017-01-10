const PipelineDealsError = (response) => {
  this.message = response.statusText || 'No message'
  this.name = 'PipelineDealsError'
  this.stack = (new Error()).stack
}
PipelineDealsError.prototype = Object.create(Error.prototype)
PipelineDealsError.prototype.constructor = PipelineDealsError

export default PipelineDealsError
