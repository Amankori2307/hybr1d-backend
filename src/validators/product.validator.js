const Joi = require('joi');

const productSchema = Joi.schema({
    name: Joi.string()
        .min(1)
        .max(100)
        .required()
        .regex("^[0-9A-z\.\-,'()]+"),
    price: Joi.number()
        .min(0)
        .max(1000000)
        .required()
})

module.exports = productSchema