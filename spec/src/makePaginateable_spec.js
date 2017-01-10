import makePaginateable from '../../src/makePaginateable'

describe('#makePaginateable', () => {
  const request = options => [1, 2, 3, 4].map(number => number * options.page)
  const page = {
    entries: [1, 2, 3, 4],
    pagination: {
      page: 1,
      pages: 3
    }
  }

  const paginateable = makePaginateable(page, request)

  it('makes an Object paginateable (Iterable)', () => {
    let allEntries = []

    for (let entries of paginateable) {
      allEntries = allEntries.concat(entries)
    }

    expect(allEntries.length).toEqual(page.pagination.pages * page.entries.length)
  })

  it('paginates through the given request', () => {
    let allEntries = []

    for (let entries of paginateable) {
      allEntries = allEntries.concat(entries)
    }

    expect(allEntries).toEqual([1, 2, 3, 4, 2, 4, 6, 8, 3, 6, 9, 12])
  })
})

