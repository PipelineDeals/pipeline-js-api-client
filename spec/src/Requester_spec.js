/* global sinon */

import Requester from '../../src/Requester'
import { jsonOk } from '../helpers'

window.Promise = Promise

describe('Requester', () => {
  beforeEach(() => {
    sinon.stub(window, 'fetch')
  })

  afterEach(() => {
    window.fetch.restore()
  })

  describe('#post', () => {
    it('calls the API enpoint', (done) => {
      window.fetch.returns(jsonOk({
        id: 123,
        first_name: 'New name'
      }))

      let client = new Requester('http://pld.com/api/v3', {apiKey: '1234'})

      client.post('/user.json', { first_name: 'New name' })
        .catch(done)
        .then(json => {
          expect(json).toEqual({ id: 123, first_name: 'New name' })
          done()
        })
    })
  })

  describe('#request', () => {
    it('calls the API enpoint', (done) => {
      window.fetch.returns(jsonOk({
        id: 123
      }))

      let client = new Requester('http://pld.com/api/v3', {apiKey: '1234'})

      client.request('/account.json')
        .catch(done)
        .then(json => {
          expect(json.id).toEqual(123)
          done()
        })
    })
  })
})
