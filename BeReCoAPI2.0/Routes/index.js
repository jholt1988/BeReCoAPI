

const AuthRouter = require('./Auth');
const UserRouter = require('./Users');
const StoreRouter = require('./Store');
const cartRouter = require('./Cart')
module.exports = (app, passport) => {
  AuthRouter(app, passport);
  UserRouter(app);
  StoreRouter(app);
  cartRouter(app);
}