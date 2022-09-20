const express = require('express');
const router = express.Router();
const AuthCtrl = require('../controllers/auth.controller')
const passport = require('../utils/passport')

router.post('/register', AuthCtrl.signup);
router.post('/login', passport.authenticate('local', { session: false }), AuthCtrl.login)
router.get('/authenticated', passport.authenticate('jwt', { session: false }), AuthCtrl.authenticated)

module.exports = router