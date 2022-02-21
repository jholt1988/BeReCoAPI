const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const VendorModel = sequelize.define('Vendor', {
        id: {
            type: DataTypes.UUID, 
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        vendorName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return VendorModel
}