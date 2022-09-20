const { User } = require('../models')
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
        if (user) return res.json(genErrorResponse("Email Already Registered!")).status(400)
        const newUser = new User(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.json(genErrorResponse("Error has occoured")).status(400)
            }
            if (!user) return res.json(genErrorResponse("Error has occoured")).status(400)
            return res.json(genSuccessResponse("User Successfully Created", user))
        })
    },

    login: (req, res) => {
        const { email, password } = req.body;
        authenticate(email, password, function (err, user) {
            if (err) return res.status(401).json(genErrorResponse(err.message));
            if (!user) return res.status(401).json(genErrorResponse());
            const { _id, email, username, role, college, sem, year, branch, url } = user;
            const token = signToken(_id);
            return res.json(genSuccessResponse("", {
                isAuthenticated: true,
                token: token,
                user: { _id, email, username, role, college, sem, year, branch, url }
            }))

        })
    },

    authenticated: (req, res) => {
        if (req.isAuthenticated) {
            const { _id, email, username, role, college, sem, year, branch, url } = req.user;
            return res.json(genSuccessResponse("", {
                isAuthenticated: true,
                user: { _id, email, username, role, college, sem, year, branch, url }
            }))
        }
    }
}