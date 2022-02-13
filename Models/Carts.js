const {  DataTypes, } = require('sequelize');
const User = require('./User')


module.exports =  (sequelize, Sequelize) => {
   const Carts =  sequelize.define('Carts', {
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
                model: 'User', 
                key: 'id'
            }
            
        }
    })
    return Carts
}

