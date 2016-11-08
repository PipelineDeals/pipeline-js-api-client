export default function makePaginateable(object, request) {
  return Object.assign({}, object, {
    request(options = {}) {
      return request(options)
    },
    [Symbol.iterator]() {
      let entries = this.entries
      let page = this.pagination.page
      const pages = this.pagination.pages
      const request = this.request

      return {
        next() {
          if (page > pages) {
            return {done: true}
          }

          if (page > 1) {
            entries = request({page})
          }

          page++

          return {value: entries, done: false}
        }
      }
    }
  })
}
