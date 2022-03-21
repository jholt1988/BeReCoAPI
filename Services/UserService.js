const { User } = require('../db');



exports.create = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: 'Error Creating User'
        });
        return;
    }

    
    const user = {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        DOB: req.body.DOB,
    
    
    }
    User.create(user)
        .then(data => {
            res.send(data)
            console.log(data.json())

        })
        .catch(err => {
            res.status(404).send({
                message: err.message
            })
        })
};


exports.update = (req, res) => {
    const id = req.params.id


    User.update(req.body, {
        where: {id:id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'User Update'
                });

            } else {
                res.send({
                    message: 'User Update Not Successful'
                })
        }
        })
        .catch(err => {
            res.send({
            message: "Error Updating user"
        })
    })
};

exports.findOne = (req, res) => {
    const id = req.params.id

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: 'User Does Not Exist'
                })
            }
            
        });
}

exports.getAll = (req, res) => {
    User.findAll()
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: 'Error Retrieving Messages'
                })
                done()
            }
        
        
        })
}
exports.deleteOne = (req, res) => {
    const id = req.params.user
    
    User.destroy({
        where: {id:id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message:'User Deleted Successfully'
                })
            } else {
                res.status(404).send({
                  message:'Error- User Not Deleted'
              }) 
            }
        })
        .catch(err => {
            res.status(500).send({
            message: err.message
        })
        })
    
}



// exports.findOneByUsername = (req, res,username ) => {

//     User.findOne({
//         where: {
//         username:username
//         }
//     })
//         .then(result => {
//         res.send(result)
//     })
// }