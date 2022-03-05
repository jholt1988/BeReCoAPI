const { DataTypes, Model } = require('sequelize');
const {Address} = require('../../db')

module.exports = (sequelize, Sequelize) => {
    class  VendorModel extends Model{  
        static vendorExists = (vendorName) => {
         const vendor =   this.findOne({vendorName})
                if(vendor){
                    return true
                } else
                return false
            } 
        }
        
    
        VendorModel.init({
        id: {
            type: DataTypes.UUID, 
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        vendorName: {
            type: DataTypes.STRING,
            allowNull: false
        }
      }, {sequelize, modelName: 'Vendor'})

    return VendorModel
}