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
          type: DataTypes.ARRAY(DataTypes.STRING) 
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
      }
    })
   return OrderModel
}

