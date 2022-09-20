var mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);