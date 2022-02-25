

const AuthRouter = require('./Auth');
const userRouter = require('./Users')
module.exports = (app, passport) => {
  AuthRouter(app, passport)
  userRouter(app)
}