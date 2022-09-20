const express = require("express");
const router = express.Router();
const { buyerCtrl } = require('../controllers')

router.get("/list-of-sellers", buyerCtrl.listOfSellers)
router.get("/seller-catalog/:sellerId", buyerCtrl.sellerCatalog)
router.post("/create-order/:sellerId", buyerCtrl.createOrder)

module.exports = router