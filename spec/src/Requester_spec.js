import Requester from '../../src/Requester'
import { jsonOk } from '../helpers'

window.Promise = Promise

describe('Requester', () => {
  beforeEach(() => {
    sinon.stub(window, 'fetch');

    window.fetch.returns(jsonOk({
      user_id: 123
    }));
  });

  afterEach(() => {
    window.fetch.restore();
  });

  describe('#request', () => {
    it('calls the API enpoint', () => {
      let client = new Requester('http://pld.com/api/v3', {apiKey: '1234'})

      client.request('/account.json')
        .then((json) => {
          expect(json.account_id).toEqual(123)
        })
    })
  })

  describe('#post', () => {
    it('calls the API enpoint', () => {
      let client = new Requester('http://pld.com/api/v3', {apiKey: '1234'})

      client.post('/user.json', {first_name: 'New name'})
        .then((json) => {
          expect(json.account_id).toEqual(123)
      })
    })
  })
})
