var mongoose = require('mongoose');

// Setup product schema
var productSchema = mongoose.Schema({
    extID: {
        type: Number,
        required: true  
    },
    current_price: {
        type: Object,
        required: true
    }
});

// Export product model
var Product = module.exports = mongoose.model('product', productSchema);
module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}