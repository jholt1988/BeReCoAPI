const {  DataTypes, Model } = require('sequelize');
const {OrderItem, CartItem} = require('../../db')

module.exports =(sequelize, Sequelize) => {
    class OrderModel extends Model {
    
 }
    
    OrderModel.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        total: {
            type: DataTypes.DECIMAL,
            allowNull: false,

        },
        items: {
            type: DataTypes.ARRAY(DataTypes.STRING, {
                values: {
                    references: {
                        model: 'Order Item',
                        key: 'id'
                }}
            })
           
        },
       
        status: {
            type: DataTypes.ENUM({
                values: ['PLACED', 'APPROVED', 'SHIPPED', 'DELIVERED']
            })
            ,
            defaultValue: 'PLACED'
      }
    }, {sequelize, modelName:'Order'})
   return OrderModel
}

