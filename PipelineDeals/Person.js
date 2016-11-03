export default class Person {
  constructor(client, attributes) {
    this.attributes = attributes

    this.__basePath = `/people/${attributes.id}`
    this.__client = client
  }

  deals() {
    return this.__client.request(this.__urlFor(`/deals`), { include_notify_user_ids: true })
  }

  __urlFor(path) {
    return this.__basePath + path
  }
}
