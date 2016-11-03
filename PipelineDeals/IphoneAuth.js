import handleErrors from './Error'

export default function PipelineDealsIphoneAuth(username, password, apiBase = 'https://api.pipelinedeals.com') {
  let path = apiBase + '/api/v3/iphone_auths'
  let body = JSON.stringify({
    email_or_username: username,
    password: password
  })

  return fetch(path, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: body
  })
  .then(handleErrors)
  .then(json => { return json.user })
}
