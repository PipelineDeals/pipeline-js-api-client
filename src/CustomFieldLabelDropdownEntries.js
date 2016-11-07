export default class CustomFieldLabelDropdownEntries {
  constructor(client) {
    this.__basePath = '/admin/custom_field_label_dropdown_entries'
    this.__client = client
  }

  get(id) {
    return this.__client.request(this.__urlFor(`/${id}`))
  }

  search(query) {
    return this.__client.request(this.__urlFor(''), query)
  }

  __urlFor(path) {
    return this.__basePath + path
  }
}
