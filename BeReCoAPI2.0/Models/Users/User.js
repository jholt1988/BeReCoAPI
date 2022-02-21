const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10


module.exports = (sequelize, Sequelize) => {
    const UserModel = sequelize.define('User', {
        
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true, 
            
        }, 

        username: {
            type: DataTypes.STRING, 
            unique: true, 
            allowNull: false
        },
        password: {
            type: DataTypes.STRING, 
            allowNull: false, 
            set(value) {
                bcrypt.genSalt(saltRounds, function (error, username) {
                    bcrypt.hash(value, username, function (error, hash) {
                      this.setDataValue('password',hash(value))
                  })
                })
            }
        },
        email: {
            type: DataTypes.STRING, 
            allowNull: false,
            unique:true
        }, 
        role: {
            type: DataTypes.ENUM({
                values:['ADMIN','EMP', 'CUSTOMER']
            }), 
            allowNull: false
        }

    })
    return UserModel
}