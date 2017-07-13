/* global fetch */
import qs from 'qs'

import ResponseError from './ResponseError'

const handleResponse = response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    throw new ResponseError(response)
  }
}

const param = query => qs.stringify(query, { arrayFormat: 'brackets' })

export const fetcher = (path, options = {}) => {
  const { auth, headers, query, ...rest } = options
  const fetchUrl = url(path, { ...query, ...auth })

  return fetch(fetchUrl, {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers
    },
    ...rest
  })
  .then(handleResponse)
  .then(toJSON)
}

const toJSON = response => response.json()
const url = (path, query = {}) =>
  Object.keys(query).length > 0
    ? `${path}?${param(query)}`
    : path

export default fetcher
