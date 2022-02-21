const {  DataTypes, } = require('sequelize')


module.exports =  (sequelize, Sequelize) => {
   const CartModel =  sequelize.define('Carts', {
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
            
       },
       changeStatus() {
           if (this.status === "ACTIVE") {
                this.status = "INACTIVE"
           } else {
               this.status = "ACTIVE"
            }
        }
        
    })
    return CartModel
}

