import fetcher from './fetcher'

export default function IphoneAuth (username, password, apiBase = 'https://api.pipelinedeals.com') {
  const path = apiBase + '/api/v3/iphone_auths'
  const body = {
    email_or_username: username,
    password: password
  }

  return fetcher(path, {
    body: body,
    method: 'POST'
  }).then(json => { return json.user })
}
