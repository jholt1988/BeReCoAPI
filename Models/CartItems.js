const { DataTypes } = require('sequelize');
const  Products  = require('./Products');
const  Carts  = require('./Carts');


module.exports =(sequelize, Sequelize)  => {
  const  CartItems = sequelize.define('CartItems', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
          primaryKey: true,

          
            
        },
        ProductId: {
            type: DataTypes.UUID,
            allowNull: false, 
            references: {
                model: 'Products', 
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
        CartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Carts', 
                key: 'id'
            }
            
      },
      price: {
          type: DataTypes.DECIMAL,
          references: {
              model: 'Products',
              key: 'price'
          }
        }
        
        
  })
     
    return CartItems
};

