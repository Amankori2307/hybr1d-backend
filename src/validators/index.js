const catalog = require("./catalog.validator");
const product = require("./product.validator");
const user = require("./user.validator")
const order = require("./order.validator")

module.exports = {
    product,
    catalog,
    user,
    order
}