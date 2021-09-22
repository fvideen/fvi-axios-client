'use strict'

const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')

const core = require('./core')
const validation = require('./validation')

const create = (opts = {}) => {
  validation(opts)
  const options = opts

  const myHeaders = options.headers || {}
  const headers = {
    ...axios.defaults.headers,
    ...myHeaders,
  }

  const client = axios.create({
    baseURL: options.url,
    timeout: options.timeout,
    headers,
    ...options,
  })

  const instance = core(client, options)

  if (options.mock) {
    const mock = new MockAdapter(client)
    instance.mock = mock
  }

  return instance
}

module.exports = create
