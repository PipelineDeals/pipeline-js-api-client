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

  deals () {
    return this.__client.request(this.__urlFor(`/deals`), { query: { include_notify_user_ids: true } })
  }

  __urlFor (path = '') {
    return this.__basePath + path
  }
}
