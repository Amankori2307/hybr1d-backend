const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = mongoose.Schema({
    Products: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }]
    },
})


module.exports = mongoose.model('Order', OrderSchema);