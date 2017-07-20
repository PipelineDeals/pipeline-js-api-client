export default class CustomFieldGroups {
  constructor (client) {
    this.__basePath = '/admin/custom_field_groups'
    this.__client = client
  }

  create (group) {
    return this.__client.post(this.__urlFor(), { body: { custom_field_group: group } })
  }

  delete (id) {
    return this.__client.delete(this.__urlFor(`/${id}`))
  }

  get (id) {
    return this.__client.request(this.__urlFor(`/${id}`))
  }

  search (query) {
    return this.__client.request(this.__urlFor(), { query })
  }

  update (group) {
    return this.__client.put(this.__urlFor(`/${group.id}`), { body: { custom_field_group: group } })
  }

  __urlFor (path = '') {
    return this.__basePath + path
  }
}
