export default class LeadSources {
  constructor (client) {
    this.__basePath = '/admin/lead_sources'
    this.__client = client
  }

  create (source) {
    return this.__client.post(this.__urlFor(), { lead_source: source })
  }

  delete (id) {
    return this.__client.delete(this.__urlFor(`/${id}`))
  }

  get (id) {
    return this.__client.request(this.__urlFor(`/${id}`))
  }

  search (query) {
    return this.__client.request(this.__urlFor(), query)
  }

  update (source) {
    return this.__client.put(this.__urlFor(`/${source.id}`), { lead_source: source })
  }

  __urlFor (path = '') {
    return this.__basePath + path
  }
}
