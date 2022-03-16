const express = require('express');
const { dbTest, db } = require('./db');
const loaders = require('./Loaders')
const { PORT } = require('./config');

const app = express();

function startServer() {

loaders(app)

    db.sequelize.sync({force: false}).then(() => {
        console.log('Drop And Re-Sync DB')
    })
    dbTest()
    
    
    app.listen(PORT, () => {
        console.log(`Server Listening On Port: ${PORT}`)
    })


    }


startServer() 


