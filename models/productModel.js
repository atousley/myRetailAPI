var mongoose = require('mongoose');

// Setup product schema
var productSchema = mongoose.Schema({
    extID: {
        type: Number,
        required: true  
    },
    value: {
        type: Number,
        required: true
    },
    currency_code: {
        type: String,
        required: true
    }
});

// Export product model
var Product = module.exports = mongoose.model('product', productSchema);
module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}