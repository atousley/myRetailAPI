// Ease of use section - not part of case study params //

// Import product model
var Product = require('../models/productModel');


// POST
// create new products in internal db
exports.new = function (req, res) {
    var product = new Product();
    product.extID = req.body.extID;
    product.value = req.body.value;
    product.currency_code = req.body.currency_code;
    
    // save the product and check for errors
    product.save(function (err) {
        if (err) {
            res.json(err);
        }
        res.json({
            message: 'New product created.',
            data: product
        });
    });
};

// GET
// http://localhost:8080/api/products/
// list of internal products, available price info, and external ID
exports.index = function (req, res) {
    Product.get(function (err, products) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Products with pricing data availeble for GET calls to redsky API, use extID value.",
            products: products
        });
    });
};

// DELETE
// delete product by internal id
exports.delete = function (req, res) {
    
    let id = req.params.product_id;

    Product.findByIdAndRemove(id, function (err) {  
        if (err) {
            res.send(err);
        }     
        res.json({
            status: "success",
            message: 'product deleted'
        });
    });

};