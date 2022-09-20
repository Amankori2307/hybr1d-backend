const JWT = require('jsonwebtoken');
const { User } = require('../models')
const { genErrorResponse } = require('../utils/response');
const utils = require('../utils/utils');


module.exports = {
    isAuthenticated: (req, res, next) => {
        var token = utils.tokenExtractor(req);
        if (!token) return res.json(genErrorResponse("Couldn't find access token in request")).status(401)

        var payload = JWT.decode(token);
        if (!payload) return res.json(genErrorResponse("Invalid access token")).status(401)

        User.findById({ _id: payload.sub }, (err, user) => {
            if (err) return res.json(genErrorResponse(err.message)).status(401);;
            if (!user) return res.json(genErrorResponse("Either the token has expired or the token is incorrect")).status(401);
            req.isAuthenticated = true;
            req.user = user;
            next()
        })
    },

    isSeller: (req, res, next) => {
        if (!utils.isSeller(req.user)) return res.json(genErrorResponse("Loggedin user is not a seller")).status(401);
        next()
    },

    isBuyer: (req, res, next) => {
        if (!utils.isBuyer(req.user)) return res.json(genErrorResponse("Loggedin user is not a seller")).status(401);
        next()
    }
}
