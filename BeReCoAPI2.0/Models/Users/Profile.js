const { DataTypes, } = require('sequelize');

module.exports = (sequelize, Sequelize) => {

    const ProfileModel = sequelize.define('Profile', {
        id: {
            type: DataTypes.UUID, 
            defaultValue: DataTypes.UUIDV4, 
            primaryKey: true, 
        
        }, 
        userId: {
            type: DataTypes.UUID,
            unique: true, 
            allowNull: false,
            references: {
                model: 'Users', 
                key: 'id'
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
            addressMailId: {
                type: DataTypes.HSTORE, 
                field: { 'Mailing Address' : ['id', 'addressType'] },
                references: {
                    model: 'Addresses',
                    key: [ 'id', 'addressType']
                }, 
                addressShippingId: {
                    type: DataTypes.HSTORE,
                    field: { 'Shipping Address': ['id', 'addressType'] },
                    references: {
                        model: 'Addresses',
                        key: ['id', 'addressType']
                    }
                }
            }

            
            
        }

    })
    return ProfileModel

}