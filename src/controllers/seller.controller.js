const { genSuccessResponse, genErrorResponse } = require("../utils/response")
const { Product, Catalog, Order } = require('../models')

module.exports = {
    createCatalog: async (req, res) => {
        try {
            const sellerId = req.user.id;
            const catalog = await Catalog.findOne({ sellerId })
            if (catalog) return res.status(400).json(genErrorResponse(`Catalog already exists for seller ${sellerId}`))

            const { products } = req.body;
            const savedProducts = await Product.insertMany(products)
            if (!savedProducts) res.status(400).json(genErrorResponse("Error while saving products"))

            const newCatalog = new Catalog({ products: savedProducts, sellerId: sellerId })
            const savedCatalog = await newCatalog.save()
            if (!savedCatalog) res.status(400).json(genErrorResponse("Error while saving catalog"))
            res.json(genSuccessResponse("Created catalog successfully!", savedCatalog))
        } catch (err) {
            return res.status(400).json(genErrorResponse("Something went wrong while creating catalog"))
        }
    },

    orders: async (req, res) => {
        try {
            const sellerId = req.user.id;
            const orders = await Order.find({ sellerId: sellerId })
            if (!orders) return res.status(400).json(`Error while fetching orders for seller ${sellerId}`)
            return res.json(genSuccessResponse("", orders))
        } catch (err) {
            console.log(err)
            return res.status(400).json(genErrorResponse(`Something went worng while fetching orders for seller ${req.user.id}`))
        }
    }
}