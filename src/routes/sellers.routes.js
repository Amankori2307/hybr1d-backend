const express = require('express');
const router = express.Router();
const AuthCtrl = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create-catalog', AuthCtrl.signup);
router.get('/orders', authMiddleware.isAuthenticated, AuthCtrl.login)

module.exports = router