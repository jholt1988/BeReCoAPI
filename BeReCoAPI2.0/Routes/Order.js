const express = require('express');
const { isAuthenticated } = require('../Loaders/authenticate');
const router = express.Router();
const Order = require('../Services/OrderService')

module.exports = (app) => {
    app.use('/orders', router);

    router.get('/all', isAuthenticated, Order.getAllOrders)

    router.put('/:orderId', isAuthenticated, Order.UpdateOrder)

}