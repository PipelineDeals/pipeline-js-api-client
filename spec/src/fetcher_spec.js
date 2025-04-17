/* global sinon */
import 'whatwg-fetch'

import ResponseError from '../../src/ResponseError'
import fetcher from '../../src/fetcher'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import sinonTest from 'sinon-test'

chai.use(chaiAsPromised)

const test = sinonTest(sinon, { useFakeTimers: false })
sinon.test = test

const jsonResponse = ({ body, status = 200, statusText = '' }) => {
  const mockResponse = new window.Response(JSON.stringify(body), {
    headers: {
      'Content-type': 'application/json'
    },
    status,
    statusText
  })

  return Promise.resolve(mockResponse)
}

describe('fetcher', () => {
  beforeEach(() => {
    sinon.stub(window, 'fetch')
  })

  afterEach(() => {
    window.fetch.restore()
  })

  it('fetches and returns parsed JSON', sinon.test(() => {
    window.fetch.withArgs('/fetcher', {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).returns(jsonResponse({ body: { json: true } }))

    return chai.expect(fetcher('/fetcher')).to.become({ json: true })
  }))

  describe('query parsing', () => {
    it('parses a query', sinon.test(() => {
      window.fetch.withArgs('/fetcher?parameter=true', {
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).returns(jsonResponse({ body: { query: true } }))

      return chai.expect(
        fetcher('/fetcher', { query: { parameter: true } })
      ).to.become({ query: true })
    }))

    it('supports bracket Array format', sinon.test(() => {
      window.fetch.withArgs('/fetcher?array%5B%5D=true&array%5B%5D=1', {
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).returns(jsonResponse({ body: { bracketArray: true } }))

      return chai.expect(
        fetcher('/fetcher', { query: { array: [true, 1] } })
      ).to.become({ bracketArray: true })
    }))
  })

  describe('response handling', () => {
    it('throws a ResponseError for error status', sinon.test(async () => {
      window.fetch.withArgs('/fetcher', {
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).returns(jsonResponse({ body: { bracketArray: true }, status: 400, statusText: 'Bad Request' }))

      await chai.expect(
        fetcher('/fetcher')
      ).to.be.rejectedWith(ResponseError, 'Bad Request')
    }))
  })
})
