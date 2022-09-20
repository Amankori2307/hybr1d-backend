const JWT = require('jsonwebtoken');
const { User } = require('../models')
const { genErrorResponse } = require('../utils/response');
const utils = require('../utils/utils');


module.exports = {
    isAuthenticated: (req, res, next) => {
        var token = utils.tokenExtractor(req);
        if (!token) return res.status(401).json(genErrorResponse("Couldn't find access token in request"))

        var payload = JWT.decode(token);
        if (!payload) return res.status(401).json(genErrorResponse("Invalid access token"))

        User.findById({ _id: payload.sub }, (err, user) => {
            if (err) return res.status(401).json(genErrorResponse(err.message));
            if (!user) return res.status(401).json(genErrorResponse("Either the token has expired or the token is incorrect")).status(401);
            req.isAuthenticated = true;
            req.user = user;
            next()
        })
    },

    isSeller: (req, res, next) => {
        if (!utils.isSeller(req.user)) return res.status(401).json(genErrorResponse("Loggedin user is not a seller"));
        next()
    },

    isBuyer: (req, res, next) => {
        if (!utils.isBuyer(req.user)) return res.status(401).json(genErrorResponse("Loggedin user is not a seller"));
        next()
    }
}
