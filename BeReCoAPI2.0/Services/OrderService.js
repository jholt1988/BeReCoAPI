const { Order, OrderItem } = require('../db');
const CartItems = require('../Models/Carts/CartItems');

exports.createOrder = (req, res, cartItems, total, cartId, userId ) => {
    Order.create({total: total, userId:userId, }).then(order => {
        if (order) {
            order.createOrderItems(cartItems).then((items, order) => {
                order.items.push(items)
                res.status(201).send(order)

            })
            
        } else {
            res.send(Error('Cart Not Created'))
        }
    })
}

    exports.addItems = async(req, res) => {
        const orderItem = CartItems.findAll({where: {CartId: req.params.cartId} })
        OrderItem.create({ item }).then(item => {
            this.Order.items.push(item)
            res.status(200).send(item)
        }
            
        )
     }
    
