const User = require('../models/user.model')
const JWT = require('jsonwebtoken')


const signToken = (id) => {
    return JWT.sign({
        iss: "QPUpload",
        sub: id
    }, process.env.SECRET_KEY, { expiresIn: '48h' })
}

module.exports = {
    signup: async (req, res) => {
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
    },

    login: (req, res) => {
        if (req.isAuthenticated) {
            const { _id, email, username, role, college, sem, year, branch, url } = req.user;
            const token = signToken(_id);
            return res.json({
                isAuthenticated: true,
                token: token,
                user: { _id, email, username, role, college, sem, year, branch, url }
            })

        }
    },

    authenticated: (req, res) => {
        if (req.isAuthenticated) {
            const { _id, email, username, role, college, sem, year, branch, url } = req.user;
            return res.json({ isAuthenticated: true, user: { _id, email, username, role, college, sem, year, branch, url } })
        }
    }
}