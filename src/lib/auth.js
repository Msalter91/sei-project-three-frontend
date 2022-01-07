
const tokenName = 'token'

export function setToken(token) {
  window.localStorage.setItem(tokenName, token)
}

export function getToken() {
  return window.localStorage.getItem(tokenName)
}

export function removeToken() {
  window.localStorage.removeItem(tokenName)
}

function getPayload() {
  const token = getToken()
  if (!token) {
    return false
  }

  const parts = token.split('.')
  if (parts.length < 3) {
    removeToken()
    return false
  }
  return JSON.parse(atob(parts[1]))
}

export function isAuthenticated() {
  const payload = getPayload()
  if (!payload) {
    return false
  }
  const now = Math.round(Date.now() / 1000)
  return now < payload.exp
}

//valid expiry time = 24hrs

export function isOwner(id) {
  const payload = getPayload()
  if (!payload) {
    return false
  }
  if (!isAuthenticated()) {
    return false
  }
  return id === payload.sub
}
