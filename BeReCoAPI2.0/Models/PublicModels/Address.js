const {  DataTypes} = require('sequelize');


module.exports = (sequelize,  Sequelize) =>{

  const  AddressModel = sequelize.define('Address', {
        addrOne: {
            type: DataTypes.STRING,
        },
        addrTwo: {
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
        addressType: {
            type: DataTypes.ENUM({
                values: ['Customer-Billing', 'Customer-Shipping', 'Vendor']
            })
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        }
    })
    
    return AddressModel
};


    
