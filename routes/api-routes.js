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
var productController = require('../productController');

// Product routes
router.route('/products')
    .get(productController.index)
    .post(productController.new);

router.route('/products/:product_id')
    .get(productController.view)
    .patch(productController.update)
    .put(productController.update)
    .delete(productController.delete);

// Export API routes
module.exports = router;