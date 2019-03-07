// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function(req, res) {
    res.json({
       status: 'API Working',
       message: 'myRetail API',
    });
});

// Import product controller
var productController = require('../controllers/productController');

// Import ease of use controller
var easeofUseController = require('../controllers/easeofUseController');


// Product Request Routes
router.route('/products')
    .get(easeofUseController.index)
    .post(easeofUseController.new);

router.route('/products/:product_id')
    .get(productController.view)
    .put(productController.update)
    .delete(easeofUseController.delete);

// Export API routes
module.exports = router;