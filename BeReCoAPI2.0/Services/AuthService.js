const { User } = require('../db');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');

exports.login = (passport.authenticate('local'), function (req, res) {
    const username = req.body.username;

    User.findOne({
        where: { username: username }
    })
        .then((data) => {
            
                bcrypt.compare(data.password, hash, function (err, result) {
                    console.log(bcrypt.hash)
                    result == true
                    res.send(data)
                })
                 
            

                
                
            }
    )
        .catch(err =>{
        throw new Error(err)
        })

})
    


        

    
    
exports.register = (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const user = {
            username: username, 
            password: password ,
            email: req.body.email,
            role: req.body.role
                }

    const profile = {
        userId: user.Id, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        DOB: req.body.DOB,
        phoneNumber: req.body.phoneNumber
    }


                User.create(user)
                    .then((result) => 
                        result.createProfile(profile)
                
                    )
                    .then((data, ) => {
                        if (data )
                            res.send({ profile: data })
                    })
                    .catch(() => {
                        res.send({ message: 'Error User Not Created' })
                    })
    
            }



