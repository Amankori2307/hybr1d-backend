const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = mongoose.Schema({
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    buyerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    products: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }]
    },
}, { timestamps: true })


module.exports = mongoose.model('Order', OrderSchema);