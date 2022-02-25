const express = require('express');
const router = express.Router();
const User = require('../Services/UserService');

module.exports = (app) => {
    app.use('/users', router);
  
    router.get('/:userId', User.LoadById);

    router.put('/:userId', User.UpdateProfile)
}