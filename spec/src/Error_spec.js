import PipelineDealsError from '../../src/Error'

describe('PipelineDealsError', () => {
  it('can set an error message given a response', () => {
    try {
      throw new PipelineDealsError({statusText: 'whoops'})
    } catch (e) {
      expect(e.message).toEqual('whoops')
      expect(e.name).toEqual('PipelineDealsError')
      expect(e.stack).toMatch('Error_spec')
    }
  })
})
