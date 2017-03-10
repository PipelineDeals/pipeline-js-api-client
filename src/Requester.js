/* global fetch */

import QueryString from 'query-string'

import handleResponse from './handleResponse'

export default class Requester {
  constructor (apiBase, auth) {
    this.__apiBase = apiBase
    this.__auth = auth
  }

  delete (path, query = {}) {
    return fetch(this.__urlFor(path, query),
      this.__options({ method: 'DELETE' }))
      .then(handleResponse)
  }

  post (path, data = {}) {
    return fetch(this.__urlFor(path),
      this.__options({ body: JSON.stringify(data), method: 'POST' }))
      .then(handleResponse)
  }

  put (path, data = {}) {
    return fetch(this.__urlFor(path),
      this.__options({ body: JSON.stringify(data), method: 'PUT' }))
      .then(handleResponse)
  }

  request (path, query = {}) {
    return fetch(this.__urlFor(path, query),
      this.__options({ method: 'GET' }))
      .then(handleResponse)
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
