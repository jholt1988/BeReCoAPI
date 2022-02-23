const express = require('express');
const router = express.Router();
const User = require('../Services/AuthService');


module.exports = (app) => {
    app.use('/auth', router)
    
    router.post('/login', User.login)
    router.post('/register', User.register)
}