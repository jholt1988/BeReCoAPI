const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    class ProductModel extends Model {
        changeQuantity(order) {
            const updateQuantity = this.quantity - order;
            if (updateQuantity < 0) {
                throw new Error(`Not Enough ${this.productName} in stock. Please lower desired quantity by ${updateQuantity}`)
            } else {
                this.quantity = updateQuantity
            }
        }
        isOutOfStock() {
            if (this.quantity <= 0) {
                return true
            } else {
                return false
            }
        }
    }
     ProductModel.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
          
            },
        description: {
            type: DataTypes.TEXT,

        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
           
            },
        vendorID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        category: {
            type: DataTypes.ENUM({
                values: ["Laptop", "Desktop", "Gaming Console", "Tablet", "Wearables", "Cellphone"]
            })
        }
        
      
    }, {sequelize, modelName: 'Product'})
return ProductModel
}





