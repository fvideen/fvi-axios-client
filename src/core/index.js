'use strict'

const throwsError = (e, method, endpoint, body) => {
  console.error(
    `[${method}][${endpoint}]: ${body ? 'body=' + body : ''}; error=${JSON.stringify(e)}`
  )
  throw e
}

const toRequest = (instance, method, withBody = false) => {
  if (withBody) {
    return (endpoint, body, opts = {}) =>
      instance[method](endpoint, body, opts).catch(e => throwsError(e, method, endpoint, body))
  }

  return (endpoint, opts = {}) =>
    instance[method](endpoint, opts).catch(e => throwsError(e, method, endpoint))
}

module.exports = (axios, opts = {}) => {
  return {
    get: toRequest(axios, 'get'),
    delete: toRequest(axios, 'delete'),
    put: toRequest(axios, 'put', true),
    post: toRequest(axios, 'post', true),
    ...axios,
  }
}
