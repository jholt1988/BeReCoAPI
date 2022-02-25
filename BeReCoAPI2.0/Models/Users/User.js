const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt')

        
module.exports = (sequelize, Sequelize) => {
    class UserModel extends Model {
        validPassword = (password) => {
            
            return bcrypt.compareSync(password, this.password)
}

    }
    UserModel.init({
        
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
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role: {
            type: DataTypes.ENUM({
                values: ['ADMIN', 'EMP', 'CUSTOMER']
            }),
            allowNull: false
        }
    },
      
        {
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSaltSync(10, "b");
                        user.password = await bcrypt.hashSync(user.password, salt)
                        console.log(user.password)
                        return user.password
                    }
                },
                beforeUpdate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSaltSync(10, "b");
                        user.password = await bcrypt.hashSync(user.password, salt);
                        console.log(user.password)
                        return  user.password
                    }
                }
            },
             sequelize, modelName: 'User' })

        
    return UserModel
}