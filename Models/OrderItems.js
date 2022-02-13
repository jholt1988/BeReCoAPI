const { Sequelize, DataTypes } = require('sequelize');
const  Products  = require('./Products');
const Orders = require('./Orders')



module.exports = (sequelize, Sequelize) => {
    const OrderItems = sequelize.define('OrderItems', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrementIdentity: true,
            primaryKey: true
            
        },
        quantity: {
            type: DataTypes.INTEGER,
            
        },
        productId: {
            type: DataTypes.UUID,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        orderId: {
            type: DataTypes.UUID,
            references: {
                model: 'Orders',
                key: 'id'
            }
        }
        
    })
    return OrderItems
}


