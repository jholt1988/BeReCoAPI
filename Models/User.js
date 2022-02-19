const { DataTypes, Model } = require('sequelize');


module.exports = (sequelize, Sequelize) => {

      const User = sequelize.define('Users', {
        
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
         
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DOB: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            

          }

      })


    return User
};

//Relations-

