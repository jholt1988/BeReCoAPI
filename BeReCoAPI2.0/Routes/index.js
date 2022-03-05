

const AuthRouter = require('./Auth');
const UserRouter = require('./Users');
const StoreRouter = require('./Store');
module.exports = (app, passport) => {
  AuthRouter(app, passport)
  UserRouter(app)
  StoreRouter(app)
}