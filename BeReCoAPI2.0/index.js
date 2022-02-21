const express = require('express');
const { dbTest } = require('../db');
const { PORT } = require('./config');
const app = express();

function startServer() {
    
    dbTest()

    app.listen(PORT, () => {
        console.log(`Server Listening On Port: ${PORT}`)
    })
}

startServer() 