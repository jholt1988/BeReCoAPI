

const AuthRouter = require('./Auth');
const UserRouter = require('./Users');
const StoreRouter = require('./Store');
const cartRouter = require('./Cart');
const OrderRouter = require('./Order')
module.exports = (app, passport) => {
  AuthRouter(app, passport);
  UserRouter(app);
  StoreRouter(app);
  cartRouter(app);
  OrderRouter(app)
}