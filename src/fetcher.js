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

const isJSONable = body =>
  Array.isArray(body) ||
  Object.prototype.toString.call(body) === '[object Object]'

const serialize = body => isJSONable(body) ? JSON.stringify(body) : body

export const fetcher = (path, options = {}) => {
  const { auth, body, headers, query, ...rest } = options
  const fetchUrl = url(path, { ...query, ...auth })

  return fetch(fetchUrl, {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers
    },
    ...(body === undefined ? {} : { body: serialize(body) }),
    ...rest
  })
    .then(handleResponse)
    .then(toJSON)
}

const toJSON = response => {
  if (response.status === 204) return {}

  return response.json()
}
const url = (path, query = {}) =>
  Object.keys(query).length > 0
    ? `${path}?${param(query)}`
    : path

export default fetcher
