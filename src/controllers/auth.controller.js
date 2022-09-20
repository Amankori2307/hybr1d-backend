const { User } = require('../models')
const JWT = require('jsonwebtoken')
const { genErrorResponse, genSuccessResponse } = require('../utils/response')
const { getUserDetailsToSend } = require('../utils/utils')


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
        const user = await User.findOne({ email: req.body.email })
        if (user) return res.json(genErrorResponse("Email already registered!")).status(400)
        const newUser = new User(req.body);
        const savedUser = await newUser.save()
        if (!savedUser) {
            return res.json(genErrorResponse("Error while creating user")).status(400)
        }
        return res.json(genSuccessResponse("User created successfully!", getUserDetailsToSend(newUser)))
    },

    login: (req, res) => {
        const { email, password } = req.body;
        authenticate(email, password, function (err, user) {
            if (err) return res.status(401).json(genErrorResponse(err.message));
            if (!user) return res.status(401).json(genErrorResponse());
            const token = signToken(user._id);
            return res.json(genSuccessResponse("", {
                isAuthenticated: true,
                token: token,
                user: getUserDetailsToSend(user)
            }))

        })
    },

    authenticated: (req, res) => {
        if (req.isAuthenticated) {
            return res.json(genSuccessResponse("", {
                isAuthenticated: true,
                user: getUserDetailsToSend(req.user)
            }))
        }
    }
}