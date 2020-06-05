'use strict'

const axios = require('axios')
const axiosDelay = require('axios-delay')

const MockAdapter = require('axios-mock-adapter')

const utils = require('fvi-node-utils')

const baseClient = require('./base')
const schema = require('./schema')

const create = (cfg = null) => {
    const { error, value } = schema.validate(cfg)

    if (error) {
        throw utils.objects.toErrorStack(
            new Error(
                `[fvi-axios-client]: Config is invalid!; validation=${utils.objects.inspect(error)}`
            )
        )
    }

    const config = value
    const baseURL = config.url
    const timeout = config.timeout === 0 ? null : config.timeout
    const delay = config.delay === 0 ? null : config.delay

    const adapter = axiosDelay.default(axios.defaults.adapter)
    const myHeaders = config.headers || {}
    const headers = {
        ...axios.defaults.headers,
        ...myHeaders,
    }

    utils.debug.here(`[fvi-axios-client]:cfg=${utils.objects.inspect(config)}`)

    const opts = {
        baseURL,
        timeout,
        delay,
        adapter,
        headers,
    }

    const instance = axios.create(opts)
    const client = baseClient(instance, opts)

    if (config.mock) {
        const mock = new MockAdapter(instance)
        client.mock = mock
    }

    return client
}

module.exports = create
