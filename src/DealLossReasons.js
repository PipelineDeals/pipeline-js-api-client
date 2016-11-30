export default class DealLossReasons {
  constructor (client) {
    this.__basePath = '/admin/deal_loss_reasons'
    this.__client = client
  }

  create (group) {
    return this.__client.post(this.__urlFor(), { deal_loss_reason: group })
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

  update (group) {
    return this.__client.put(this.__urlFor(`/${group.id}`), { deal_loss_reason: group })
  }

  __urlFor (path = '') {
    return this.__basePath + path
  }
}
