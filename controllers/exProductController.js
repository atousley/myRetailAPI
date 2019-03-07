// Import fetch API
var fetch = require("node-fetch");

// example given from Target 'https://redsky.target.com/v2/pdp/tcin/13860428?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics';
// var url = 'https://redsky.target.com/v2/pdp/tcin/13860428?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics';

var url = '';
var baseUrl = 'https://redsky.target.com/v2/pdp/tcin/';
var productID = '';
var endUrl = '?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics';

var productInfo = {};

exports.index = function (req, res) {
    productID = req.params.product_id;

    // URL with product ID
    url = baseUrl + productID + endUrl;
    console.log(url);

    fetch(url)
      .then(function(response) {
          return response.json();
      })
      .then (function(productJson) {
          productInfo = productJson;
          parseProductInfo (productInfo);

      })
      .catch(error => console.error('Error', error));
    
};

function parseProductInfo (prodInfo) {
    console.log('PROD INFO', prodInfo);

    var prodName = prodInfo.product.item.product_description.title;
    console.log('PROD NAME', prodName);
};



