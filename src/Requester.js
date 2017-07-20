import fetcher from './fetcher'

export default class Requester {
  constructor (apiBase, auth) {
    this.__apiBase = apiBase
    this.__auth = auth
  }

  delete (path, options = {}) {
    return fetcher(this.__path(path), { auth: this.__auth, method: 'DELETE', ...options })
  }

  post (path, { body = {}, ...options } = {}) {
    return fetcher(this.__path(path), { auth: this.__auth, method: 'POST', body: JSON.stringify(body), ...options })
  }

  put (path, { body = {}, ...options } = {}) {
    return fetcher(this.__path(path), { auth: this.__auth, method: 'PUT', body: JSON.stringify(body), ...options })
  }

  request (path, options = {}) {
    return fetcher(this.__path(path), { auth: this.__auth, method: 'GET', ...options })
  }

  __path (path) {
    return this.__apiBase + path
  }
}
