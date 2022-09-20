const User = require('../models/user.model')
const JWT = require('jsonwebtoken')
const { genErrorResponse, genSuccessResponse } = require('../utils/response')


const signToken = (id) => {
    return JWT.sign({
        iss: "QPUpload",
        sub: id
    }, process.env.SECRET_KEY, { expiresIn: '48h' })
}

const authenticate = (email, password, callback) => {
    User.findOne({ email }, (err, user) => {
        if (err) return callback(err);
        if (!user) return callback(null, false);
        user.comparePassword(password, callback);

    })
}

module.exports = {
    signup: async (req, res) => {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if (user) return res.json({ message: { msgBody: 'Email Already Registered!', msgError: true } })
        const newUser = new User(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.json({ message: { msgBody: 'Error has occoured', msgError: true } })
            }
            if (!user) return res.json({ message: { msgBody: 'Error has occoured', msgError: true } })
            return res.json({ message: { msgBody: 'User Successfully Created', msgError: false } })
        })
    },

    login: (req, res) => {
        const { email, password } = req.body;
        authenticate(email, password, function (err, user) {
            if (err) return res.status(401).json(genErrorResponse(err.message));
            if (!user) return res.status(401).json(genErrorResponse());
            const { _id, email, username, role, college, sem, year, branch, url } = user;
            const token = signToken(_id);
            return res.json({
                isAuthenticated: true,
                token: token,
                user: { _id, email, username, role, college, sem, year, branch, url }
            })

        })
    },

    authenticated: (req, res) => {
        if (req.isAuthenticated) {
            const { _id, email, username, role, college, sem, year, branch, url } = req.user;
            return res.json({ isAuthenticated: true, user: { _id, email, username, role, college, sem, year, branch, url } })
        }
    }
}