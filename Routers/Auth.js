const express = require('express');
const router = express.Router();
const User = require('../services/AuthService')

module.exports = (app, passport) => {
    app.use('/auth', router)

    router.post('/login', User.Login)

    router.post('/register',  User.register)
}