'use strict'

const debug = require('fvi-debug')

const setDelay = (opts, delay) => {
    const optsWithDelay = { ...opts, delay }
    return optsWithDelay
}

const throwsError = (e, method, endpoint, body) => {
    debug.here(
        `[${method}][${endpoint}]: ${body ? 'body=' + body : ''}; error=${JSON.stringify(e)}`
    )
    throw e
}

const toRequest = (instance, method, delay, withBody = false) => {
    if (withBody) {
        return (endpoint, body, opts = {}) =>
            instance[method](endpoint, body, setDelay(opts, delay)).catch(e =>
                throwsError(e, method, endpoint, body)
            )
    }

    return (endpoint, opts = {}) =>
        instance[method](endpoint, setDelay(opts, delay)).catch(e =>
            throwsError(e, method, endpoint)
        )
}

module.exports = (axios, opts = {}) => {
    return {
        get: toRequest(axios, 'get', opts.delay),
        delete: toRequest(axios, 'delete', opts.delay),
        put: toRequest(axios, 'put', opts.delay, true),
        post: toRequest(axios, 'post', opts.delay, true),
        ...axios,
    }
}
