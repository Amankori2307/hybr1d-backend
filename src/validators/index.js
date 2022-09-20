const catalog = require("./catalog.validator");
const product = require("./product.validator");
const user = require("./user.validator")

module.exports = {
    product,
    catalog,
    user
}