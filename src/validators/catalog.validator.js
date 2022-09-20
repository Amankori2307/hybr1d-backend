const Joi = require('joi');
const product = require('./product.validator')

const catalog = Joi.object({
    products: Joi.array()
        .items(product)
        .min(1)
        .unique((a, b) => a.name === b.name).message("Product name should be unique")
        .required()
})

module.exports = catalog