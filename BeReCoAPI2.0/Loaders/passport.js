const passport = require('passport');
const LocalStrategy = require('passport-local')
const Auth = require('../Services/AuthService');
const logger = require('morgan');
const { User } = require('../db');
const { chain } = require('lodash');


module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(logger('combined'))

    passport.serializeUser((user, done) => {
        console.log(`${user} serialized`)
       return  done(null, user.id)
        })
    

    passport.deserializeUser((id, done) => {
        User.findByPk( id ).then(user=> {
            
          return  done(null, { id })
        })
        })
        
        
    

    passport.use('local', new LocalStrategy(
        function (username, password, done) {
        
            authUser = User.findOne({ where: { username: username } }).then(user => {
                hashpass = user ? user.password : ""
                isMatch = User.validatePassword(password, hashpass, done, user)
               return done(null, user)
            })

    
            
        })
    )
    
        
                
                    
    return passport
                
}