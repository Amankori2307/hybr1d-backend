var mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    name: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('Product', ProductSchema);