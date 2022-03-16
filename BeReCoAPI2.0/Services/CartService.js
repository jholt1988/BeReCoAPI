const { Cart, CartItem, Product, Order, OrderItem, Profile } = require('../db');
const { Op, where } = require("sequelize");



exports.createCart = async (req, res) => {
    const profile =await  Profile.findOne({where:{UserId: req.user.id}})
    Cart.addHook("beforeCreate", 'deactivateOldCarts', () => {
        Cart.findAll({ where: {ACTIVECARTId: profile.id} }).then(carts => {
            carts.forEach(cart => {
                Cart.update({ status: "INACTIVE" }
                )                
            });
        })
    } )
    Cart.create({
        ACTIVECARTId : profile.id
    }).then(cart => {
        return res.status(201).send(cart)
    })
}

exports.createCartItems = async (req, res, done) => {
    const cartId = req.params.cartId
    const userId = req.user.id
    const productName = req.body.productName
    const product = await Product.findOne({ where: { productName: productName } } ).then(item => {return  item})


    const cartItem = {
        
        CartId: cartId,
        ProductId: product.id, 
        price: product.price,
        quantity: req.body.quantity,  
        total: this.total
    
        
    }

    if (!Product.isOutOfStock()) {
        CartItem.create(cartItem).then(newItem => {
            if (newItem) {
              return  res.status(201).send(newItem)
                
            } else {
                
                res.send(Error('Item not Added'))
            }
            
        })
    }
}

exports.removeCartItem = (req, res) => {
    CartItem.delete({
        where: {
            id: id
        }
    }).then(deleted => {
        res.status(200).send(deleted)
    })
}



exports.loadCart = async (req, res) => {
    const userId = req.user.id;
   const profile = await Profile.findOne({where:{UserId: userId}})
    await Cart.findOne({ where: { ACTIVECARTId: profile.id }, include: [{all:true}] })
        .then(carts => {
            if (carts) {
                console.log(carts)
                res.status(202).send(carts)
            }
        }).catch(err => {
            res.send(err.message)
        })
        
}
    
exports.updateCartItem = (req, res) => {
    const id = req.params.cartId;
    const quantity = req.body.quantity;
    CartItem.addHook(afterUpdate, "UpdateTotal", (quantity) => {
        const sum = quantity * this.price
        CartItem.update({ total: sum },
       {where: {CartId: id}} )
    })

    CartItem.update({quantity: quantity}, {
        where:{CartId:id}
    }).then(updatedProduct => {
        if (updatedProduct) {
            res.status(200).send(updatedProduct)
        }
    })
}

exports.checkout = async (req, res) => {
    try {
        const id = req.user.id

        const profile = await Profile.findOne({ where: { UserId: id } })
        //Get Cart ID by User
        const stripe = require('stripe')('sk_test_51KJmHTAjEYOrlpJbcRtNktEFaSBqHxaUsaAcPgjDQojexeyRbcGbKnqGwLIFhD0C7PP6EVUivLLYRdJMC216kzvI00hK4IjFwh');
        const cartItems = await CartItem.findAll({ where: { CartId: req.params.cartId } }).then(items => {
            return items
        });

      const  OrderItems = await cartItems.map(item => OrderItem.create({id: item.id,  quantity: item.quantity, total: item.total, ...item }).then(items => {
            return items
        }))
      
    console.log(cartItems)
    // Load cart items
        const order = await stripe.orders.create({
            items:   OrderItems,
        
        currency: "USD"
            
    })
       
        
        
    // Generate total price from cart items

    // Generate initial order
    

    // Make charge to payment method (not required in this project)

    const customer = await stripe.customers.create({
        description: req.user.username,
        email: req.user.email,
        source: 'tok_mastercard'




    })

    const charge = await stripe.charges.create({
        amount: total,
        currency: 'usd',
        customer: customer.id,
        description: 'Jordan ButtCharge'
    });

    // On successful charge to payment method, update order status to COMPLETE
 return order
}


    catch (err) {
        throw err;
    }
}