const {  DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define('Products', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,

        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        vendorID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        category: {
            type: DataTypes.ENUM({
                values: ["Laptop", "Desktop", "Gaming Console", "Tablet", "Wearables", "Cellphone"]
            })
        }
    })
    return Products
}

       



