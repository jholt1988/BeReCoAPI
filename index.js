const express = require('express');
const app = express();
const { PORT } = require('./config');
const {db, dbTest}= require('./db');
const loaders = require('./Loaders');

const startServer = () => {
    
  
    loaders(app);

    db.sequelize.sync({force:false}).then(() => {
        console.log('Drop And Re-Sync DB')
    })

    dbTest()
    app.get('/', (req, res) => {
        res.send('HELLO THERE!')
    })

    app.listen(PORT, () => {
        console.log(`Server Listen On Port ${PORT}`);
    });
}

module.exports = startServer
//startServer();

