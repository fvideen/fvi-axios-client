'use strict'

const {
    Validator,
    Required,
    isString,
    isInteger,
    isMin,
    isObject,
    isBoolean,
    isNotEmpty,
} = require('fvi-validator-js')

const url = [isString(), isNotEmpty()]
const timeout = [isInteger(), isMin(1)]
const delay = [isInteger(), isMin(1)]
const headers = [isObject()]
const mock = [isBoolean()]

module.exports = Validator({ url: Required(url), timeout, delay, headers, mock })
