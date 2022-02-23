const { DataTypes, } = require('sequelize');

module.exports = (sequelize, Sequelize) => {

    const ProfileModel = sequelize.define('Profile', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DOB: {
            type: DataTypes.DATEONLY
        },
        phoneNumber: {
            type: DataTypes.STRING
        },
        
            
        })

    return ProfileModel      
            
    

}
    

