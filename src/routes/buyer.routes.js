const express = require("express");
const router = express.Router();
const { buyerCtrl } = require('../controllers')
const { authMiddleware, validatorMiddleware } = require('../middlewares')

router.get("/list-of-sellers", [
    authMiddleware.isAuthenticated,
    authMiddleware.isBuyer
], buyerCtrl.listOfSellers)

router.get("/seller-catalog/:sellerId", [
    authMiddleware.isAuthenticated,
    authMiddleware.isBuyer
], buyerCtrl.sellerCatalog)

router.post("/create-order/:sellerId", [
    authMiddleware.isAuthenticated,
    authMiddleware.isBuyer,
    validatorMiddleware.validate('order')
], buyerCtrl.createOrder)

module.exports = router