const express = require('express');
const router = express.Router();
const Orders = require('../Services/OrderService');

module.exports = (app) => {
    app.use('/:user/orders', router)

    router.put('/', Orders.UpdateOrder)

    router.get('/', Orders.findOrders)

    router.get('/:orderId', Orders.findOrder)
}