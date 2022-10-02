 const { DataTypes, Model, Op } = require('sequelize');
const bcrypt = require('bcrypt')

        
module.exports = (sequelize, Sequelize) => {
    class UserModel extends Model {
        static async validatePassword(password, hashpass, done, user) {
            
            await bcrypt.compare(password, hashpass, function (err, isMatch) {
                if (err) {
                    console.log(err)
                }
                else if (isMatch) {
                    done(null, user)
                } else {
                    done(null, false)
                }
               
            })
        
        }
    
        
        static async userExist  (username, email) {
            let user = await this.findOne({ where: { username: username } });
            if (user) { return { username: 'This username already taken ' } };
            user = await this.findOne({ where: { email: email } });
            if (user) { return { email: 'This email address is already associated with another user' } };
            return false
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
                beforeSave: hashPassword = async (user) => {
                    if (user.isNewRecord) {
                        const salt = await bcrypt.genSalt(10, "b");
                        user.password = await bcrypt.hashSync(user.password, salt)
                    
                    }
                },
                beforeUpdate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSalt(10, "b");
                        user.password = await bcrypt.hashSync(user.password, salt);
                    
                        
                    }
                }
            },
            sequelize, modelName: 'User'
        })
        

    return UserModel
}
