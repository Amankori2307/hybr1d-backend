const Joi = require('joi');
const product = require('./product.validator')
Joi.objectId = require('joi-objectid')(Joi)

const order = Joi.object({
    sellerId: Joi.objectId()
        .required(),
    products: Joi.array()
        .items(Joi.objectId())
        .unique((a, b) => a === b).message("Can't add same product twice")
        .min(1)
        .required()
})

module.exports = order