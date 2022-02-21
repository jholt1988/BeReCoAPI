const { Sequelize } = require('sequelize');
const { cn } = require('../config');
const sequelize = new Sequelize(cn.database, cn.user, cn.password, {
    host: cn.host,
    dialect: 'postgres',
    port: cn.port,
    pool: {
    max: 5,
    min: 0,
    idle: 1000
     }
})

exports = async function dbTest() {
    try {
        sequelize.authenticate();
        console.log('Database Connection Successful Established')
    } catch (error) {
        console.log(' Error Connecting To Database')
    }
}

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize