const userRoute = require('./User');
const storeRoute = require('./Store');
const cartRoute = require('./Carts');
const orderRoute = require('./Orders')
module.exports = (app) =>{
    
    userRoute(app);
    storeRoute(app);
    cartRoute(app);
    orderRoute(app);




}