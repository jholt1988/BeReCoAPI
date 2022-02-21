const { Sequelize } = require('sequelize');
const UserModel = require('../Models/Users/User');
const ProfileModel = require('../Models/Users/Profile');
const AddressModel = require('../Models/PublicModels/Address');
const ProductModel = require('../Models/Store/Product');
const VendorModel = require('../Models/Store/Vendors');
const CartModel = require('../Models/Carts/Carts');
const CartItemModel = require('../Models/Carts/CartItems');
const OrderModel = require('../Models/Orders/Orders');
const OrderItemsModel = require('../Models/Orders/OrderItems');
const { cn } = require('../config');
const sequelize = new Sequelize(cn.database, cn.user, cn.password, {
    host: cn.host,
    dialect: 'postgres',
    port: cn.port,
    pool: {
    max: 5,
    min: 0,
    idle: 1000
     }
})

 async function dbTest() {
    try {
        sequelize.authenticate();
        console.log('Database Connection Successful Established')
    } catch (error) {
        console.log(' Error Connecting To Database')
    }
}

const db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

const User = UserModel(sequelize, Sequelize);
const Profile = ProfileModel(sequelize, Sequelize);
const Address = AddressModel(sequelize, Sequelize);
const Vendor = VendorModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
const Cart = CartModel(sequelize, Sequelize);
const CartItem = CartItemModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);
const OrderItem = OrderItemsModel(sequelize, Sequelize);

User.hasOne(Profile);
Profile.belongsTo(User);
Profile.hasOne(Address, { as: "Billing Address" });
Profile.hasOne(Address, { as: "Shipping Address" });
Address.belongsTo(Profile, { as: "Billing Address" });
Address.belongsTo(Profile, {as: 'Shipping Address'})
Vendor.hasOne(Address, {as: "Vendor Address"});
Address.belongsTo(Vendor, { as: "Vendor Address" });
Profile.hasOne(Cart, { as: 'ACTIVE-CART' });
Profile.hasOne(Cart, { as: 'INACTIVE-CART' });
Cart.belongsTo(Profile, { as: 'ACTIVE-CART' });
Cart.belongsTo(Profile, { as: 'INACTIVE-CART' });
Cart.hasMany(CartItem, { as: 'Items' });
CartItem.belongsTo(Cart, { as: 'Items' });
OrderItem.hasOne(CartItem);
CartItem.belongsTo(CartItem);
Order.hasMany(OrderItem, { as: 'Item' });
OrderItem.belongsTo(Order, {as: 'Item'})
Profile.hasMany(Order);
Order.belongsTo(Profile);


module.exports = {
    db,
    User, 
    Profile, 
    Address,
    Product, 
    Vendor, 
    Cart, 
    CartItem, 
    Order,
    OrderItem,
    dbTest
}