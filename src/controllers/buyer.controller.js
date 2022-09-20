const { User, Catalog, Order } = require("../models")
const { SELLER } = require("../utils/constants")
const { genSuccessResponse, genErrorResponse } = require("../utils/response")
const { catalog } = require("../validators")

module.exports = {
    listOfSellers: async (req, res) => {
        try {
            const sellers = await User.find({ role: SELLER }).select({ password: 0 })
            if (!sellers) return res.status(400).json(genErrorResponse("Error while fetching list of sellers"));
            return res.json(genSuccessResponse("", sellers))
        } catch (err) {
            return res.status(400).json(genErrorResponse("Something went wrong while fetching list of sellers"))
        }
    },

    sellerCatalog: async (req, res) => {
        try {
            const { sellerId } = req.params
            const catalog = await Catalog.findOne({ sellerId }).populate('products')
            if (!catalog) return res.status(400).json(genErrorResponse(`Error while getting catalog for seller ${sellerId}`))
            return res.json(genSuccessResponse("", catalog))
        } catch (err) {
            return res.status(400).json(genErrorResponse(`Something went wrong while fetching seller ${req.params.id}'s catalog`))
        }
    },

    createOrder: async (req, res) => {
        try {
            const { sellerId, products } = req.body;
            const seller = await User.findById(sellerId)
            if (!seller) return res.status(400).json(genErrorResponse("Error while fetching seller"));

            const catalog = await Catalog.findOne({ sellerId })
            if (!catalog) return res.status(400).json(genErrorResponse("Error while fetching catalog"));
            console.log(catalog.products)

            products.forEach(product => {
                if (!catalog.products.includes(product)) {
                    return res.status(400).json(genErrorResponse(`Product ${product} doesn't belong to seller ${sellerId}`))
                }
            })

            const order = new Order({ sellerId: sellerId, products: products, buyerId: req.user.id });
            const savedOrder = order.save();
            if (!savedOrder) return res.json("Error while saving order")

            return res.json(genSuccessResponse("Order created successfuly", order))
        } catch {
            return res.status(400).json(genErrorResponse("Something went wrong while creating order"))
        }
    },
}   