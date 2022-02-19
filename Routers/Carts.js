const express = require('express');
const router = express.Router();
const Carts = require('../Services/CartService');
const CartItems = require('../Services/CartService')

module.exports = (app) => {
    app.use('/cart', router)


   

    router.get('/:user', Carts.loadActiveCart);


    router.post('/', Carts.create)

    router.post('/:user', CartItems.createCartItem)

    router.delete('/:user', Carts.deleteCart)

    router.post('/checkout/:user', Carts.CheckOut)

}
