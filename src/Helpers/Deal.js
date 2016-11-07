export function firstUnarchivedDeal(model) {
  return model.deals()
    .then(response => response.entries)
    .then(deals => {
      return deals.find(deal => {
        return deal.is_archived === false
      })
    })
}
