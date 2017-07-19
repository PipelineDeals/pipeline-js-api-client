class PipelineDealsError extends Error {
  constructor (response) {
    const message = response.statusText || 'No message'

    super(message)

    this.name = 'PipelineDealsError'
  }
}

export default PipelineDealsError
