const Joi = require('joi')
const { genErrorResponse } = require('../utils/response')
const validators = require('../validators')

module.exports = {
    validate: (validator) => {
        return function (req, res, next) {
            if (!validators.hasOwnProperty(validator)) {
                return res.status(400).json(genErrorResponse("`'${validator}' validator is not exist`"));
            }

            const { error, value } = validators[validator].validate(req.body)
            if (error) {
                return res.status(400).json(genErrorResponse("Invalid request payload", error.details.map(err => err.message)))
            }
            req.body = value;
            next();
        }
    }
}