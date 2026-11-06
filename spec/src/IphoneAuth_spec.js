/* global sinon */

import IphoneAuth from '../../src/IphoneAuth'
import { jsonOk } from '../helpers'

window.Promise = Promise

describe('IphoneAuth', () => {
  beforeEach(() => {
    sinon.stub(window, 'fetch')
  })

  afterEach(() => {
    window.fetch.restore()
  })

  it('posts the credentials as JSON and returns the user', (done) => {
    window.fetch.returns(jsonOk({ user: { id: 123 } }))

    IphoneAuth('someone', 'secret')
      .catch(done)
      .then(user => {
        expect(window.fetch.getCall(0).args[0]).toEqual('https://api.pipelinedeals.com/api/v3/iphone_auths')
        expect(window.fetch.getCall(0).args[1].body).toEqual('{"email_or_username":"someone","password":"secret"}')
        expect(user).toEqual({ id: 123 })
        done()
      })
  })
})
