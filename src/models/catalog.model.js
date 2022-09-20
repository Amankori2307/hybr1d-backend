const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CatalogSchema = mongoose.Schema({
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
    },

    products: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }]
    }
}, { timestamps: true })


module.exports = mongoose.model('Catalog', CatalogSchema);