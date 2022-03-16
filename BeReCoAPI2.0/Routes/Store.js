const express = require('express');
const router = express.Router()
const Store = require('../Services/Store/StoreService');
const {isAuthenticated} = require('../Loaders/authenticate')


module.exports = (app) => {
    app.use('/store', router)

    router.post('/vendors', isAuthenticated, Store.createVendor);
    router.post('/products', isAuthenticated, Store.createProduct);
    router.put('/products/', isAuthenticated, Store.updateProduct);
    router.get('/products', isAuthenticated, Store.getAllProducts);
    router.get('/product/', isAuthenticated, Store.getProduct);
    router.get('/vendors/', isAuthenticated, Store.getVendor);
    router.get('/vendors/inventory', isAuthenticated, Store.getVendorProductList);
}

