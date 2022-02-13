const express = require('express');
const router = express.Router()
const Product = require('../Services/ProductService');

module.exports = (app) => {

    app.use('/store', router)

    router.post('/products', Product.create);

    router.put('/products/:id', Product.update);

    router.get('/products/:id', Product.findOne);

    router.get('/products', Product.getAll);

    router.delete('/products/:id', Product.deleteOne)

}