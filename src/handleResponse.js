import PipelineDealsError from './Error'

export default (response) => {
  if (!response.ok) throw new PipelineDealsError(response)
  if (response.status === 204) return {}
  return response.json()
}
