const express = require('express');
const router = express.Router();
const AuthCtrl = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/register', AuthCtrl.signup);
router.post('/login', AuthCtrl.login)
router.get('/authenticated', authMiddleware.isAuthenticated, AuthCtrl.authenticated)

module.exports = router