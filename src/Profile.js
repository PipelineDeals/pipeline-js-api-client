class Profile {
  constructor (client) {
    this.__basePath = '/profile'
    this.__client = client
  }

  get () {
    return this.__client.request(this.__urlFor(''))
  }

  __urlFor (path = '') {
    return this.__basePath + path
  }
}

export default Profile
