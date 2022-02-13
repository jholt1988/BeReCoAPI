const {  DataTypes, Model } = require('sequelize');
const  User  = require('../User');


module.exports = (sequelize,  Sequelize) =>{

  const  Address = sequelize.define('Address', {
        lineOne: {
            type: DataTypes.STRING,
        },
        lineTwo: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
        zipcode: {
            type: DataTypes.INTEGER,
        },
        AddressType: {
            type: DataTypes.ENUM({
                values: ['Customer-Billing', 'Customer-Shipping', 'Vendor']
            })
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'id'
            
            }
            
        }
    })
    
    return Address
};


    
