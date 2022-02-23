const { DataTypes, Model } = require('sequelize');



module.exports =(sequelize, Sequelize)  => {
    class CartItemModel extends Model{
        totalItem() {
            this.total = this.price * this.quantity
        }

    }
        
        CartItemModel.init({
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
          
      },
      total: {
          type: DataTypes.INTEGER

      }
      

        
        
  }, {sequelize, modelName: 'CartItem'})
     
    return CartItemModel
};

