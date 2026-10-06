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

    it('sends the body as JSON', (done) => {
      window.fetch.returns(jsonOk({ id: 123 }))

      let client = new Requester('http://pld.com/api/v3', {apiKey: '1234'})

      client.post('/notes.json', { body: { note: { content: 'hi' } } })
        .catch(done)
        .then(() => {
          expect(window.fetch.getCall(0).args[1].body).toEqual('{"note":{"content":"hi"}}')
          done()
        })
    })
  })

  describe('#put', () => {
    it('sends the body as JSON', (done) => {
      window.fetch.returns(jsonOk({ id: 123 }))

      let client = new Requester('http://pld.com/api/v3', {apiKey: '1234'})

      client.put('/notes/1.json', { body: { note: { content: 'hi' } } })
        .catch(done)
        .then(() => {
          expect(window.fetch.getCall(0).args[1].body).toEqual('{"note":{"content":"hi"}}')
          done()
        })
    })
  })

  describe('#delete', () => {
    it('sends the body as JSON', (done) => {
      window.fetch.returns(jsonOk({ id: 123 }))

      let client = new Requester('http://pld.com/api/v3', {apiKey: '1234'})

      client.delete('/notes.json', { body: { ids: [1, 2] } })
        .catch(done)
        .then(() => {
          expect(window.fetch.getCall(0).args[1].body).toEqual('{"ids":[1,2]}')
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
