const { SELLER, BUYER } = require("./constants");


module.exports = {
    isSeller: (user) => {
        return user.role == SELLER
    },

    isBuyer: (user) => {
        return user.role == BUYER
    },

    tokenExtractor: (req) => {
        var token = null;
        if (req.header('authorization')) {
            token = req.header('Authorization');
            token = token.split(" ");
            token = token?.length == 2 ? token[1] : null;
        }
        return token;
    },
    getUserDetailsToSend: (user) => {
        const { email, id, role } = user;
        return { email, id, role }
    }
}