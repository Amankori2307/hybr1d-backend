const Joi = require('joi');
const productSchema = require('./product.validator');

const catalogSchema = Joi.schema({
    products: Joi.array()
        .items(productSchema)
        .min(1)
})

module.exports = catalogSchema