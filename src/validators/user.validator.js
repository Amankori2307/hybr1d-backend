const Joi = require('joi');

const user = Joi.object({
    email: Joi.string()
        .email()
        .lowercase()
        .required(),
    password: Joi.string()
        .min(8)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .message("Minimum eight characters, at least one letter, one number and one special character")
        .required(),
    role: Joi.string()
        .valid("SELLER", "BUYER")
        .required()
})

module.exports = user