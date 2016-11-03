class Users {
  constructor(client) {
    this.__basePath = '/users'
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

export default Users
