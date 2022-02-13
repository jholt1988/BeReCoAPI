
const { Sequelize } = require('sequelize');
const { cn } = require('../config');
const UserModel = require('../Models/User');
const ProductsModel = require('../Models/Products');
const CartsModel = require('../Models/Carts');
const OrderModel = require('../Models/Orders');
const CartItemsModel = require('../Models/CartItems');
const OrderItemsModel = require('../Models/OrderItems');
const AddressModel = require('../Models/PublicModels/Address');
const sequelize = new Sequelize(cn.database,cn.user, cn.password,{
    host: cn.host,
    dialect: 'postgres',
    host: cn.host,

    pool: {
        max: 5,
        min: 0, 
        idle:1000
        
    }
});

async function dbTest() {

    try {
        sequelize.authenticate();
        console.log('Database Connection Successful Established')
    } catch (error) {
        console.log(' Error Connecting To Database')
    }
}



const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize

const User =  UserModel(sequelize, Sequelize);
const Products =  ProductsModel(sequelize, Sequelize);
const Carts =  CartsModel(sequelize, Sequelize);
const CartItems =  CartItemsModel(sequelize, Sequelize);
const Orders =  OrderModel(sequelize, Sequelize);
const OrderItems =  OrderItemsModel(sequelize, Sequelize);
const Address =  AddressModel(sequelize, Sequelize);

User.Address = User.hasMany(Address)
Carts.CartItems = CartItems.belongsTo(Carts)




module.exports = {
    db,
    User,
    Products, 
    Carts,
    CartItems,
    Orders,
    OrderItems,
    Address,
    dbTest
} 
