const { genSuccessResponse, genErrorResponse } = require("../utils/response")
const { Product, Catalog } = require('../models')

module.exports = {
    createCatalog: async (req, res) => {
        const { products } = req.body;
        const savedProducts = await Product.insertMany(products)
        if (!savedProducts) res.json(genErrorResponse("Error while saving products"))

        const catalog = new Catalog({ products: savedProducts, sellerId: req.user.id })
        const savedCatalog = await catalog.save()
        if (!savedCatalog) res.json(genErrorResponse("Error while saving catalog"))
        res.json(genSuccessResponse("Created catalog successfully!", savedCatalog))
    },

    orders: (req, res) => {
        res.json(genSuccessResponse("orders"))
    }
}