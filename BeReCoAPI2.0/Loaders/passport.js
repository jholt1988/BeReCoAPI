const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('../Services/AuthService');
const logger = require('morgan');

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(logger('combined'))

    passport.serializeUser = (user, done) => {
        done(null, user.id)

    }

    passport.deserializeUser = (user, done) => {
        User.findByPk(id, function (err, user) {
            done(null, user)
        }
        )}

    passport.use('local', new LocalStrategy( async (username, password, done) => {
        try {
            const user = await User.login
           if(user)
                return done(null, user)
           else {
               done(err)
            }
        }
        catch (err) {
            done(err)
        }
    
    }))

    return passport
}