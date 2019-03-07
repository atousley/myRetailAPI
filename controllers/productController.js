// Import product model
var Product = require('../models/productModel');

// Import Fetch API
var fetch = require("node-fetch");

// External Request Vars
// example given from Target 'https://redsky.target.com/v2/pdp/tcin/13860428?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics';
// var url = 'https://redsky.target.com/v2/pdp/tcin/13860428?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics';

var url = '';
var baseUrl = 'https://redsky.target.com/v2/pdp/tcin/';
var productID = '';
var endUrl = '?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics';

var productInfo = {};


// Handle view product info
exports.view = function (req, res) {
    
    // run three functions here, wait to run until each returns it's promise
    // 1. external GET
    // 2. internal cost_info call
    // 3. combine two in the same json response

    Product.find({ 'extID': req.params.product_id }, function (err, product) {
        if (err)
            res.send(err);
        res.json({
            message: 'product info',
            data: product
        });
    });
};

// Handle update product info
exports.update = function (req, res) {
    Product.findOne({ 'extID': req.params.product_id }, function (err, product) {
        if (err)
            res.send(err);

        product.current_price = req.body.current_price;
        console.log('PRICE', product.current_price);

        // save the product and check for errors
        product.save(function (err, product) {
            if (err)
                res.json(err);
            res.json({
                message: 'product info updated',
                data: product
            });
        });
    });
};




// Ease of use section - not part of case study params //

// Handle create product actions
exports.new = function (req, res) {
    var product = new Product();
    product.extID = req.body.extID;
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

// Handle index actions and view
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