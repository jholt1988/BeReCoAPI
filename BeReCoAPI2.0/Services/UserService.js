const { request } = require('express');
const { User, Profile } = require('../db');

exports.LoadById = (req, res) => { 
const userId = req.params.userId
         Profile.findOne({ where: { UserId: userId } })
            .then(data => {
                if (data) {
                    res.send(data) 
                }
            })
            
    
            
            .catch(error => {
                throw new Error(error);
            })
    
    
}
        
exports.UpdateProfile = (req, res) => {
    const userId = req.params.userId
    const {UpdateData: updateData} = req.body
    Profile.findOne({ where: { UserId: userId } })
        .then((data) => {

            return Profile.update({ data: { ...updateData }}
                    , {where: { id: data.id } })
        }).then(updateRecord => {
            if (updateRecord == 1) {
                res.send(updateRecord)
            } else {
                 throw new Error()
            }
        })
        .catch(err => {
        res.send(err.message)
    })

    
    }

    
exports.getAllUsers = (req, res) =>{
        User.findAll().then(users => {
            res.send(users)
        })
    }