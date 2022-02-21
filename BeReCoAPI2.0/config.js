const dotenv = require('dotenv').config()

module.exports = {
    PORT:process.env.PORT,
    SESSION_SECRET:process.env.SESSION_SECRET, 
    cn:{
        host: process.env.DBHOST,
        port: process.env.DBPORT,
        database: process.env.DBDATABASE,
        user: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD
    }

}