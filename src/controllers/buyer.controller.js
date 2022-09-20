const { User, Catalog } = require("../models")
const { SELLER } = require("../utils/constants")
const { genSuccessResponse, genErrorResponse } = require("../utils/response")

module.exports = {
    listOfSellers: async (req, res) => {
        try {
            const sellers = await User.find({ role: SELLER }).select({ password: 0 })
            if (!sellers) return res.json(genErrorResponse("Error while fetching list of sellers")).status(400);
            return res.json(genSuccessResponse("", sellers))
        } catch (err) {
            return res.json(genErrorResponse("Something went wrong while fetching list of sellers"))
        }
    },

    sellerCatalog: async (req, res) => {
        try {
            const { sellerId } = req.params
            const catalog = await Catalog.findOne({ sellerId }).populate('products')
            if (!catalog) return res.json(genErrorResponse(`Error while getting catalog for seller ${sellerId}`)).status(400)
            return res.json(genSuccessResponse("", catalog))
        } catch (err) {
            return res.json(genErrorResponse(`Something went wrong while fetching seller ${req.params.id}'s catalog`))
        }
    },

    createOrder: (req, res) => {
        return res.json(genSuccessResponse("createOrder"))
    },
}   