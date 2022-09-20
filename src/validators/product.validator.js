const Joi = require('joi');

const productValidator = Joi.object({
    name: Joi.string()
        .min(1)
        .max(100)
        .required()
        .regex(/^[0-9A-z\.\-,'()]+$/).message("Product name should only contain alpha nemeric characters, comma(,), hyphen(-), period(.), parenthesis(()) and apostrophe(') "),

    price: Joi.number()
        .min(0)
        .max(1000000)
        .required()
})

module.exports = productValidator