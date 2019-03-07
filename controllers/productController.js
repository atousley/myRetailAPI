// Import product model
var Product = require('../models/productModel');

// Import Fetch API
var fetch = require("node-fetch");

// External Request Vars
// example given from Target 'https://redsky.target.com/v2/pdp/tcin/13860428?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics';
var url = '';
var baseUrl = 'https://redsky.target.com/v2/pdp/tcin/';
var productID = '';
var endUrl = '?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics';

// Global response variables
var prodName = {};
var finalResponse = {};
var finalJson = {};


// GET
// Initial handling of GET request
exports.view = function (req, res) {

    var promise = extGET(req);

    promise.then(function(response) {
        if (finalResponse.status == 'error') {
            res.send(finalJson);

        } else {
            Product.find({ 'extID': req.params.product_id }, function (err, product) {
                
                let value = product[0].value;
                let currency_code = product[0].currency_code;
                let valCurrency = {value, currency_code};

                finalResponse.current_price = valCurrency;
                
                getFinalJson();

                if (err)
                    res.send(err);
                res.send(finalJson);

            });
        }
    });
};

// GET from redsky.target.com and determine if response is valid product
function extGET (req) {
    // reset final response var
    finalResponse = {};

    let productInfo = {};

    productID = req.params.product_id;
    finalResponse.id = parseInt(req.params.product_id);

    // URL with product ID
    url = baseUrl + productID + endUrl;

    var exGetProm = fetch(url)
      .then(function(response) {
          return response.json();
      })
      .then (function(productJson) {

          productInfo = productJson;

        // if the req ID does not return data from redsky API, setup json error response
        // else, parse the response for product name
          if (productInfo.product.item.product_description == undefined) {

              finalResponse.status = 'error';
              finalResponse.message = 'There is no product description for this product id'
            
              getFinalJson();
          } else {    
              parseProductInfo (productInfo);
          }
          return productID

      })
      .catch(error => console.error('Error', error));

    return exGetProm;
};

// function to set product name in global response var
function parseProductInfo (prodInfo) {
    prodName = prodInfo.product.item.product_description.title;
    finalResponse.name = prodName;
};

// function to convert global response var to JSON for final response
function getFinalJson () {
    finalJson = JSON.stringify(finalResponse);
    // console.log('FINAL JSON FUNCTION', finalJson);
};


// PUT
// request to update price in datastore
exports.update = function (req, res) {
    Product.findOne({ 'extID': req.params.product_id }, function (err, product) {
        if (err) {
            res.send(err);
        }

        product.value = req.body.value;
        console.log('PRICE', product.value);

        // save updated price info
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