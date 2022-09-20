const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares');
const { sellerCtrl } = require('../controllers')

router.post('/create-catalog', [authMiddleware.isAuthenticated, authMiddleware.isSeller], sellerCtrl.createCatalog);
router.get('/orders', [authMiddleware.isAuthenticated, authMiddleware.isSeller], sellerCtrl.getOrders)

module.exports = router