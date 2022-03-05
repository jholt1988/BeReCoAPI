const express = require('express');
const { isAuthenticated } = require('../Loaders/authenticate');
const router = express.Router();
const User = require('../Services/UserService');

module.exports = (app) => {
    app.use('/users', router);
  
    router.get('/:userId', isAuthenticated, User.LoadById);

    router.put('/:userId', isAuthenticated, User.UpdateProfile)

    router.get('/', isAuthenticated, User.getAllUsers)
}