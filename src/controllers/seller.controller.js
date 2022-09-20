const { genSuccessResponse, genErrorResponse } = require("../utils/response")
const { Product, Catalog } = require('../models')

module.exports = {
    createCatalog: async (req, res) => {
        try {
            const sellerId = req.user.id;
            const catalog = await Catalog.findOne({ sellerId })
            if (catalog) return res.json(genErrorResponse(`Catalog already exists for seller ${sellerId}`))

            const { products } = req.body;
            const savedProducts = await Product.insertMany(products)
            if (!savedProducts) res.json(genErrorResponse("Error while saving products"))

            const newCatalog = new Catalog({ products: savedProducts, sellerId: sellerId })
            const savedCatalog = await newCatalog.save()
            if (!savedCatalog) res.json(genErrorResponse("Error while saving catalog"))
            res.json(genSuccessResponse("Created catalog successfully!", savedCatalog))
        } catch (err) {
            return res.json(genErrorResponse("Something went wrong while creating catalog")).status(400)
        }
    },

    orders: (req, res) => {
        res.json(genSuccessResponse("orders"))
    }
}