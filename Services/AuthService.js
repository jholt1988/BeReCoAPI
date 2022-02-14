
const { User } = require('../db');
const passport = require('passport');



exports.Login = (passport.authenticate('local'),async (req, res, done) =>{
    const username = req.body.username
    const password = req.body.password

    await User.findOne({where: {username}})
        .then(user => {
            console.log(user)
            if (user.password !== password) {
                res.status(403).send({
                message: 'Error Incorrect Password or User'
            }) 
            }
            else if (!user) { 
                res.status(404).send({
                    message: 'Error Incorrect Password or User'
                })
            } else (
                res.send(user)
            )
        })
    done()
})

exports.register = async (req, res) => {
    const username = req.body.username

    const user = {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        DOB: req.body.DOB,


    }

   await User.findOrCreate({
        where: {
        username: username
        },
        defaults: user
        
    
    })
        .then(user => {
        
                    
                res.send(user)
        
    
        })
}
