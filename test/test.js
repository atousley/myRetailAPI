var nock = require('nock');

// Use nock to test request strings
describe('GET function', function() {

    it('Should get product info by ID', function() {
        nock('http://localhost:8080/api')
        .get('/products', 'product_id=13860428')
        .reply(200);
    });

    it('Should update product price by ID', function() {
        nock('http://localhost:8080/api')
        .put('/products', 'product_id=13860428&value=13.45')
        .reply(200);
    });

});