const passport = require('passport');
const LocalStrategy = require('passport-local')
const {User} = require('../db');
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize({dialect:'postgres'});
const logger = require('morgan');

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(logger('combined'))

    passport.serializeUser = (user, done) => {
        done(null, user.id)

    }

    passport.deserializeUser = (user, done) => {
         done(null, {id})
    }

    passport.use('local', new LocalStrategy( async (username, password, done) => {
        
      await User.findOne({
            where: {
            username :  username
        }})
            .then( user => {
                if (user.password == password) {
                    console.log(user.password)
                  return done(null, user.id)
                } else if (!user) {
                    throw new Error('User Not Found')
                } else {
                    throw new Error('Password or User Incorrect')
            }
            }).
            catch(err => {
            done(err)
            }
            )
    
    
    }))

    return passport
}