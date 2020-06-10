'use strict'

const utils = require('fvi-node-utils')

const setDelay = (opts, delay) => {
    const optsWithDelay = { ...opts, delay }
    return optsWithDelay
}

const throwsError = (e, method, url, body) => {
    throw utils.objects.toErrorStack(e, log =>
        utils.debug.here(
            `[fvi-axios-client][${method}][${url}]: error=${log}; ${body ? 'body=' + body : ''}`
        )
    )
}

const toRequest = (instance, url, method, delay, withBody = false) => {
    try {
        if (withBody) {
            return async (url, body, opts = {}) =>
                await instance[method](url, body, setDelay(opts, delay))
        }
        return async (url, opts = {}) => await instance[method](url, setDelay(opts, delay))
    } catch (e) {
        throwsError(e, method, url)
    }
}

module.exports = (instance, opts = {}) => {
    return {
        get: toRequest(instance, opts.url, 'get', opts.delay),
        delete: toRequest(instance, opts.url, 'delete', opts.delay),
        put: toRequest(instance, opts.url, 'put', opts.delay, true),
        post: toRequest(instance, opts.url, 'post', opts.delay, true),
    }
}
