// Import product model
Product = require('./models/productModel');

// Handle index actions
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
            message: "Products retrieved successfully",
            data: products
        });
    });
};

// Handle create product actions
exports.new = function (req, res) {
    var product = new Product();
    product.name = req.body.name ? req.body.name : product.name;
    product.current_price = req.body.current_price;
    
    // save the product and check for errors
    product.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New product created.',
            data: product
        });
    });
};

// Handle view product info
exports.view = function (req, res) {
    Product.findById(req.params.product_id, function (err, product) {
        if (err)
            res.send(err);
        res.json({
            message: 'product details loading..',
            data: product
        });
    });
};

// Handle update product info
exports.update = function (req, res) {

Product.findById(req.params.product_id, function (err, product) {
        if (err)
            res.send(err);

product.name = req.body.name ? req.body.name : product.name;
        product.current_price = req.body.current_price;

// save the product and check for errors
        product.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'product info updated',
                data: product
            });
        });
    });
};

// Handle delete product
exports.delete = function (req, res) {
    Product.remove({
        _id: req.params.product_id
    }, function (err, product) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'product deleted'
        });
    });
};