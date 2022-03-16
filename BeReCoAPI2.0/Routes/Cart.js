const express = require('express');
const { isAuthenticated } = require('../Loaders/authenticate');
const router = express.Router();
const Cart = require('../Services/CartService'); 

module.exports = (app) => {
    app.use('/carts/mine', router)

    router.post('/', isAuthenticated, Cart.createCart);
    router.post('/:cartId', isAuthenticated, Cart.createCartItems);
    router.delete('/:cartId', isAuthenticated, Cart.removeCartItem);
    router.get('/', isAuthenticated, Cart.loadCart);
    router.put('/:cartId', isAuthenticated, Cart.updateCartItem);
    router.post('/:cartId/checkOut', isAuthenticated, Cart.checkout)

}