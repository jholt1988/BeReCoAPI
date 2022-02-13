const express = require('express');
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const { SESSION_SECRET } = require('../config');
const logger = require('morgan');




module.exports = (app) => {

    //CORS MiddleWare
    app.use(cors());

    // Body Parsing MiddleWare
    //JSON
    app.use(logger('dev'));

    app.use(bodyParser.json());

    //UrlEncoded
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(session({
        secret: SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            secure: false,
            maxAge: 40 * 60 * 120
        }
    }));

    return app;

}