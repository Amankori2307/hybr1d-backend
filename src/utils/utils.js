const BUYER = "BUYER";
const SELLER = "SELLER";

module.exports = {
    isSeller: (user) => {
        return user.role == SELLER
    },

    tokenExtractor: (req) => {
        var token = null;
        if (req.header('authorization')) {
            token = req.header('Authorization');
            token = token.split(" ");
            token = token?.length == 2 ? token[1] : null;
        }
        return token;
    }
}