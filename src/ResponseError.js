// This must be a function defined as function Name (args) {}
function ResponseError (response) {
  this.message = response.statusText || 'No message'
  this.name = 'ResponseError'
  this.response = response
  this.stack = (new Error()).stack
  this.status = response.status
}
ResponseError.prototype = Object.create(Error.prototype)
ResponseError.prototype.constructor = ResponseError

export default ResponseError
