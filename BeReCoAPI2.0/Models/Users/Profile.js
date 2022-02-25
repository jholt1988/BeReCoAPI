const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {

    class ProfileModel extends Model {}
    
ProfileModel.init({
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
        
            
        }, {sequelize, modelName: 'Profile'})

    return ProfileModel      
            
    

}
    

