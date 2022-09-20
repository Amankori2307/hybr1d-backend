const mongoose = require('mongoose');

const CatalogSchema = mongoose.Schema({
    products: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }]
    }
})


module.exports  =  mongoose.model('Catalog', CatalogSchema);