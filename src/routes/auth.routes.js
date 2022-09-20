const express = require('express');
const router = express.Router();
const { authCtrl } = require('../controllers')
const { authMiddleware, validatorMiddleware } = require('../middlewares')

router.post('/register', [validatorMiddleware.validate('user')], authCtrl.signup);
router.post('/login', authCtrl.login)
router.get('/authenticated', authMiddleware.isAuthenticated, authCtrl.authenticated)

module.exports = router