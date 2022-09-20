const authMiddleware = require("./auth.middleware");
const validatorMiddleware = require('./validator.middleware')

module.exports = {
    authMiddleware,
    validatorMiddleware,
}