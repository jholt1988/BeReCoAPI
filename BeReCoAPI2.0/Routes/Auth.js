const express = require('express');
const {isAuthenticated} = require('../Loaders/authenticate');
const {User} = require('../db');
const router = express.Router();

const AuthService = require('../Services/AuthService');
const AuthServiceInstance = new AuthService();



module.exports = (app, passport) => {
    app.use('/auth', router);


    router.post('/authenticate',
        passport.authenticate('local', {
            successFlash:'User Found!',
            failureFlash:'Username or password incorrect! Check Yo Credentials',
            failureRedirect: '/authenticate', 
            successRedirect: `/`
        }))
       
    router.get('/', isAuthenticated, (req, res, done) => {
        res.redirect(`../users/${req.user.id}`)
    })
   
    
    router.get('/profile', isAuthenticated, (req, res, done) => {
        const username = req.body.username
        const password = req.body.password

        const user = AuthServiceInstance.login(username, password)

        if (user) {
           return res.status(200).send(user)
        }
    })
    // async (req, res, done) => {
    // //     try {
    //         const username = req.body.username
    //         const password = req.body.password
        
    //         const user = await AuthServiceInstance.login( username,  password  )
    //         if (user) {
    //             res.status(200).send(user)
    //         } else {
    //             res.status(404).send('Username or password invalid. Verify credentials and try again')
    //         }
    //     } catch (err) {
    //         done(Error(err.message))
    //     }
    // })

    router.post('/register', async (req, res, done) => {

           
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role: req.body.role

        }
        const userProfile = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            DOB: req.body.DOB,
            phoneNumber: req.body.phoneNumber
        }
        const userInfo = {
            User: newUser,
            Profile: userProfile
        }

        console.log(userInfo)
        await AuthServiceInstance.register(userInfo)
            .then(data => {
                if (data) {
                    
                    return res.status(200).send(data)
                }
            
            }
            )
                
            .catch(err => {
                done(err)
            })
    })
}           