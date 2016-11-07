export default class Notes {
  constructor(client) {
    this.__basePath = '/notes'
    this.__client = client
  }

  create(note) {
    return this.__client.post(this.__urlFor(), { note: note })
  }

  get(id) {
    return this.__client.request(this.__urlFor(`/${id}`))
  }

  search(query) {
    return this.__client.request(this.__urlFor(), query)
  }

  __urlFor(path = '') {
    return this.__basePath + path
  }
}
