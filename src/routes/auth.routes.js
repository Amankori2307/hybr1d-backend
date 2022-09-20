const express = require('express');
const router = express.Router();
const { authCtrl } = require('../controllers')
const { authMiddleware } = require('../middlewares')

router.post('/register', authCtrl.signup);
router.post('/login', authCtrl.login)
router.get('/authenticated', authMiddleware.isAuthenticated, authCtrl.authenticated)

module.exports = router