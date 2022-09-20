const express = require('express');
const router = express.Router();
const { authMiddleware, validatorMiddleware } = require('../middlewares');
const { sellerCtrl } = require('../controllers');

router.post('/create-catalog', [
    authMiddleware.isAuthenticated,
    authMiddleware.isSeller,
    validatorMiddleware.validate('catalog')], sellerCtrl.createCatalog);
router.get('/orders', [authMiddleware.isAuthenticated, authMiddleware.isSeller], sellerCtrl.getOrders)

module.exports = router