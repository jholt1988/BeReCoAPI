
const { Op, Sequelize, where } = require('sequelize')
const { default: Stripe } = require('stripe')
const { Carts, CartItems, Orders, OrderItems, Products } = require('../db')
const User = require('../Models/User')
const sequelize = new Sequelize({dialect: 'postgres'})


exports.create =  (req, res) => {
    

    const cart = {
        status: req.body.status, 
        userId: req.body.userId,
        
    }


console.log(cart)
    Carts.create(cart)
        .then(data => {
            if (data) {
              res.send(data)
            }else {
               res.status(404).send({
                    message:'User Creation Unsuccessful'
                })
            }
        })
        .catch(err => {
            res.send({
            message: err.message
        })
    })
}               

exports.createCartItem = async (req, res) => {
     
    const product = await Products.findByPk(req.body.ProductId)
    console.log(product)
    const cartItem = { 
    
        ProductId: req.body.ProductId,
        quantity: req.body.quantity, 
        CartId: req.body.CartId,
        
    
    
    }
    CartItems.create(cartItem)
    .then(data => {
        if (data) {
           res.send(data)
        } else {
            res.status(404).send({
                message: 'Item  Not Added"                                                                                                '
            })
        }
    })

}

exports.deleteCart = (req, res) => {
    const id = req.query.id

    Carts.destroy({ where: { id: id } }, () => {
        if (CartItems.cartId) {
            CartItems.destroy({ where: { cartId: id || null } })
        }
        
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Cart deleted'
                })
            } else {
                res.status(404).send({
                    message: 'Error-Used Already Deleted '
                })
            }
        })
}
    exports.loadCartItems = (req,  res) => {
        const CartId = req.params.CartId  
        
        CartItems.findAll({ where: { CartId: CartId} })
            .then(items => {
                if (items)                         {
                    res.send(items)
                } else {
                    res.status(404).send({
message: 'Cart Empty'
                    })
                }
            })
            .catch(err => {
                res.send({ message: err.message })
            })
        return  CartItems
}

function findActiveCart(userId) {

    const activeCartId =  Carts.findAll({
        attributes: {
            includes: [['cartId'], [sequelize.where([sequelize.fn('max'), sequelize.col('updatedAt')])]]
        },

        where: {
            userId: userId
        }
                    
                    
    })
    return activeCartId
}
        
    
    
    
    


exports.loadActiveCart = async (req, res) => {
    const userId = req.params.user

    const active = await findActiveCart(userId)
    console.log(active)
    
    const cartId = await active[0].dataValues.id
        
        
    Carts.findByPk(cartId, {
        include: {
            model: CartItems,

        }
    }),
        CartItems.findAll({
            where: { CartId: cartId },
            include: {
                model: Products,
                attributes: ['productName', 'price', 'description']
            }
            
})
        
                .then(async data => {
                    const results = await data
                    if (results) {
                        res.send(results);
                    } else {
                        res.status(404).send({
                            message: 'Cart Not Found'
                        })
                    }
                })
                .catch(err => {
                    res.send({
                        message: err.message
                    })
                })
}

exports.CheckOut = async (req, res) => {
    const userId = req.params.user
 
    const cart = await Carts.findOne({
        where: { userId: userId }
    })
        .then(data => {
            const Cart = data
            return Cart
        })
    
    // Load cart items
    const cartItems = await CartItems.findAll({
        where: { CartId: cart.id },

    })
        .then(data => {
            const cartitems = data
            return cartitems
        })
    
    // Generate total price from cart items
    const total = cartItems.reduce((total, item) => {
        return total += Number(item.price);
    }, 0);
    
    

    // Generate initial order
   
    
    
    
    const orderItems = cartItems.map((item ) => {
        let Items = [] 

        const data = Object.values(item.dataValues).map(props => {
            const keys = Object.keys(item.dataValues) 
            
            const items = {props}
            
          
        })
        
        
           return  Items.push(data.items)
        
       
                
            
    
    })

    console.log(orderItems)
        
        const Order = {

            total: total,
            items: orderItems,
            userId: req.body.user,
            status: 'PLACED',
    
        }


        Orders.create(Order);
        // Make charge to payment method (not required in this project)
    const Stripe = require('stripe')
        const stripe = Stripe('sk_test_51KJmHTAjEYOrlpJbcRtNktEFaSBqHxaUsaAcPgjDQojexeyRbcGbKnqGwLIFhD0C7PP6EVUivLLYRdJMC216kzvI00hK4IjFwh');
    const customer =await stripe.customers.create({
         description: 'test customer',
        email: req.body.email, 
        source: 'tok_mastercard'
        })

        const charge = stripe.charges.create({
            amount: Number(total),
            currency: 'usd',
            customer: customer.id,
    
            description: "Test"
        })

            .then(data => {
                if (data) {
    
                    res.send(data)
                } else {
                    res.status(404).send({
                        message: error
                    })
                }
            })
        // On successful charge to payment method, update orde

    }




// exports.loadActiveCart =  (req, res) => {
   
//     const active = 
//         Carts.findAll({
//             where: { userId: req.params.user }
//         })
//             .then(async data => {
                
//                 console.log(data.length)
//                 if (data && data.length > 1) {
//                     for (let i = 0; i <= data.length; i++) {
//                         let activeCart;
//                         let indexOne = i
//                         let indexTwo = i + 1
//                         const dateOne = data[indexOne].dataValues.updatedAt;
//                         const dateTwo = data[indexTwo].dataValues.updatedAt;
    
//                         if (dateOne > dateTwo || dateTwo == null) {
//                           return  activeCart = data[indexOne].dataValues.id
//                             console.log(activeCart)
//                         }
//                         if (dateTwo > dateOne || dateOne == null) {
//                            return activeCart = data[indexTwo].dataValues.id
//                         }

//                      return   activeCart = data[indexOne].id
                    

                    
                        
//                     }
                
              
//                 }
//                 return
            
//             })
//             .then(  data => { 
//                 data = active

//                 console.log(data)
//                Carts.findByPk( data)
//             })
//             // .then(active => {
//             //     console.log(active)
//             //     CartItems.findAll({
//             //         where: { CartId: active }
//             //     })
//             // })
//             .then(async data => {
//                 if(data){
//                   await  res.send(data)
//                 } else {
//                     res.status(404).send({
//                         message: 'Cart Not Found'
//                     })
//                 }
//             })
//             .catch(err => {
//                 res.send({ message: err.message })
//             })
    
// }
        

    

