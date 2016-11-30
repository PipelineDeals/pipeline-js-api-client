/* global fetch */

import QueryString from 'query-string'
import handleErrors from './Error'

class Requester {
  constructor (apiBase, auth) {
    this.__apiBase = apiBase
    this.__auth = auth
  }

  delete (path, query = {}) {
    return fetch(this.__urlFor(path, query),
      this.__options({ method: 'DELETE' }))
      .then(handleErrors)
  }

  post (path, data = {}) {
    return fetch(this.__urlFor(path),
      this.__options({ body: JSON.stringify(data), method: 'POST' }))
      .then(handleErrors)
  }

  put (path, data = {}) {
    return fetch(this.__urlFor(path),
      this.__options({ body: JSON.stringify(data), method: 'PUT' }))
      .then(handleErrors)
  }

  request (path, query = {}) {
    return fetch(this.__urlFor(path, query),
      this.__options({ method: 'GET' }))
      .then(handleErrors)
  }

  __options (options = {}) {
    return {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      ...options
    }
  }

  __urlFor (path, query = {}) {
    query = Object.assign(query, this.__auth)

    let queryString = QueryString.stringify(query)
    let url = this.__apiBase + path + '.json?' + queryString

    return url
  }
}

export default Requester
