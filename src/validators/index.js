const catalogValidator = require("./catalog.validator");
const productValidator = require("./product.validator");

module.exports = {
    product: productValidator,
    catalog: catalogValidator
}