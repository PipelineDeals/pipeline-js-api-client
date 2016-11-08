import MakePaginateable from '../../src/MakePaginateable'

describe('#MakePaginateable', () => {
  it('interates over all pages', () => {
    const request = options => [1, 2, 3, 4].map(number => number * options.page);
    const page = {
      entries: [1, 2, 3, 4],
      pagination: {
        page: 1,
        pages: 3
      }
    };

    const paginateable = MakePaginateable(page, request);
    let allEntries = []
    let entries

    for (entries of paginateable) {
      allEntries = allEntries.concat(entries)
    }

    expect(allEntries.length).toEqual(page.pagination.pages * page.entries.length)
  })
})

