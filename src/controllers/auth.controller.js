const express = require('express');
const router = express.Router();
const passport = require('../utils/passport')
const User = require('../models/user.model')
const JWT = require('jsonwebtoken')


const signToken = (id) => {
    return JWT.sign({
        iss: "QPUpload",
        sub: id
    }, process.env.SECRET_KEY, { expiresIn: '30s' })
}

router.post('/register', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email })
    if (user) return res.json({ message: { msgBody: 'Email Already Registered!', msgError: true } })
    const newUser = new User(req.body);
    newUser.save((err, user) => {
        if (err) {
            console.log(err)
            return res.json({ message: { msgBody: 'Error has occoured', msgError: true } })
        }
        if (!user) return res.json({ message: { msgBody: 'Error has occoured', msgError: true } })
        return res.json({ message: { msgBody: 'User Successfully Created', msgError: false } })
    })
});

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated) {
        const { _id, email, username, role, college, sem, year, branch, url } = req.user;
        const token = signToken(_id);
        return res.json({
            isAuthenticated: true,
            token: token,
            user: { _id, email, username, role, college, sem, year, branch, url }
        })

    }
})

router.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.isAuthenticated) {
        const { _id, email, username, role, college, sem, year, branch, url } = req.user;
        return res.json({ isAuthenticated: true, user: { _id, email, username, role, college, sem, year, branch, url } })
    }
})

router.get('/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findOne({ _id: req.params._id }).then((user, err) => {
        const { _id, email, username, role, college, sem, year, branch, url } = user
        if (err) res.json({ message: { msgBody: "Error has Occured", msgError: true } })
        res.json({ _id, email, username, role, college, sem, year, branch, url })
    })
})

module.exports = router