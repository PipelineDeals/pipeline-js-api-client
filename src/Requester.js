/* global fetch */

import QueryString from 'query-string'
import handleErrors from './Error'

class Requester {
  constructor (apiBase, auth) {
    this.__apiBase = apiBase
    this.__auth = auth
  }

  post (path, data = {}) {
    return fetch(this.__urlFor(path), {
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(handleErrors)
  }

  request (path, query = {}) {
    return fetch(this.__urlFor(path, query), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    }).then(handleErrors)
  }

  __urlFor (path, query = {}) {
    query = Object.assign(query, this.__auth)

    let queryString = QueryString.stringify(query)
    let url = this.__apiBase + path + '?' + queryString

    return url
  }
}

export default Requester
