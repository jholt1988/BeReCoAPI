const {  DataTypes } = require('sequelize');


module.exports =(sequelize, Sequelize) => {
  const OrderModel = sequelize.define('Orders', {
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
            type: DataTypes.ARRAY({
                values: DataTypes.STRING
            }),
            references: {
                model: 'orderItems',
                key: 'id'
            }
            
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        status: {
            type: DataTypes.ENUM({
                values: ['PLACED', 'APPROVED', 'SHIPPED', 'DELIVERED']
            })
            ,
            defaultValue: 'PLACED'
      },
      changeStatus(newStatus) {
            this.status = newStatus
        }
    })
   return OrderModel
}

