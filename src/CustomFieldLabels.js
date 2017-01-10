export default class CustomFieldLabels {
  constructor (client) {
    this.__basePath = '/admin/custom_field_labels'
    this.__client = client
  }

  create (label) {
    return this.__client.post(this.__urlFor(), { custom_field_label: label })
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

  update (label) {
    return this.__client.put(this.__urlFor(`/${label.id}`), { custom_field_label: label })
  }

  __urlFor (path = '') {
    return this.__basePath + path
  }
}
