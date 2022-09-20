const JWT = require('jsonwebtoken');
const User = require('../models/user.model');
const { genErrorResponse, genSuccessResponse } = require('../utils/response')

const tokenExtractor = (req) => {
    var token = null;
    if (req.header('authorization')) {
        token = req.header('Authorization');
        token = token.split(" ");
        token = token?.length == 2 ? token[1] : null;
    }
    return token;
}
module.exports = {
    isAuthenticated: (req, res, next) => {
        var token = tokenExtractor(req);
        var payload = JWT.decode(token);
        User.findById({ _id: payload.sub }, (err, user) => {
            if (err) return res.json(genErrorResponse(err.message)).status(401);;
            if (!user) return res.json(genErrorResponse()).status(401);
            req.isAuthenticated = true;
            req.user = user;
            next()
        })
    }
}
