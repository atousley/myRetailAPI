var mongoose = require('mongoose');

// Setup product schema
var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    current_price: {
        type: String,
        required: true
    }
});

// Export product model
var Product = module.exports = mongoose.model('product', productSchema);
module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}