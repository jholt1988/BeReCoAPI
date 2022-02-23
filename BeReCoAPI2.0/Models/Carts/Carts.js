const {  DataTypes, Model } = require('sequelize')


module.exports =  (sequelize, Sequelize) => {
    class CartModel extends Model {
        changeStatus() {
            if (this.status === "ACTIVE") {
                this.status = "INACTIVE"
            } else {
                this.status = "ACTIVE"
            }
        }
    }  
       CartModel.init({
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
           primaryKey: true,
           autoIncrement: true 
        },
        status: {
            type: DataTypes.ENUM({
                values: ["ACTIVE", "INACTIVE"]
            })
            
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'Users', 
                key: 'id'
            }
            
       }
       
        
    },{sequelize, modelName: 'Cart'})
    return CartModel
}

