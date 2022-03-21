const { Order, OrderItem, Profile } = require('../db');
const CartItems = require('../Models/Carts/CartItems');
const Orders = require('../Models/Orders/Orders');

exports.createOrder = (req, res, ) => {
    Order.create({ }).then(order => {
        if (order) {
            res.status(200).send(order)

            }
            
         else {
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
exports.getAllOrders = async (req, res) => {
    const profile= await Profile.findOne({where:{UserId: req.user.id}})
    await Order.findAll({ where: { ProfileId: profile.id } }).then(orders => {
        if (orders) {
                 res.status(200).send(orders)
        } else {
            throw new Error()
             }
         })
}
exports.UpdateOrder = async (req, res) => {
    const orderId = req.body.orderId

    Order.update({ status: Order.changeStatus() }, { where: { id: orderId } }).then(num => {
        if (num === 1) {
            res.status(200).send(update)
        } else {
           res.send(Error())
        }
    })
}
    
