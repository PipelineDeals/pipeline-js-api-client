export default class Person {
  constructor (client, attributes) {
    this.attributes = attributes

    this.__basePath = `/people/${attributes.id}`
    this.__client = client
  }

  company () {
    const { company_id: companyId } = this.attributes

    return companyId
      ? this.__client.companies().get(companyId)
      : null
  }

  deals (query = {}) {
    return this.__client.request(this.__urlFor(`/deals`), { query })
  }

  __urlFor (path = '') {
    return this.__basePath + path
  }
}
