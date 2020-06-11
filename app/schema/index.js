'use strict'

const { joi } = require('fvi-node-utils/app/objects')

const schema = joi.object({
    url: joi.string().required(),
    timeout: joi.number().integer().default(0).positive(),
    delay: joi.number().integer().default(0).positive(),
    headers: joi.object().options({ stripUnknown: true }),
    mock: joi.boolean().default(false),
})

module.exports = schema
