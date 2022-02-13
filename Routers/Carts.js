const express = require('express');
const router = express.Router();
const Carts = require('../Services/CartService');
const CartItems = require('../Services/CartService')

module.exports = (app) => {
    app.use('/:user/cart', router)


   

    router.get('/:user', Carts.loadActiveCart);


    router.post('/', Carts.create)

    router.post('/edit', CartItems.createCartItem)

    router.delete('/edit', Carts.deleteCart)

    router.post('/:user/checkout', Carts.CheckOut)

}
