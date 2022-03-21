const { DataTypes, Model } = require('sequelize');



module.exports =(sequelize, Sequelize)  => {
    class CartItemModel extends Model{
         totalItem() {
            const total = (this.price * this.quantity)
            return total
        }

        changeStatus() {
            this.isActive = false
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
            type: DataTypes.DECIMAL,
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
          type: DataTypes.DECIMAL
          
      },
      total: {
          type: DataTypes.DECIMAL,
          set() {   const total  = this.totalItem()
                    this.setDataValue('total',total )
        
          }

            }

        
        
  }, {sequelize, modelName: 'CartItem'})
     
    return CartItemModel
};

