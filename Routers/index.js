const userRoute = require('./User');
const storeRoute = require('./Store');
const cartRoute = require('./Carts');
const orderRoute = require('./Orders')
const AuthRoute = require('./Auth')
module.exports = (app, passport) =>{
    
    userRoute(app);
    storeRoute(app);
    cartRoute(app);
    orderRoute(app);
    AuthRoute(app, passport)




}