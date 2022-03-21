const {  DataTypes, Model } = require('sequelize');
const { OrderItem } = require('../../db');




module.exports = (sequelize, Sequelize) => {
    class OrderItemsModel extends Model {
        
     }
    
    OrderItemsModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrementIdentity: true,
            primaryKey: true,
            autoIncrement: true,
            
            
            
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
        },
        total:   { 
            type: DataTypes.VIRTUAL, 
        
            set(){
                total = this.quantity * this.price
                return this.setDataValue('total') 
            }
        }
        
    }, {sequelize, modelName: "OrderItem"})
    return OrderItemsModel
}


