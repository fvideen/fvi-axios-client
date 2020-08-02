'use strict'

const axios = require('axios')
const axiosDelay = require('axios-delay')
const MockAdapter = require('axios-mock-adapter')

const debug = require('fvi-debug')

const schema = require('./validation')
const core = require('./core')

const create = (opts = {}) => {
    const { value, error } = schema.validate(opts)

    if (error) {
        throw new Error(`${__dirname}: Options are invalid!; error=${JSON.stringify(error)}`)
    }

    const options = value

    const adapter = axiosDelay.default(axios.defaults.adapter)
    const myHeaders = options.headers || {}
    const headers = {
        ...axios.defaults.headers,
        ...myHeaders,
    }

    debug.here(
        `Creating axios with opts=${JSON.stringify(options)}; headers=${JSON.stringify(headers)}`
    )

    const client = axios.create({
        baseURL: options.url,
        timeout: options.timeout,
        delay: options.delay,
        headers,
        adapter,
    })

    const instance = core(client, options)

    if (options.mock) {
        const mock = new MockAdapter(client)
        instance.mock = mock
    }

    return instance
}

module.exports = create
