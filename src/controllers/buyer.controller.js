const { genSuccessResponse } = require("../utils/response")

module.exports = {
    listOfSellers: (req, res) => {
        return res.json(genSuccessResponse("listOfSellers"))
    },

    sellerCatalog: (req, res) => {
        return res.json(genSuccessResponse("sellerCatalog"))
    },

    createOrder: (req, res) => {
        return res.json(genSuccessResponse("createOrder"))
    }, 
}   