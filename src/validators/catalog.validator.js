const Joi = require('joi');
const productSchema = require('./product.validator')

const catalogValidator = Joi.object({
    products: Joi.array()
        .items(productSchema)
        .min(1)
        .unique((a, b) => a.name === b.name).message("Product name should be unique")
        .required()
})

module.exports = catalogValidator