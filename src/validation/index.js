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
} = require('fvi-js-validator')

const url = [isString(), isNotEmpty()]
const timeout = [isInteger(), isMin(1)]
const headers = [isObject()]
const mock = [isBoolean()]

module.exports = Validator({ url: Required(url), timeout, headers, mock })
