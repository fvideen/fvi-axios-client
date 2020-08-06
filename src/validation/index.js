'use strict'

const joi = require('@hapi/joi')

const schema = joi
    .object({
        url: joi.string().required(),
        timeout: joi.number().integer().positive().optional().default(null),
        delay: joi.number().integer().positive().optional().default(null),
        headers: joi.object().optional().options({ stripUnknown: true }),
        mock: joi.boolean().optional().default(false),
    })
    .options({ stripUnknown: true })

module.exports = schema
