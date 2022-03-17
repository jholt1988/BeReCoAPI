const { forEach, get } = require('lodash');
const {  DataTypes, Model } = require('sequelize');
const {Order} = require('../../db')

module.exports =(sequelize) => {
    class OrderModel extends Model {
       static changeStatus() {
            if (this.status === "PLACED") {
                return this.status = "APPROVED"
            } else if (this.status === "APPROVED") {
                return this.status = "SHIPPED"
            } else if(this.status === "SHIPPED") {
                return this.status = "DELIVERED"
            }
        }
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

