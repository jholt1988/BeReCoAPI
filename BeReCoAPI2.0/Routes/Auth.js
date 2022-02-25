const express = require('express');
const router = express.Router();
const AuthService = require('../Services/AuthService');
const AuthServiceInstance = new AuthService();



module.exports = (app, passport) => {
    app.use('/auth', router)
    
    router.post('/login', passport.authenticate('local'), async (req, res, done) => {
        try {
            const { username, password } = req.body
            const user = await AuthServiceInstance.login({ username: username, password: password })
            if (user) {
                res.status(200).send(user)
            } else {
                res.status(404).send('Username or password invalid. Verify credentials and try again')
            }
        } catch (err) {
         done(Error(err.message))
        }
    })

    router.post('/register',async (req, res, done) => {
        try {  
            const {username, password, email, role, firstName, lastName, phoneNumber, DOB} = req.body
            
            const newUser = await AuthServiceInstance.register({ username:username, password:password, email:email, role:role, firstName:firstName, lastName:lastName, phoneNumber:phoneNumber, DOB:DOB });
            const user = await newUser


            if (user) {
                res.status(201).send(newUser);
            } else {
                res.status(400).send('User Found');
            }
        } catch (err) {
            done(err)
        }
    }) 
}
