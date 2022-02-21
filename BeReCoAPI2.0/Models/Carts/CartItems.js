const { DataTypes } = require('sequelize');



module.exports =(sequelize, Sequelize)  => {
  const  CartItemModel = sequelize.define('CartItems', {
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
      },
      total: {
          type: DataTypes.INTEGER

      },
      totalItem() {
          this.total = this.price * this.quantity
      }

        
        
  })
     
    return CartItemModel
};

