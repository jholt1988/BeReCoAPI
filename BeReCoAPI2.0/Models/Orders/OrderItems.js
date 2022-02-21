const { Sequelize, DataTypes } = require('sequelize');




module.exports = (sequelize, Sequelize) => {
    const OrderItemsModel = sequelize.define('OrderItems', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrementIdentity: true,
            primaryKey: true
            
        },
        quantity: {
            type: DataTypes.INTEGER,
            
        },
        ProductId: {
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
    return OrderItemsModel
}


